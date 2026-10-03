import SettingComp from "@/components/Dashboard/SettingComponents/SettingComp";
import type { Metadata } from "next";

export const metadata: Metadata = { 
  title: "Settings",
  description: "Manage your account settings and preferences."
};

export default function Setting() {
 return (
    <>
      <SettingComp />
    </>
  );
}