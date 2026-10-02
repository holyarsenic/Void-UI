"use client";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { Lock } from "lucide-react";

import { Button } from "../ui/button";
import GoogleIcon from "@/assets/Icons/Google";
import AuthLoading from "../Loading/AuthLoading";
import { toast } from "sonner"

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { data, status } = useSession();

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      await signIn("google", {
        callbackUrl: "/dashboard/generate",
      });
    } catch (err) {
      toast.error("Login failed. Try again!");
      console.error("Google login failed:", err);
      setLoading(false);
    }
  };

  const isLoggedIn = status === "authenticated";

  return (
    <div className="flex w-full max-w-md flex-col items-center justify-center rounded-xl p-5 md:p-8">
      <h1 className="text-center font-theme text-2xl font-bold md:text-3xl">
        Welcome to Void UI
      </h1>

      <p className="mb-6 text-center font-theme text-white/50">
        {isLoggedIn ? "You are signed in" : "Sign in to continue"}
      </p>

      {isLoggedIn ? (
        <Button
          type="button"
          variant="default"
          onClick={handleGoogleLogin}
          className={`flex h-12 w-65 items-center  gap-3 rounded-4xl p-3 ${loading ? "bg-primary/80 justify-center" : "justify-start"}`}>
          {loading ? (
            <AuthLoading />
          ) : (
            <>
              {data.user?.image ? (
                <Image
                  src={data.user.image}
                  width={28}
                  height={28}
                  alt={data.user.name || "Profile"}
                  className="h-7 w-7 rounded-full"/>
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                  {data.user?.name?.charAt(0)}
                </div>
              )}

              <div className="flex min-w-0 flex-col items-start">
                <span className="max-w-55 truncate text-sm font-medium text-background/80">
                  {data.user?.name}
                </span>

                <span className="max-w-55 truncate text-xs text-background/60">
                  {data.user?.email}
                </span>
              </div>
            </>
          )}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || status === "loading"}
          className={`flex h-12 w-65 gap-2 rounded-4xl py-5 text-sm uppercase text-background/60 ${
            loading ? "bg-primary/80" : ""
          }`}>
          {loading ? (
            <AuthLoading />
          ) : (
            <>
              <GoogleIcon className="h-7 w-7" />
              Continue with Google
            </>
          )}
        </Button>
      )}

      <div className="mt-3 flex w-full items-center justify-center gap-3">
        <Lock className="h-4 w-4 text-foreground/40" />

        <span className="text-[11px] tracking-widest text-foreground/40">
          Secure passwordless authentication.
        </span>
      </div>
    </div>
  );
};

export default LoginPage;