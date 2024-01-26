import { useAppDispatch } from "@/store/hook";
import { useLoginStudentMutation } from "@/store/signin/student-auth-api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image"

const StudentLogin : React.FC = () => {

      const dispatch = useAppDispatch();
      const [id, setid] = useState("");
      const [password, setpassword] = useState("");
      const formValue = {id: id, password: password}


   const router = useRouter();
let [
  signinStudent,
  {
    data: signinData,
    isError: isSigninError,
    isSuccess: isSigninSucces,
    error: signInError,
    isLoading: isSigninLoading,
  },
] = useLoginStudentMutation();

   const handleSignin = async (e: any) => {
      e.preventDefault();

      signinStudent(formValue);
      console.log(signinData, isSigninError)
    }
   const handleSignup = () => {
     router.push("/signup");
   };


  
    return (
      <div className="w-2/3 bg-white p-8 shadow-md flex flex-col -ml-16">
        <div className="mb-4 flex justify-center">
          <div>
            <Image
              src="/images/profile.png"
              alt=""
              width={80}
              height={80}
              className="rounded-full"
            />
            <h1 className="text-2xl font-semibold">LOGIN</h1>
          </div>
        </div>
        <form action="">
          <div className="mb-4 w-full">
            <div className="mb-4">
              <h3 className="mb-1 font-bold">ID No</h3>
              <input
                type="text"
                className="w-full border-b border-gray-500 focus:outline-none focus:border-blue-500"
                placeholder="UGR/1234/**"
                value={id}
                onChange={(e) => {
                  setid(e.target.value)}}
              />
            </div>
            <div>
              <h3 className="mb-1 font-bold">PASSWORD</h3>
              <input
                type="password"
                name=""
                id=""
                placeholder="********"
                className="w-full border-b border-gray-500 focus:outline-none focus:border-blue-500"
                value={password}
                onChange={(e)=>{setpassword(e.target.value)}}
              />
            </div>
          </div>

          <div>
            <button
              onClick={handleSignin}
              className="w-full bg-primary text-white px-4 py-2"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    );
}

export default StudentLogin