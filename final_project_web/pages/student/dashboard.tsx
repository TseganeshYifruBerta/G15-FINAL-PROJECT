<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import useDashboardData from './../../components/hooks/useDashboardData';
import MemoizedHeatMap from '../../components/Dashboard/student/HeatMap';
import MemoizedSolvedProblemsStats from '@/components/Dashboard/student/SolvedQuestions';
import SubmissionList from '../../components/Dashboard/student/SubmissionList';
import UpcomingExams from '../../components/Dashboard/student/UpcomingExam'; 
import Image from 'next/image';
import Loading from '@/components/common/Loading';
const jwt = require("jsonwebtoken");

const Dashboard = () => {
  const [userData, setUserData] = useState({ fullname: '', role: '' });
  const { difficultyData, acceptedSubmissionData, submissions, upcomingExams, isLoading, error } = useDashboardData();

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error loading data</div>;
    }


  return (
    <div className='flex flex-col mx-20 gap-6 pb-8 bg-primary bg-opacity-5 p-4 rounded-lg'>
      <div className='flex flex-col h-screen/3'>
      <div className='box-border h-[200px] w-full p-4 rounded-lg' style={{ backgroundImage: "url('/images/2.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      </div>

        <div className='flex flex-row gap-8'>
        <Image
                width={64}
                height={64}
                src="/images/pro2.png"
                alt=""
                className="inline-block bg-white border-white border-4 ml-[36px] mt-[-78px] h-36 w-36 p-[-4px] rounded-full ring-2 ring-white text-primary w-20 h-20"
              />
          <div className='flex flex-col'>
          <h2 className='text-lg text-white mt-[-54px]'>{userData.fullname}</h2>
          <p className='text-sm  text-white'>{userData.role}</p>
        </div>
          
        </div>
      </div>
      <div className='flex flex-col gap-10'>
        <div className='flex flex-  md:flex-row gap-6'>
          <MemoizedSolvedProblemsStats />
          <UpcomingExams /> 
        </div>
          <MemoizedHeatMap />
      </div>
      <div className=''>
        <h2 className='text-l font-semibold text-gray-800 mt-4'>Recent Submissions</h2>
        <div className="flex flex-col gap-4 mt-12 rounded-lg">
         <SubmissionList /> 
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
=======
import React, { useEffect, useState } from 'react';
import MemoizedHeatMap from '../../components/Dashboard/student/HeatMap';
import MemoizedSolvedProblemsStats from '@/components/Dashboard/student/SolvedQuestions';
import SubmissionList from '../../components/Dashboard/student/SubmissionList';
import UpcomingExams from '../../components/Dashboard/student/UpcomingExam'; 
import Image from 'next/image';
const jwt = require("jsonwebtoken");

const Dashboard = () => {
  const [userData, setUserData] = useState({ fullname: '', role: '' });


  return (
    <div className='flex flex-col mx-20 gap-6 pb-36'>
      <div className='flex flex-col h-screen/3'>
      <div className='box-border h-[200px] w-full p-4 border-4 bg-primary bg-opacity-80 rounded-xl' style={{ backgroundImage: "url('/images/bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      </div>

        <div className='flex flex-row gap-8'>
        <Image
                width={64}
                height={64}
                src="/images/avatar.jpeg"
                alt=""
                className="inline-block bg-white ml-[36px] mt-[-78px] h-36 w-36 rounded-full ring-2 ring-white text-primary w-20 h-20"
              />
          <div className='flex flex-col'>
          <h2 className='text-lg text-white mt-[-54px]'>{userData.fullname}</h2>
          <p className='text-sm  text-white'>{userData.role}</p>
        </div>
          
        </div>
      </div>
      <div className='flex flex-col gap-10'>
        <div className='flex flex-  md:flex-row gap-6'>
          <MemoizedSolvedProblemsStats userName={userData.fullname} />
          <UpcomingExams /> 
        </div>
          <MemoizedHeatMap userName={userData.fullname} />
      </div>
      <div className='gap-24'>
        <h2 className='text-lg font-semibold p-4'>Recent Submissions</h2>
        <div className="flex flex-col gap-4 mt-12">
         <SubmissionList /> 
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
>>>>>>> 96fa67b (admin_landing_profile_pages_update)
