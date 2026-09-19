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
    </div>
  );
};

export default LoginPage;