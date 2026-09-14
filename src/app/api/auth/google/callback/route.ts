import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/prisma";
import { createAccessToken, createRefreshToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Google authorization code missing" },
        { status: 400 }
      );
    }

    // Exchange Google's code for tokens
    const tokenResponse = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID!,
          client_secret: process.env.GOOGLE_CLIENT_SECRET!,
          redirect_uri:
            `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`,
          grant_type: "authorization_code",
        }),
      }
    );

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Google token error:", tokens);

      return NextResponse.json(
        { error: "Failed to authenticate with Google" },
        { status: 401 }
      );
    }

    // Get Google user information
    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    const googleUser = await userResponse.json();

    if (!userResponse.ok || !googleUser.email) {
      return NextResponse.json(
        { error: "Failed to get Google user information" },
        { status: 401 }
      );
    }

    const { email, name, picture } = googleUser;

    // Find existing user
    let user = await db.user.findUnique({
      where: {
        email,
      },
    });

    // Create user if they don't exist
    if (!user) {
      user = await db.user.create({
        data: {
          email,
          name: name || null,
          image: picture || null,
          password: null,
        },
      });
    }

    // Create YOUR JWT tokens
    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);

    // Create response
    const response = NextResponse.redirect(
      new URL("/dashboard", request.url)
    );

    // Set YOUR existing cookies
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error) {
    console.error("Google login error:", error);

    return NextResponse.json(
      { error: "Google authentication failed" },
      { status: 500 }
    );
  }
}