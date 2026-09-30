"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import GoogleIcon from "@/assets/Icons/Google";
import { useState } from "react";
import { Lock } from "lucide-react"
import AuthLoading from "../Loading/AuthLoading";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
        await signIn("google", {
        callbackUrl: "/dashboard/generate",
      });
    } catch (err) {
      console.error("Google login failed:", err);
      setLoading(false)
    }
    

  };

  return (
    <div className="w-full flex flex-col items-center justify-center max-w-md rounded-xl p-5 md:p-8">
      <h1 className="text-center text-3xl font-bold font-theme">
        Welcome to Void UI
      </h1>

      <p className="mb-6 text-center text-white/50 font-theme">
        Sign in to continue
      </p>

      <Button
        type="button"
        onClick={handleGoogleLogin}
        className={`flex w-xs rounded-2xl gap-2 py-5 text-lg font-theme ${ loading ? "bg-primary/80" : ""}`}
      >
        {loading ? ( 
          <> 
            <AuthLoading />
          </> 
          ) : ( 
          <> 
            <GoogleIcon className="h-7 w-7" /> Continue with Google 
          </> 
        )}
      </Button>

      <div className="mt-3 flex w-full items-center justify-center gap-3">
          <Lock className="h-4 w-4 text-foreground/40"/>
          <span className="text-[11px] tracking-widest text-foreground/40">
            Secure passwordless authentication.
          </span>
        </div>
    </div>
  );
};

export default LoginPage;