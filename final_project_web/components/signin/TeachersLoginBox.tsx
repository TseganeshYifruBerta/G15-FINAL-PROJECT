import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TeacherLoginFormData,
  teacherlogin,
} from "@/store/signin/teacher-signin-api";
import { showToast } from "../popup";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { useDispatch } from "react-redux";
import { setUserId } from "@/store/signin/student-signin-slice";
export interface FormValues {
  email: string;
  password: string;
}

const validate = (values: FormValues) => {
  const errors: Partial<FormValues> = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

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
const TeachersLoginBox: React.FC<InjectedFormProps<FormValues>> = ({
  handleSubmit,
}) => {
  const router = useRouter();
  const onSubmit = async (values: FormValues) => {
    console.log(values);
    try {
      const data = await teacherlogin(values as TeacherLoginFormData);
      if (data.message === "Teacher not found") {
        return showToast("Teacher not found", "error");
      }
      // dispatch(setUserId(data.userId))
      showToast("Login successful", "success");
      router.push("/teacher/");
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
            <h3 className="mb-1 font-bold">Email</h3>
            <Field
              name="email"
              type="email"
              id="Email"
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

const ConnectedSigninFormTeacher = reduxForm<FormValues>({
  form: "signin",
  validate,
})(TeachersLoginBox);

export default ConnectedSigninFormTeacher;
