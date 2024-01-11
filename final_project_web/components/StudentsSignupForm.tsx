import React, { useId, useState } from "react";
import Image from "next/image"
import Link from "next/link";
import { AppDispatch, RootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { registerStudent } from "@/stores/actions/studentRegisterAction";
import { useRouter } from "next/router";
const StudentsSignUpForm: React.FC = () => {
     const router = useRouter();
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [userId, setUserId] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
      const [section, setSection] = useState("");
 const dispatch: AppDispatch = useDispatch(); // Use AppDispatch type
 useSelector((state: RootState) => state.studentregister);

 const data = {
   name: name,
   email: email,
   userId: userId,
   section: section,
   password: password,
   confirmPassword: confirmPassword
 };
const submitForm = async (data: any, e: React.FormEvent) => {
  e.preventDefault();


  data.email = email;
  data.name = name;
  data.userId = userId;
  data.section = section;

  try {
    await dispatch(registerStudent(data));
setTimeout(() => {
  router.push("/signin");
}, 1000);
    console.log("Form submitted successfully");
  } catch (error) {
    console.error("Error during registration:", error);
  }
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
          <h1 className="text-2xl font-semibold">SIGNUP</h1>
        </div>
      </div>
      <form onSubmit={(e) => submitForm(data, e)}>
        <div className="w-full">
          <div className="mb-6">
            <input
              type="text"
              className="w-full border-b border-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              className="w-full border-b border-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              className="w-full border-b border-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="userID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              className="w-full border-b border-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="Section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              className="w-full border-b border-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              className="w-full border-b border-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
            <button
              className="w-full bg-primary text-white px-4 py-2"
              type="submit"
            >
              Sign Up
            </button>
        
        </div>
      </form>
    </div>
  );
}
export default StudentsSignUpForm;
