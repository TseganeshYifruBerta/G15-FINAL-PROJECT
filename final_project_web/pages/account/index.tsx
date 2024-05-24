import React, { useEffect, useState } from 'react';
import { Field, reduxForm, InjectedFormProps, change, WrappedFieldProps } from 'redux-form';
import { useDispatch } from 'react-redux';
import { createUserProfile } from '@/store/account/api_caller';
const jwt = require("jsonwebtoken");
import { showToast } from '@/components/popup';

interface UserProfileFormInputs {
  university: string;
  linkedin: string;
  github: string;
  phoneNumber: string;
  telegramUsername: string;
  gender: string;
  department: string;
  shortBio: string;
  photoUrl: string; // Assuming you convert File to a string URL before submitting
}
interface DecodedToken {
    sub: string;  // This might vary depending on how your token is structured
  }
  
interface FormValidationErrors {
  [key: string]: string;
}
const validate = (values: UserProfileFormInputs) => {
    const errors: FormValidationErrors = {};
    if (!values.university) {
      errors.university = 'University is required';
    }
    // Validate LinkedIn URL
    if (!values.linkedin) {
        errors.linkedin = 'LinkedIn profile URL is required';
      } else if (!/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_]+\/?$/.test(values.linkedin)) {
        errors.linkedin = 'Invalid LinkedIn URL';
      }
    
      // Validate GitHub URL
      if (!values.github) {
        errors.github = 'GitHub profile URL is required';
      } else if (!/^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]+\/?$/.test(values.github)) {
        errors.github = 'Invalid GitHub URL';
      }
    
      // Validate phone number
      if (!values.phoneNumber) {
        errors.phoneNumber = 'Phone number is required';
      } else if (!/^\+?[1-9]\d{1,14}$/.test(values.phoneNumber)) {
        errors.phoneNumber = 'Invalid phone number';
      }
    
      // Validate Telegram username
      if (!values.telegramUsername) {
        errors.telegramUsername = 'Telegram username is required';
      } else if (!/^@?[a-zA-Z0-9_]{5,32}$/.test(values.telegramUsername)) {
        errors.telegramUsername = 'Invalid Telegram username';
      }
    
      // Validate gender
      if (!values.gender) {
        errors.gender = 'Gender is required';
      } else if (!['male', 'female', 'other'].includes(values.gender.toLowerCase())) {
        errors.gender = 'Invalid gender selected';
      }
    
      // Validate department
      if (!values.department) {
        errors.department = 'Department is required';
      }
    
      // Validate short bio
      if (!values.shortBio) {
        errors.shortBio = 'Short bio is required';
      } else if (values.shortBio.length > 300) {
        errors.shortBio = 'Short bio must be less than 300 characters';
      }
    
    if (!values.photoUrl) {
      errors.photoUrl = 'Profile image is required';
    }
    return errors;
  };
  

 
  

  const renderField = ({ input, label, type, meta: { touched, error } }: any) => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input {...input} type={type} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      {touched && error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );

  interface RenderFileInputProps extends WrappedFieldProps {
    label: string;
  }
  

  const renderFileInput : React.FC<RenderFileInputProps> = ({ input, label, meta: { touched, error } }) => {
    // This handler will be triggered when the user selects a file
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          // reader.result contains the base64 string representation of the file
          input.onChange(reader.result); // Use this to update the Redux Form field
        };
        reader.readAsDataURL(file); // Converts the file to a base64 string
      }
    };
    const imagePreview = input.value ? (
        <img src={input.value as string} alt="Profile" className="w-full h-full object-cover rounded-full" />
    ) : (
        <div className="text-center text-gray-500">Select Image</div>
    );

    return (
        <div className="mb-10">
            <div className="w-24 h-24 mb-2 relative bg-gray-300 rounded-full overflow-hidden cursor-pointer">
                {/* Ensure the input does not directly manage the file value */}
                <input
                    type="file"
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
                    {imagePreview}
                </div>
            </div>
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            {touched && error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
    );
  };


const UserProfilePage: React.FC<InjectedFormProps<UserProfileFormInputs>> = ({ handleSubmit, pristine, submitting }) => {
        
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const id = token ? jwt.decode(token)?.id : null;
  console.log("gdciuAVGKDSBCIULAGBLIsgh",id);

  const onSubmit = async (values: UserProfileFormInputs) => {
    if (!token || !id) {
      showToast('Authentication error: Token or user ID is missing', 'error');
      return;
    }
            try {
              const response = await createUserProfile(token,values,id);
              console.log("rzdrtxzytdkuckkyf", response)
                showToast('Profile created successfully', 'success');
            } catch (error) {
              console.error('Profile creating error:', error);
              showToast('Profile creating error: ' + (error as Error).message, 'error');
            }
          };
    return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-wrap">
       <div className="flex flex-col items-center w-full">
        <h2 className="text-2xl font-bold mb-6 text-left self-start w-full">Edit Profile</h2>
        <div className="w-24 h-24 relative bg-gray-300 rounded-full overflow-hidden mb-10 cursor-pointer">
            <Field name="photoUrl" component={renderFileInput} label="Profile Image" />
        </div>
        </div>


        <div className='flex flex-col w-1/2 p-4'>
      
      <Field name="university" type="text" component={renderField} label="University" />
      <Field name="linkedin" type="url" component={renderField} label="LinkedIn Profile" />
      <Field name="github" type="url" component={renderField} label="GitHub Profile" />
      <Field name="  phoneNumber" type="tel" component={renderField} label="Phone number" />
      </div>
      <div className='flex flex-col w-1/2 p-4 '>
      
      <Field name=" telegramUsername" type="text" component={renderField} label=" TelegramUsername" />
      <Field name="gender" type="text" component={renderField} label="gender" />
      <Field name="department" type="text" component={renderField} label="Department" />
      <Field name="shortBio" type="text" component={renderField} label="Short bio" />
      </div>
      <div className="w-full flex justify-center p-4 items-center ">
        <button
          type="submit"
          disabled={pristine || submitting}
          className="bg-primary text-white hover:bg-primary hover:bg-opacity-90 px-6 py-3 flex items-center shadow-xl duration-200 rounded-full  transform transition ease-in-out hover:scale-105 hover:shadow-2xl"
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