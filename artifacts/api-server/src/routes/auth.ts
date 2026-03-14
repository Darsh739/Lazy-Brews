import { Router, type IRouter } from "express";
import admin from "firebase-admin";
import { OAuth2Client } from "google-auth-library";
import { db, membersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

function getFirebaseAdmin() {
  if (admin.apps.length > 0) return admin.app();

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Firebase Admin credentials not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.");
  }

  return admin.initializeApp({
    credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
  });
}

router.post("/auth/firebase", async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "Missing idToken" });
  }

  try {
    const firebaseApp = getFirebaseAdmin();
    const decoded = await firebaseApp.auth().verifyIdToken(idToken);

    const { uid: googleId, email, name = "Unknown", picture } = decoded;

    if (!email) {
      return res.status(400).json({ error: "No email in token" });
    }

    const existing = await db
      .select()
      .from(membersTable)
      .where(eq(membersTable.googleId, googleId))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(membersTable).values({
        googleId,
        name,
        email,
        picture: picture ?? null,
      });
    }

    res.json({ success: true, name, email });
  } catch (err: any) {
    console.error("Firebase auth error:", err.message);
    if (err.message?.includes("credentials not configured")) {
      return res.status(503).json({ error: "Firebase not configured yet. Please set up credentials." });
    }
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

router.post("/auth/google-verify", async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ error: "Missing credential" });
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return res.status(503).json({ error: "Google Sign-In not configured" });
  }

  try {
    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({ idToken: credential, audience: clientId });
    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return res.status(400).json({ error: "Invalid token payload" });
    }

    const { sub: googleId, email, name = "Unknown", picture } = payload;

    const existing = await db
      .select()
      .from(membersTable)
      .where(eq(membersTable.googleId, googleId))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(membersTable).values({ googleId, name, email, picture: picture ?? null });
    }

    res.json({ success: true, name, email, picture: picture ?? null });
  } catch (err: any) {
    console.error("Google verify error:", err.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

export default router;
