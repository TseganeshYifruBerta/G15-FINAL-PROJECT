import LoginBox from "@/components/signin/LoginBox";
import Image from "next/image";

function Login() {
    return (
      <div className="flex flex-wrap">
        <div className="flex w-1/2 pl-10 items-center">
          <div>
            <h1 className="text-5xl font-md">WELCOME</h1>
            <h2 className="text-5xl font-bold">
              <span className="font-bold text-5xl text-primary">BYTE</span>
              -MENTOR
            </h2>
            <p className="flex font-light w-2/3 mt-4">
              A WEBSITE WITH COOL FEATURES LIKE EASY QUESTION SUBMISSION,
              HANDS-ON INTERACTIVE CODING ECERCISES, SMART GRADING, AND
              PLAGIARISM CHECKERS. IT{`&apos;`}S NOT JUST A NEW THING, IT
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
        <div className="flex items-center min-h-screen bg-primary w-1/2">
          <LoginBox />
        </div>
      </div>
    );
}

export default Login