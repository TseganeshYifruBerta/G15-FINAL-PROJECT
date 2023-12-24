import Image from "next/image";
import { Inter } from "next/font/google";
import { FaRegUserCircle } from "react-icons/fa";
import SignupForm from "@/components/SignupForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <main className={`flex min-h-screen flex-col    ${inter.className}`}>
      <div className="min-h-screen bg-white  flex items-center justify-center h-screen ">
        <div className="w-1/2 h-full bg-white">
          <h2 className="text-6xl font-bold mb-6 mt-12 ml-16">WELCOME</h2>
          <p className="text-5xl font-semibold mb-14 ml-16">
            <span className="text-[#7983FB]">BYTE</span> - MENTOR
          </p>

          <Image
            src="/images/signup.png"
            alt="JPG Image"
            width={400}
            height={400}
            className="ml-16 mb-4"
          />
        </div>
        <div className="w-1/2 h-full bg-[#7983FB] "></div>
        <div className="absolute flex justify-between">
          <div className="bg-white rounded-lg p-8 shadow-md ml-20 w-[18rem] max-w-[18rem]">
            <div className="flex items-center justify-center">
              <FaRegUserCircle className="text-6xl text-gray-600" />
            </div>
            <h2 className="block items-center justify-between p-3 text-2xl font-semibold text-bold">
              Create Account
            </h2>
            <SignupForm onSubmit={onSubmit} />
            <p className="mt-1 text-xs font-bold text-gray-600">
              Already have an account?{" "}
              <a href="#" className="text-blue-500 font-bold">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
