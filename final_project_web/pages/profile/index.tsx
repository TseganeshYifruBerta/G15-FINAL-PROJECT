import React from "react";
import Header from "@/components/navbar/navstudent";
import dynamic from "next/dynamic";
import { useGetAcceptedQuestionByIdQuery } from "@/store/profile/get-accepted-wrong-question-by-student-id";
import { useGetEasyMediumHardByIdQuery } from "@/store/profile/get-easy-medium-hard-api";
import { useGetNumberOfAllQuestionQuery } from "@/store/profile/get-number-of-question-api";
import Navigation from "@/components/layout/Navigation";

const SideNavbar = dynamic(() => import("@/components/sidebar/SideNavBar"), {
  ssr: false,
});
const Widget = dynamic(() => import("@/components/widget/cardStudent"), {
  ssr: false,
});
const Chart1 = dynamic(() => import("@/components/chart/char1"), {
  ssr: false,
});

const AdminPage: React.FC = () => {
  const userId = 1;
  const { data: accepted, isLoading: acceptedLoading } =
    useGetAcceptedQuestionByIdQuery({ userId: userId });
  const { data: difficulties, isLoading: diffLoading } =
    useGetEasyMediumHardByIdQuery({ userId: userId });
  const { data: numberofallquestions, isLoading: numLoading } =
    useGetNumberOfAllQuestionQuery("");

  if (acceptedLoading) {
    return <div>Loading</div>;
  }
  if (diffLoading) {
    return <div>Loading</div>;
  }
  if (numLoading) {
    return <div>Loading</div>;
  }
  console.log(accepted, difficulties, numberofallquestions);
  return (
    <>
      <div className="flex">
        <div className="w-2/6">
          <Navigation />
        </div>
        <div className="w-4/6">
          <main className="-ml-60 min-h-screen">
            <div className="flex">
              <div className="flex flex-col flex-grow">
                <Header></Header>
                <div className="flex flex-col justify-center items-center relative z-10 w-4/5 mb-8 mt-4 mx-auto">
                  {/* Added justify-center and items-center classes */}
                  <Widget
                    difficulty={difficulties[0]}
                    allQuestions={numberofallquestions}
                  />
                </div>
                <div className="flex flex-col justify-center items-center mt-4">
                  {" "}
                  {/* Added justify-center and items-center classes */}
                  <Chart1 />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
