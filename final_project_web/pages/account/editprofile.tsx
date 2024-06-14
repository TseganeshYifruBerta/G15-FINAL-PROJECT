import React, { useEffect, useState } from "react";
import { Field, reduxForm, InjectedFormProps, initialize as initializeAction } from "redux-form";
import { useDispatch } from 'react-redux';
import { fetchUserProfile, UserProfile, createUserProfile } from '@/store/account/api_caller';
import { showToast } from '@/components/popup';
const jwt = require("jsonwebtoken");

interface UserProfileFormInputs {
  university: string;
  linkedin: string;
  github: string;
  phoneNumber: string;
  gender: string;
  department: string;
  shortBio: string;
}

interface DecodedToken {
  sub: string;
}

interface FormValidationErrors {
  [key: string]: string;
}

const validate = (values: UserProfileFormInputs) => {
    const errors: FormValidationErrors = {};
    if (!values.university) {
      errors.university = 'University is required';
    } else if (values.university.length > 30) {
      errors.university = 'University must be less than 30 characters';
    }
    if (!values.linkedin) {
      errors.linkedin = 'LinkedIn profile URL is required';
    } else if (!/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_]+\/?$/.test(values.linkedin)) {
      errors.linkedin = 'Invalid LinkedIn URL';
    } else if (values.linkedin.length > 50) {
      errors.linkedin = 'LinkedIn URL must be less than 50 characters';
    }
    if (!values.github) {
      errors.github = 'GitHub profile URL is required';
    } else if (!/^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]+\/?$/.test(values.github)) {
      errors.github = 'Invalid GitHub URL';
    } else if (values.github.length > 50) {
      errors.github = 'GitHub URL must be less than 50 characters';
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\+2519\d{8}$/.test(values.phoneNumber)) {
      errors.phoneNumber = 'Phone number must start with +2519 and be exactly 12 digits';
    }

    if (!values.gender) {
      errors.gender = 'Gender is required';
    } else if (!['male', 'female'].includes(values.gender.toLowerCase())) {
      errors.gender = 'Invalid gender selected';
    }
    if (!values.department) {
      errors.department = 'Department is required';
    } else if (values.department.length > 30) {
      errors.department = 'Department must be less than 30 characters';
    }
    if (!values.shortBio) {
      errors.shortBio = 'Short bio is required';
    } else if (values.shortBio.length > 80) {
      errors.shortBio = 'Short bio must be less than 80 characters';
    }
    return errors;
  };


  const renderField = ({ input, label, type, meta: { touched, error }, children }: any) => (
    <div className="mb-4 relative">
      <label className="block text-gray-700  font-bold mb-2">{label}</label>
      {type === "textarea" ? (
        <textarea {...input} className="shadow appearance-none border rounded w-full h-20 py-2 px-3 text-gray-700 bg-primary bg-opacity-10 leading-tight focus:outline-none focus:shadow-outline" />
      ) : type === "select" ? (
        <div className="relative">
          <select {...input} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-primary bg-opacity-10 leading-tight focus:outline-none focus:shadow-outline">
            {children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 bg-primary bg-opacity-10">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
          </div>
        </div>
      ) : (
        <input {...input} type={type} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-primary bg-opacity-10 leading-tight focus:outline-none focus:shadow-outline" />
      )}
      {touched && error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
const UserProfilePage: React.FC<InjectedFormProps<UserProfileFormInputs>> = (props) => {
  const { handleSubmit, pristine, submitting, initialize } = props;
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      const decodedToken = jwt.decode(token);
      if (decodedToken && typeof decodedToken === 'object') {
        setUserId(decodedToken.id); 
        loadUserProfile(token, decodedToken.id);
      }
    }
  }, []);

  const loadUserProfile = async (token: string, userId: number) => {
    try {
      const userProfile = await fetchUserProfile(token, userId);
      initialize(userProfile);  // Use initialize from props to set form values
    } catch (error) {
      console.error('Error loading user profile:', error);
      showToast('Error loading user profile: ' + (error as Error).message, 'error');
    }
  };

  const onSubmit = async (values: UserProfileFormInputs) => {
    if (!token || !userId) {
      showToast('Authentication error: Token or user ID is missing', 'error');
      return;
    }

    try {
      const response = await createUserProfile(token, values, userId);
      showToast('Profile updated successfully', 'success');
      window.location.reload(); // Refresh the page after successful submission
    } catch (error) {
      console.error('Profile update error:', error);
      showToast('Profile update error: ' + (error as Error).message, 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded px-8 pt-6 pb-8 mb-4 flex flex-wrap justify-center">
      <div className="flex flex-col items-center w-full">
        <h2 className="text-2xl font-bold mb-6 text-left self-start w-full">Edit Profile</h2>
      </div>

      <div className="flex justify-center gap-6 w-full">
        <div className="flex flex-col w-1/2 p-2">
          <Field name="university" type="text" component={renderField} label="University" />
          <Field name="linkedin" type="url" component={renderField} label="LinkedIn Profile" />
          <Field name="github" type="url" component={renderField} label="GitHub Profile" />
          <Field name="phoneNumber" type="tel" component={renderField} label="Phone number" />
        </div>
        <div className="flex flex-col w-1/2 p-2">
        <Field name="gender" type="select" component={renderField} label="Gender">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Field>
          <Field name="department" type="text" component={renderField} label="Department" />
          <Field name="shortBio" type="textarea" component={renderField} label="Short bio" />
        </div>
      </div>
      <div className="w-full flex justify-center p-4 items-center">
        <button
          type="submit"
          disabled={pristine || submitting}
          className="bg-primary text-white hover:bg-primary hover:bg-opacity-90 py-2 px-4 flex items-center shadow-lg duration-200 rounded-xl transform transition ease-in-out hover:scale-105 "
        >
          Submit
        </button>
      </div>
    </form>
  );
};

const ConnectedUserProfilePage = reduxForm<UserProfileFormInputs>({
  form: 'userProfile',
  validate,
})(UserProfilePage);

export default ConnectedUserProfilePage;