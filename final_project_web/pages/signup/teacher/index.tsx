import Image from 'next/image'
import { Inter } from 'next/font/google'
import { FaRegUserCircle } from "react-icons/fa";
import SignupFormTeacher from '../../../components/signup/SignupFormTeacher';




const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const onSubmit = (values: any) => {
    console.log(values);  };
  return (
    <main className={`flex min-h-screen flex-col    ${inter.className}`}>
      <div className="min-h-screen bg-white  flex items-center justify-center h-screen ">
        <div className="w-1/2 h-full bg-white">
          <div className="flex pb-24 pt-8 ">
            <h1 className="text-6xl font-md text-primary pl-4">
              ሁሉ <span className="font-bold text-4xl text-black"> CODE</span>
            </h1>
          </div>

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
          <div className="w-[30vw] h-full bg-white p-8 shadow-md ml-20  ">
            <div className="flex items-center justify-center">
              <FaRegUserCircle className="text-6xl text-gray-600" />
            </div>
            <div className="flex items-center justify-center">
              <h2 className="p-3 text-2xl font-semibold text-bold mb-2">
                Create Account
              </h2>
            </div>
            <SignupFormTeacher onSubmit={onSubmit} />
            <p className="mt-2 text-xs font-bold text-gray-600">
              Already have an account?{" "}
              <a href="/signin/teachers" className="text-blue-500 font-bold">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
