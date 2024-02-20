import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  StudentLoginFormData,
  studentlogin,
} from "@/store/signin/student-signin-api";
import { showToast } from "../popup";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "@/store/signin/student-signin-slice";
export interface FormValues {
  userId: string;
  password: string;
}
const renderTextAreaField = ({
  input,
  label,
  meta: { touched, error },
}: any) => (
  <div>
    <label htmlFor={input.name} className="flex text-gray-600 text-sm">
      {label}
    </label>
    <div className="relative">
      <input
        {...input}
        type={
          input.name === "password" || input.name === "confirmPassword"
            ? "password"
            : "text"
        }
        className="border-b-2 border-gray-300 px-3 py-0 rounded focus:outline-none focus:ring-2 focus:ring-[#7983FB] w-full text-gray-600 text-sm"
      />
      {touched && error && (
        <span className="text-red-500 text-xs  absolute -bottom-4 left-0 right-0">
          {error}
        </span>
      )}
    </div>
  </div>
);
const StudentsLoginBox: React.FC<InjectedFormProps<FormValues>> = ({handleSubmit}) => {
  
  const router = useRouter()
  const dispatch = useDispatch()
      

      // const userData = useSelector((state: any) => state.studentsignin.userId);
// console.log(userData);

  const onSubmit = async (values: FormValues) => {
    try {
      const data = await studentlogin(values as StudentLoginFormData);
       const _id = data.loggedInStudent.studentId;
      console.log(_id);
      dispatch(setUserId(_id));
      showToast("Login successful", "success");
      router.push("/profile")
    } catch (error) {
      console.error("Login error:", error);
      showToast("Login error: " + (error as Error).message, "error");
    }
  };
    

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <div className="mb-4 w-full">
          <div className="mb-4">
            <h3 className="mb-1 font-bold">ID No</h3>
            <Field
              name="userId"
              type="text"
              id="userId"
              component={renderTextAreaField}
              className="w-full border-b border-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <h3 className="mb-1 font-bold">PASSWORD</h3>
            <Field
              name="password"
              type="password"
              id="password"
              component={renderTextAreaField}
              className="w-full border-b border-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-[#7983FB] text-white py-2 px-4 mt-4 rounded hover:bg-blue-600 w-full"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};


const ConnectedSigninFormStudent = reduxForm<FormValues>({
  form: "signin",
})(StudentsLoginBox);

export default ConnectedSigninFormStudent;