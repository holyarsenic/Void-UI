import ProjectComp from "@/components/Dashboard/ProjectComponents/ProjectComp"
import type { Metadata } from "next";

export const metadata: Metadata = { 
  title: "Projects",
  description: "Manage your account settings and preferences."
};

export default function Project(){
  return (
    <>
      <ProjectComp />
    </>
  );
};