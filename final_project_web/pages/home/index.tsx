import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="ml-10">
      <div className="flex mt-44">
        <div className="w-1/2">
          <h1 className="text-5xl font-md">WELCOME</h1>
          <h2 className="text-5xl font-bold">
            <span className="font-bold text-5xl text-primary">BYTE</span>
            -MENTOR
          </h2>
          <p className="flex font-light w-2/3 mt-8">
            A WEBSITE WITH COOL FEATURES LIKE EASY QUESTION SUBMISSION, HANDS-ON
            INTERACTIVE CODING ECERCISES, SMART GRADING, AND PLAGIARISM
            CHECKERS. IT{`&apos;`}S NOT JUST A NEW THING, IT
            {`&apos;`}S LIKE UPGRADING WHAT{`&apos;`}S ALREADY THERE.
          </p>

          <div className="flex mt-16">
            <Link
              href={"/signin"}
              className="bg-primary rounded-md px-6 py-2 mr-2 font-bold text-white"
            >
              SignIn
            </Link>
            <Link
              href={"/signup"}
              className="bg-primary rounded-md px-6 py-2 font-bold text-white"
            >
              SignUp
            </Link>
          </div>
        </div>

        <div>
          <Image src={"/images/home.png"} alt={""} width={500} height={500} />
        </div>
      </div>
    </div>
  );
}


