import React from "react"
import Image from "next/image"

const HomeCommon : React.FC = () => {
    return (
      <div className="flex w-1/2 pl-10 items-center">
        <div>
          <div className="flex">
            <h1 className="text-6xl font-md text-primary">
              ሁሉ <span className="font-bold text-4xl text-black"> CODE</span>
            </h1>
          </div>
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
    );
}
export default HomeCommon;