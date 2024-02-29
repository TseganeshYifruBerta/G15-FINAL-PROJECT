import React from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { BiSolidUserRectangle } from "react-icons/bi";
import { MdNumbers, MdOutlineMailOutline } from "react-icons/md";
import { TbUserQuestion } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import { register, RegisterFormData } from "@/store/signup/ApiCallerTeacher";
import { useRouter } from "next/router";
import { showToast } from "../popup";

interface FormValues {
  fullName: string;
  email: string;
  section: string;
  password: string;
  confirmPassword: string;
}

const validate = (values: FormValues) => {
  const errors: Partial<FormValues> = {};

  if (!values.fullName) {
    errors.fullName = "Username is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.section) {
    errors.section = "Section is required";
  } else if (!/^\d+$/.test(values.section)) {
    errors.section = "Section must be a number";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
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
        className="border-b-2 border-gray-300 px-3 py-0 rounded focus:outline-none focus:ring-2 focus:ring-[#7983FB] w-full text-gray-600 text-sm "
      />
      {touched && error && (
        <span className="text-red-500 text-xs absolute -bottom-4 left-0 right-0">
          {error}
        </span>
      )}
    </div>
  </div>
);

const SignupFormTeacher: React.FC<InjectedFormProps<FormValues>> = ({
  handleSubmit,
}) => {
  const router = useRouter();
  const onSubmit = async (values: FormValues) => {
    try {
      values.fullName = values.fullName;
      console.log(values);

      const data = await register(values as RegisterFormData);
      console.log("Registration successful:", data);
      showToast("Registration successful", "success");

      router.push("/signin/teachers");
    } catch (error) {
      console.error("Registration error:", error);
      showToast("Registration error: " + (error as Error).message, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="name" className="flex text-gray-600 text-xs">
          {" "}
          <BiSolidUserRectangle className="mr-2" />
          FullName
        </label>
        <Field
          type="text"
          name="fullName"
          component={renderTextAreaField}
          id="name"
          className="border-b-2 border-gray-300 px-3 py-4 rounded focus:outline-none focus:ring-2 focus:ring-[#7983FB] text-gray-600 text-xl  w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="flex text-gray-600 text-xs">
          {" "}
          <MdOutlineMailOutline className="mr-2" />
          Email
        </label>
        <Field
          type="email"
          id="email"
          name="email"
          component={renderTextAreaField}
          className="border-b-2 border-gray-300 px-3 py-0 rounded focus:outline-none focus:ring-2 focus:ring-[#7983FB] text-gray-600 text-xs font-bold w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="section" className="flex text-gray-600 text-xs">
          {" "}
          <TbUserQuestion className="mr-2" />
          Section
        </label>
        <Field
          id="section"
          name="section"
          component={renderTextAreaField}
          className="border-b-2 border-gray-300 px-3 py-0 rounded focus:outline-none focus:ring-2 focus:ring-[#7983FB] w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="flex text-gray-600 text-xs">
          {" "}
          <RiLockPasswordLine className="mr-2" />
          Password
        </label>
        <Field
          name="password"
          type="password"
          component={renderTextAreaField}
          id="password"
          className="border-b-2 border-gray-300 px-3 py-0 rounded focus:outline-none focus:ring-2 focus:ring-[#7983FB] w-full  text-xs"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="flex text-gray-600 text-xs">
          {" "}
          <RiLockPasswordLine className="mr-2" />
          Confirm Password
        </label>
        <Field
          name="confirmPassword"
          type="password"
          id="confirmPassword"
          component={renderTextAreaField}
          className="border-b-2 border-gray-300 px-3 py-0 rounded focus:outline-none focus:ring-2 focus:ring-[#7983FB] text-xs w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-[#7983FB]  text-white py-2 px-4 mt-4 rounded hover:bg-blue-600 w-full"
      >
        Sign Up
      </button>
    </form>
  );
};

const ConnectedSignupFormTeacher = reduxForm<FormValues>({
  form: "signup",
  validate,
})(SignupFormTeacher);

export default ConnectedSignupFormTeacher;
