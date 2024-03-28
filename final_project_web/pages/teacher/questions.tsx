const jwt = require("jsonwebtoken");
import Breadcrumb from "@/components/components/Breadcrumbs/Breadcrumb";
import ChatCard from "@/components/components/Chat/ChatCard";
import TopSovedQuestions from "@/components/components/Chat/TopSolvedCard";
import Header from "@/components/components/Header";
import QuestionTable from "@/components/components/Tables/QuestionTable";
import TableOne from "@/components/components/Tables/TableOne";
import TableThree from "@/components/components/Tables/TableThree";
import TableTwo from "@/components/components/Tables/TableTwo";
import { useGetAllQuestionsQuery } from "@/store/question/get-all-questions";
import { useGetTopSolvedQuestionsQuery } from "@/store/question/get-top-solved-questions";
import { Metadata } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function Questions() {
  const {
    data: questions,
    isLoading: isLoadingQuestion,
    isError: isErrorQuestion,
  } = useGetAllQuestionsQuery("");

  if (isLoadingQuestion) {
    return <div>Loading...</div>;
  }

  console.log(questions, "questions");

  return (
    <div className="dark:bg-boxdark h-screen">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between w-full">
          <div className="w-2/3">
            <QuestionTable questions={questions.questionWithTestcase} />
          </div>
          <div className="w-1/3">
            <TopSovedQuestions />
          </div>
        </div>
      </div>
    </div>
  );
}
