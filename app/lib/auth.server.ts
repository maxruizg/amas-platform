import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./db.server";

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-change-me";

export interface UserPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function createToken(user: UserPayload): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch {
    return null;
  }
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<{ user: UserPayload; token: string } | null> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return null;
  }

  const payload: UserPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const token = createToken(payload);

  return { user: payload, token };
}

export async function createUser(
  email: string,
  password: string,
  name: string
): Promise<UserPayload> {
  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

export function getTokenFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;

  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => c.split("="))
  );

  return cookies.auth_token || null;
}

export async function requireAuth(request: Request): Promise<UserPayload> {
  const token = getTokenFromRequest(request);

  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const user = verifyToken(token);

  if (!user) {
    throw new Response("Unauthorized", { status: 401 });
  }

  return user;
}

export async function getOptionalUser(
  request: Request
): Promise<UserPayload | null> {
  const token = getTokenFromRequest(request);

  if (!token) {
    return null;
  }

  return verifyToken(token);
}
