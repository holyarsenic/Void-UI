"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import GoogleIcon from "@/assets/Icons/Google";

const LoginPage = () => {
  const handleGoogleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="w-full max-w-md rounded-xl p-5 shadow-md md:p-8">
      <h1 className="mb-2 text-center text-3xl font-bold font-theme">
        Welcome to Void UI
      </h1>

      <p className="mb-6 text-center text-white/50 font-theme">
        Sign in to continue
      </p>

      <Button
        type="button"
        onClick={handleGoogleLogin}
        className="flex w-full gap-2 py-5 text-lg font-theme"
      >
        <GoogleIcon className="h-7 w-7" />
        Continue with Google
      </Button>
    </div>
  );
};

export default LoginPage;