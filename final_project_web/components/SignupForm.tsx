import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { BiSolidUserRectangle } from "react-icons/bi";
import { MdNumbers } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbUserQuestion } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import { useGetStudentsSignUpApiQuery } from '@/store/signup/students-signup-api';
import Link from 'next/link';

interface FormValues {
    username: string;
    idno: string;
    email: string;
    section: string;
    password: string;
    confirmPassword: string;
  }
  
  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
  
    if (!values.username) {
      errors.username = 'Username is required';
    }
  
    if (!values.idno) {
      errors.idno = 'ID.no is required';
    }
  
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    if (!values.section) {
      errors.section = 'Section is required';
    }
  
    if (!values.password) {
      errors.password = 'Password is required';
    }
  
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
  
    return errors;
  };

  const renderTextAreaField = ({
    input,
    label,
    meta: { touched, error },
  }: any) => (
    <div>
      <label htmlFor={input.name} className="flex text-gray-600 text-xs">
        {label}
      </label>
      <div>
        <input
          {...input}
          type={input.name === "password" || input.name === "confirmPassword" ? "password" : "text"}
          className="border-b-2 border-gray-300 px-3 py-0 rounded focus:outline-none focus:ring-2 focus:ring-[#7983FB] w-full text-gray-600 text-xs font-bold"
        />
        {touched && error && <span className="text-red-500 text-xs">{error}</span>}
      </div>
    </div>
  );
  
  const renderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
  }: any) => (
    <div>
      <label htmlFor={input.name} className="flex text-gray-600 text-xs">
        {label}
      </label>
      <div>
        <select {...input} className="border-b-2 border-gray-300 px-3 py-0 rounded focus:outline-none focus:ring-2 focus:ring-[#7983FB] w-full text-gray-600 text-xs font-bold">
          {children}
        </select>
        {touched && error && <span className="text-red-500 text-xs">{error}</span>}
      </div>
    </div>
  );
  const SignupForm: React.FC<InjectedFormProps<FormValues>> = (props) => {
    const { handleSubmit } = props;
  // const {data:signUpStatus, isLoading, isError} = useGetStudentsSignUpApiQuery("")
  // console.log(signUpStatus)
  // if(isLoading){
  //   return (
  //     <div>Loading</div>
  //   )
  // }
  // if (signUpStatus){
  //   return <div>SignUpStatus</div>;
  // }
    return (
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="username" className="flex text-gray-600 text-xs">
            {" "}
            <BiSolidUserRectangle className="mr-2" />
            User Name
          </label>
          <Field
            type="text"
            name="username"
            component={renderTextAreaField}
            id="username"
            className="border-b-2 border-gray-300 px-3 py-0 rounded focus:outline-none focus:ring-2 focus:ring-[#7983FB] text-gray-600 text-xs font-bold w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="idno" className="flex text-gray-600 text-xs">
            {" "}
            <MdNumbers className="mr-2" />
            ID.no
          </label>
          <Field
            name="idno"
            type="text"
            id="idno"
            component={renderTextAreaField}
            className="border-b-2 border-gray-300 px-3 py-0 rounded focus:outline-none focus:ring-2 focus:ring-[#7983FB] text-gray-600 text-xs font-bold w-full"
          />
        </div>
        <div className="mb-2">
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
        <div className="mb-2">
          <label htmlFor="email" className="flex text-gray-600 text-xs">
            {" "}
            <MdOutlineMailOutline className="mr-2" />
            Section
          </label>
          <Field
            type="text"
            id="email"
            name="email"
            component={renderTextAreaField}
            className="border-b-2 border-gray-300 px-3 py-0 rounded focus:outline-none focus:ring-2 focus:ring-[#7983FB] text-gray-600 text-xs font-bold w-full"
          />
        </div>
        <div className="mb-2">
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
        <div className="mb-2">
          <label
            htmlFor="confirmPassword"
            className="flex text-gray-600 text-xs"
          >
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
        <div className="mb-4">
          <label className="flex items-center text-gray-600 text-xs font-bold">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
        </div>
        <Link href={'/signin'}>
          <button
            type="submit"
            className="bg-[#7983FB]  text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
          >
            Sign in
          </button>
        </Link>
      </form>
    );
        };
        
        export default reduxForm<FormValues>({
          form: 'signup',
          validate,
        })(SignupForm);