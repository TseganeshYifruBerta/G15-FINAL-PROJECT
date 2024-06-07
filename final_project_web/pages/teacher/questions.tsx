import QuestionTable from "@/components/components/Tables/QuestionTable";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function Questions() {


  return (
    <div className="dark:bg-boxdark h-screen">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between w-full">
          <div className="w-full">
            <QuestionTable />
          </div>
         
        </div>
      </div>
    </div>
  );
}
