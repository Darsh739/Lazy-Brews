import { Router, type IRouter } from "express";
import { OAuth2Client } from "google-auth-library";
import { db, membersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

function getOAuthClient() {
  return new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );
}

function getRedirectUri(req: any) {
  const proto = req.headers["x-forwarded-proto"] || req.protocol;
  const host = req.headers["x-forwarded-host"] || req.get("host");
  return `${proto}://${host}/api/auth/google/callback`;
}

router.get("/auth/google", (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return res.status(503).json({ error: "Google OAuth not configured yet. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET." });
  }

  const client = getOAuthClient();
  const redirectUri = getRedirectUri(req);

  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
    redirect_uri: redirectUri,
  });

  res.redirect(url);
});

router.get("/auth/google/callback", async (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return res.redirect("/?error=oauth_not_configured");
  }

  const { code } = req.query;
  if (!code || typeof code !== "string") {
    return res.redirect("/?error=missing_code");
  }

  try {
    const client = getOAuthClient();
    const redirectUri = getRedirectUri(req);

    const { tokens } = await client.getToken({ code, redirect_uri: redirectUri });
    client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.sub || !payload.email) {
      return res.redirect("/?error=invalid_token");
    }

    const { sub: googleId, email, name = "Unknown", picture } = payload;

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

    res.redirect("/?registered=true");
  } catch (err) {
    console.error("OAuth callback error:", err);
    res.redirect("/?error=oauth_failed");
  }
});

export default router;
