import React, { useState, useEffect } from 'react';
import { useGetUpcomingExamsQuery } from "./../../../store/exam/upcoming-exam-api"; 
import Image from "next/image";
import { useRouter } from "next/router";
import Loading from '@/components/common/Loading';

const UpcomingExams = () => {
  const router = useRouter();
  const { data: upcomingExams, isLoading, error } = useGetUpcomingExamsQuery(); 
  const [timeLeft, setTimeLeft] = useState(0); 
  const [timerColor, setTimerColor] = useState(""); 

  useEffect(() => {
    if (upcomingExams && new Date(upcomingExams.date_and_time) > new Date()) {
      const timerInterval = setInterval(() => {
        const currentTime = new Date(); 
        const examTime = new Date(upcomingExams.date_and_time); 
        const differenceInMilliseconds = examTime.getTime() - currentTime.getTime();
        const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
        setTimeLeft(differenceInSeconds); 
        if (differenceInSeconds <= 3600) {
          setTimerColor("text-red-500"); 
        } else {
          setTimerColor(""); 
        }
      }, 1000);

      return () => clearInterval(timerInterval);
    } else {
      setTimeLeft(0);
    }
  }, [upcomingExams]);

  const formatTime = (seconds:number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return <Loading />;
  }

    if (error) {
      return <div>Error:</div>;
  }

  return (
    <div className="flex flex-col gap-4 items-center rounded-lg shadow-sm p-4 md:w-3/4 bg-white">
      {timeLeft === 0 ? (
        <div className="col-span-12 px-5 pb-5 pt-7.5 sm:px-7.5 xl:col-span-8">
        <div className="flex flex-col items-center justify-center text-center">
          <Image
            src="/images/nodata.svg"
            className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-500"
            alt={""}
            width={12}
            height={12}
          ></Image>
          <h3 className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
            No Upcoming Exams
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            It looks like there is no upcoming exam at the moment !
          </p>
        </div>
      </div>
      ) : (
        <div className="mb-8 p-4 rounded-lg text-black h-[130px] transition-shadow duration-300 ease-in-out cursor-pointer bg-slate-200">
          <div className="flex items-center space-x-4 h-full">
            <div className="flex-shrink-0">
              <Image
                width={64}
                height={64}
                src="/images/exam.svg"
                alt=""
                className="text-primary w-20 h-20"
              />
            </div>
            <div className="flex flex-col justify-between h-full gap-4">
              <div className='flex flex-col gap-4'>
                <h3 className="text-sm font-semibold">
                  Upcoming Exam: {upcomingExams?.title}
                </h3>
                <div className="flex items-center justify-center">
                <div className={`text-sm border-2 border-primary p-2 m-2 rounded-md ${timerColor}`}>
                  Time Left: {formatTime(timeLeft)}
                </div>
                </div>
              </div>
              <div>
                <p className="text-xs">Get ready to showcase your skills!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingExams;
