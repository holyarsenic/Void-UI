import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Password
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return bcrypt.compare(password, hashedPassword);
}

// Access Token
export function createAccessToken(userId: number) {

  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

  if (!ACCESS_TOKEN_SECRET) {
    throw new Error("Access Token is not defined");
  }

  if (!REFRESH_TOKEN_SECRET) {
    throw new Error("Refresh Token is not defined");
  }

  return jwt.sign(
    { userId },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
}

export function verifyAccessToken(accessToken: string) {

  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

  if (!ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined");
  }
  
  const payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

  if (
    typeof payload !== "object" ||
    payload === null ||
    !("userId" in payload) ||
    typeof payload.userId !== "number"
  ) {
    throw new Error("Invalid access token");
  }

  return {
    userId: payload.userId,
  };
}

// Refresh Token
export function createRefreshToken(userId: number) {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

  if (!REFRESH_TOKEN_SECRET) {
    throw new Error("Refresh Token is not defined");
  }

  return jwt.sign(
    { userId },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "30d",
    }
  );
}

export function verifyRefreshToken(refreshToken: string) {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

  if (!REFRESH_TOKEN_SECRET) {
    throw new Error("Refresh Token is not defined");
  }

  const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

  if (
    typeof payload !== "object" ||
    payload === null ||
    !("userId" in payload) ||
    typeof payload.userId !== "number"
  ) {
    throw new Error("Invalid refresh token");
  }

  return {
    userId: payload.userId,
  };
}

export async function getCurrentUserId(): Promise<number | null> {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return null;
    }

    const { userId } = verifyAccessToken(token);

    return userId;
  } catch {
    return null;
  }
}