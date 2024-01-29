import StudentsLoginBox from "@/components/signin/StudentsLoginBox";
import Image from "next/image";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";

function StudentsLogin() {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <div className="min-h-screen bg-white  flex items-center justify-center h-screen ">
      <div className="w-1/2 h-full bg-white">
        <div>
          <h1 className="text-5xl font-md">WELCOME</h1>
          <h2 className="text-5xl font-bold">
            <span className="font-bold text-5xl text-primary">BYTE</span>
            -MENTOR
          </h2>
          <p className="flex font-light w-2/3 mt-4">
            A WEBSITE WITH COOL FEATURES LIKE EASY QUESTION SUBMISSION, HANDS-ON
            INTERACTIVE CODING ECERCISES, SMART GRADING, AND PLAGIARISM
            CHECKERS. IT{`&apos;`}S NOT JUST A NEW THING, IT
            {`&apos;`}S LIKE UPGRADING WHAT{`&apos;`}S ALREADY THERE.
          </p>
          <Image
            src={"/images/signup.png"}
            alt={""}
            width={400}
            height={400}
            className="m-10"
          />
        </div>
      </div>
      <div className="w-1/2 h-full bg-[#7983FB] "></div>

      <div className="absolute flex justify-between">
        <div className="w-[30vw] h-full bg-white p-8 shadow-md ml-20  ">
          <div className="flex items-center justify-center">
            <FaRegUserCircle className="text-6xl text-gray-600" />
          </div>
          <div className="flex items-center justify-center">
            <h2 className="p-3 text-2xl font-semibold text-bold mb-2">
              Create Account
            </h2>
          </div>
          <StudentsLoginBox />
          Create an account?{" "}
          <Link href="/signup/student" className="text-blue-500 font-bold">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentsLogin;
