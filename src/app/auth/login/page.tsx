import LoginBanner from "@/components/Landing/LoginBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account to access the dashboard.",
};

export default function Login(){
  return (
    <>
      <LoginBanner />
    </>
  )
}
