"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import GoogleIcon from "@/assets/Icons/Google"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // Login successful
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  const handleGoogleLogin = () => {
    router.push("/api/auth/google")
  };

  return (
    <div className="w-full max-w-md rounded-xl p-8 shadow-md">
      
        <h1 className="mb-2 text-center text-3xl font-bold font-theme">
          Welcome Back
        </h1>

        <p className="mb-6 text-center text-gray-500 font-theme">
          Login to your account
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium font-theme">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-white/50 transition-all eas  placeholder:font-theme"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium font-theme">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-white/50 transition-all ease-in-out placeholder:font-theme"
            />
          </div>

          <Button
            type="submit"
            variant={"default"}
            className="w-full py-5 text-xl font-theme"
          >
            Login
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-300" />

          <span className="text-sm text-gray-500">OR</span>

          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <Button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-5 text-lg font-theme flex gap-2"
        >
         <GoogleIcon className="h-7 w-7"/>
          Continue with Google
        </Button>
      </div>
  );
};

export default LoginPage;
