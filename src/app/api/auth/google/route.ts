import { NextResponse } from "next/server";

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri:
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    prompt: "select_account",
  });

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  
  return NextResponse.redirect(googleAuthUrl);
}