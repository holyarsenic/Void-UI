import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function POST(request: NextRequest) {

  const account = request.cookies.get("accessToken");

  if (!account) {
    return NextResponse.json(
      {
        success: false,
        message: "No active session to logout",
      },
      { status: 400 }
    );
  }

  const response = NextResponse.json(
    {
      success: true,
      message: "Logout successful",
    },
    { status: 200 }
  );

  // Clear cookies
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");

  return response;
}