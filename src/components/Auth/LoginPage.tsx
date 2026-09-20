"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import GoogleIcon from "@/assets/Icons/Google";
import { useState } from "react";
import AuthLoading from "../Loading/AuthLoading";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
        await signIn("google", {
        callbackUrl: "/dashboard",
      });
    } catch (err) {
      console.error("Google login failed:", err);
      setLoading(false)
    }
    

  };

  return (
    <div className="w-full flex flex-col items-center justify-center max-w-md rounded-xl p-5 shadow-md md:p-8">
      <h1 className="text-center text-3xl font-bold font-theme">
        Welcome to Void UI
      </h1>

      <p className="mb-6 text-center text-white/50 font-theme">
        Sign in to continue
      </p>

      <Button
        type="button"
        onClick={handleGoogleLogin}
        className={`flex w-full gap-2 py-5 text-lg font-theme ${ loading ? "bg-primary/80" : ""}`}
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

      <div className="mt-7 flex w-full items-center gap-3">
          <div className="h-px flex-1 bg-white/30" />
          <span className="text-[10px] uppercase tracking-widest text-white/30">
            Secure login
          </span>
          <div className="h-px flex-1 bg-white/30" />
        </div>
    </div>
  );
};

export default LoginPage;