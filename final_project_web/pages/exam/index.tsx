import React, { useState, useEffect } from "react";
import QuestionById from "./examquestion";
import { useRouter } from "next/router";
import { getAllExamsApi, useGetAllExamsQuery } from "@/store/exam/get-all-exam-api";

const ExaminationPage = () => {
    // const {data:allexamquestions, isLoading, isError} = useGetAllExamsQuery("")
    // if(isLoading){
    //     return(
    //         <div>loading</div>
    //     )
    // }

    // console.log(allexamquestions)
    const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 1 hour in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds:any) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
useEffect(() => {
  const timer = setTimeout(() => {
    router.push("/");
  }, 5000*50000); // 30 minutes

  const resetTimer = () => {
    clearTimeout(timer);
    startTimer();
  };

  const startTimer = () => {
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keydown", resetTimer);
    document.addEventListener("touchstart", resetTimer);
  };

  startTimer();

  return () => {
    clearTimeout(timer);
    document.removeEventListener("mousemove", resetTimer);
    document.removeEventListener("keydown", resetTimer);
    document.removeEventListener("touchstart", resetTimer);
  };
}, []);
  return (
    <div>
      <h1 className="text-xl font-bold">
        Examination <span className="text-primary">Environment</span>
      </h1>
      <div className="flex">
        <div className="border-2 border-primary p-2 m-2 rounded-md">
          Time Left: {formatTime(timeLeft)}
        </div>
      </div>
      <div>
        {/* {allexamquestions.map((exam: any, index:any) => (
          <div key={index}>
            <QuestionCardStudent
              id={question.id}
              title={question.title}
              difficulty={question.difficulty}
              description={question.description}
              example={question.example}
              createdAt={question.createdAt}
              updatedAt={question.updatedAt}
            />
          </div>
        ))} */}
      </div>
      <QuestionById />
    </div>
  );
};

export default ExaminationPage;
