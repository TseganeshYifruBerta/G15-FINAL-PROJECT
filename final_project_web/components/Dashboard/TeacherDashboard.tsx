import React, { useEffect } from "react";
import CardDataStats from "../components/CardDataStats";
import TopSovedQuestions from "../components/Chat/TopSolvedCard";
import TopStudents from "../components/Tables/TopStudents";
import { useGetNumberOfAllQuestionQuery } from "@/store/profile/get-number-of-question-api";
import { useGetWeeklyReportQuery } from "@/store/profile/get-weekly-report";
import WeeklyReportChart from "../components/Charts/WeeklyReportChart";
import { useGetTopStudentsQuery } from "@/store/teacherprofile/get-top-students";
import SolvedQuestionPerSectionChart from "../components/Charts/SolvedQuestionPerSectionChart";
import { useGetAllQuestionsQuery } from "@/store/question/get-all-questions";

const TeacherDashboard: React.FC = () => {
  const [easy, setEasy] = React.useState(0);
  const [medium, setMedium] = React.useState(0);
  const [hard, setHard] = React.useState(0);

  function countQuestionsByDifficulty(difficulty: any) {
    return questions.questionWithTestcase.filter(
      (question: any) => question.difficulty === difficulty
    ).length;
  }

  const {
    data: numberofquestions,
    isLoading,
    isError,
  } = useGetNumberOfAllQuestionQuery("");
  const { data: weeklyReport, isLoading: weeklyLoading } =
    useGetWeeklyReportQuery("");
  const { data: topStudents, isLoading: topSolvedLoading } =
    useGetTopStudentsQuery("");

  const { data: questions, isLoading: questionsLoading } =
    useGetAllQuestionsQuery("");

  useEffect(() => {
    if (questions && questions.questionWithTestcase) {
      const easyCount = countQuestionsByDifficulty("easy");
      const mediumCount = countQuestionsByDifficulty("medium");
      const hardCount = countQuestionsByDifficulty("hard");

      setEasy(easyCount);
      setMedium(mediumCount);
      setHard(hardCount);
    }
  }, [questions]);
  if (weeklyLoading || isLoading || topSolvedLoading || questionsLoading) {
    return <div>Loading...</div>;
  }
  console.log(weeklyReport, "weeklyReport");
  console.log(numberofquestions, "data");
  console.log(topStudents, "topStudents");
  console.log(questions, "questions");

  return (
    <div className="w-full min-h-screen">
      <div className="flex justify-between">
        <div className="w-1/4 px-2">
          <CardDataStats
            title="Total questions"
            total={numberofquestions?.count}
            rate=""
          >
            <div></div>
          </CardDataStats>
        </div>
        <div className="w-1/4 px-2">
          <CardDataStats title="Hard" total={hard} rate="">
            <div></div>
          </CardDataStats>
        </div>
        <div className="w-1/4 px-2">
          <CardDataStats title="Medium" total={medium} rate="">
            <div></div>
          </CardDataStats>
        </div>
        <div className="w-1/4 px-2">
          <CardDataStats title="Easy" total={easy} rate="">
            <div></div>
          </CardDataStats>
        </div>
      </div>

      <div className="mt-4 flex md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 p-2">
        <div className="w-2/3">
          <WeeklyReportChart reports={weeklyReport} />
        </div>
        <div className="w-1/3">
          <SolvedQuestionPerSectionChart />
        </div>
      </div>
      <div className="mt-4 flex md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 p-2">
        <div className="w-2/3">
          
          <TopStudents topstudents={topStudents.topStudents} />
        </div>
        <div className="w-1/3">
          <TopSovedQuestions />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
