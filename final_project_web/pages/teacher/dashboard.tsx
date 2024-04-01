import ECommerce from "@/components/Dashboard/E-commerce";
import TeacherDashboard from "@/components/Dashboard/TeacherDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Dashboard() {

  
  return (
    <div>
      <TeacherDashboard />
    </div>
  );
}
