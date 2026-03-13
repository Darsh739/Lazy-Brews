import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { db, membersTable } from "@workspace/db";

const router: IRouter = Router();

function getJwtSecret() {
  return process.env.JWT_SECRET || "fallback-secret-change-me";
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = auth.slice(7);
  try {
    jwt.verify(token, getJwtSecret());
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

router.post("/admin/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return res.status(503).json({ error: "Admin credentials not configured" });
  }

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ role: "admin", email }, getJwtSecret(), { expiresIn: "8h" });
  res.json({ token });
});

router.get("/admin/members", requireAdmin, async (_req: Request, res: Response) => {
  try {
    const members = await db
      .select({
        id: membersTable.id,
        name: membersTable.name,
        email: membersTable.email,
        picture: membersTable.picture,
        createdAt: membersTable.createdAt,
      })
      .from(membersTable)
      .orderBy(membersTable.createdAt);

    res.json({ members });
  } catch (err) {
    console.error("Error fetching members:", err);
    res.status(500).json({ error: "Failed to fetch members" });
  }
});

export default router;
