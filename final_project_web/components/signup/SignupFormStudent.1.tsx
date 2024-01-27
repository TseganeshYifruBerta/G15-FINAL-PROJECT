// import React from "react";
// import { Field, InjectedFormProps } from "redux-form";
// import { BiSolidUserRectangle } from "react-icons/bi";
// import { MdNumbers, MdOutlineMailOutline } from "react-icons/md";
// import { TbUserQuestion } from "react-icons/tb";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { register, RegisterFormData } from "@/store/signup/ApiCallerStudent";
// import { showToast } from "../popup";
// import Link from "next/link";
// import { FormValues, renderTextAreaField } from "./SignupFormStudent";

// export const SignupFormStudent: React.FC<InjectedFormProps<FormValues>> = ({
//   handleSubmit,
// }) => {
//   const onSubmit = async (values: FormValues) => {
//     try {
//       const data = await register(values as RegisterFormData);
//       showToast("Registration successful", "success");
//     } catch (error) {
//       console.error("Registration error:", error);
//       showToast("Registration error: " + (error as Error).message, "error");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="mb-4">
//         <label htmlFor="name" className="flex text-gray-600 text-xs">
//           <BiSolidUserRectangle className="mr-2" />
//           User Name
//         </label>
//         <Field
//           type="text"
//           name="name"
//           component={renderTextAreaField}
//           id="name"
//           className="border-b-2 border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#7983FB] text-gray-600 text-xs font-bold w-full"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="userId" className="flex text-gray-600 text-xs">
//           {" "}
//           <MdNumbers className="mr-2" />
//           ID.no
//         </label>
//         <Field
//           name="userId"
//           type="text"
//           id="userId"
//           component={renderTextAreaField}
//           className="border-b-2 border-gray-300 px-3 py-0 rounded focus:outline-none focus:ring-2 focus:ring-[#7983FB] text-gray-600 text-xs font-bold w-full"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="email" className="flex text-gray-600 text-xs">
//           {" "}
//           <MdOutlineMailOutline className="mr-2" />
//           Email
//         </label>
//         <Field
//           type="email"
//           id="email"
//           name="email"
//           component={renderTextAreaField}
//           className="border-b-2 border-gray-300 px-3 py-0 rounded focus:outline-none focus:ring-2 focus:ring-[#7983FB] text-gray-600 text-xs font-bold w-full"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="section" className="flex text-gray-600 text-xs">
//           {" "}
//           <TbUserQuestion className="mr-2" />
//           Section
//         </label>
//         <Field
//           id="section"
//           name="section"
//           component={renderTextAreaField}
//           className="border-b-2 border-gray-300 px-3 py-0 rounded focus:outline-none focus:ring-2 focus:ring-[#7983FB] w-full"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="password" className="flex text-gray-600 text-xs">
//           {" "}
//           <RiLockPasswordLine className="mr-2" />
//           Password
//         </label>
//         <Field
//           name="password"
//           type="password"
//           component={renderTextAreaField}
//           id="password"
//           className="border-b-2 border-gray-300 px-3 py-0 rounded focus:outline-none focus:ring-2 focus:ring-[#7983FB] w-full  text-xs"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="confirmPassword" className="flex text-gray-600 text-xs">
//           {" "}
//           <RiLockPasswordLine className="mr-2" />
//           Confirm Password
//         </label>
//         <Field
//           name="confirmPassword"
//           type="password"
//           id="confirmPassword"
//           component={renderTextAreaField}
//           className="border-b-2 border-gray-300 px-3 py-0 rounded focus:outline-none focus:ring-2 focus:ring-[#7983FB] text-xs w-full"
//         />
//       </div>

//       <Link>
//         <button
//           type="submit"
//           className="bg-[#7983FB] text-white py-2 px-4 mt-4 rounded hover:bg-blue-600 w-full"
//         >
//           Sign Up
//         </button>
//       </Link>
//     </form>
//   );
// };
