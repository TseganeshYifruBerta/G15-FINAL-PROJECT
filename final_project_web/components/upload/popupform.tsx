import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { FaUser, FaIdBadge, FaEnvelope, FaUsers, FaUserTag, FaToggleOn } from 'react-icons/fa';
import { UploadManually, UploadFormData } from '@/store/upload/ApiCallerManuallyupload';
import { showToast } from '../popup';

interface FormValues {
  fullName?: string;
  userId?: string;
  email?: string;
  section?: string;
  role?: string;
  status?: string;
  }
  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    if (!values.fullName) {
      errors.fullName = 'Please enter a username.';
    }
    if (!values.userId) {
      errors.userId = 'Please enter a user ID.';
    }
    if (!values.email) {
      errors.email = 'Please enter an email.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!values.section) {
      errors.section = 'Please enter a section.';
    } else if (!/^\d+$/.test(values.section)) {
      errors.section = 'Section must be numeric.';
    }
    if (!values.role) {
      errors.role = 'Please select a role.';
    }
    if (!values.status) {
      errors.status = 'Please select a status.';
    }
  
    return errors;
  };
  
  const renderField = ({ input, type, placeholder, meta: { touched, error }, iconName }: any) => (
    <div className="flex flex-col mb-4">
      <div className="flex align-center border-b-2 border-gray-300 focus-within:border-blue-500">
        <div className="text-xl text-gray-700 p-2">
          {React.createElement(iconName)}
        </div>
        {type === 'select' ? (
        <select {...input} placeholder={placeholder} className="flex-1 p-2 outline-none">
          <option value="" disabled>{placeholder}</option>
          {/* Check the type to determine which options to render */}
          {input.name === 'role' && (
            <>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </>
          )}
          {input.name === 'status' && (
            <>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </>
          )}
        </select>
 
) : (
  <input {...input} type={type} className="flex-1 p-2 outline-none" placeholder={placeholder} />
)}
      </div>
      {touched && error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );

  const UploadPopup: React.FC<InjectedFormProps<FormValues>> = ({ handleSubmit }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onSubmit = async (values: FormValues, dispatch: Function, props: any) => {
    try {
      const data = await UploadManually(values as UploadFormData);
      showToast('Uploaded successfully', 'success');
      setIsOpen(false); // Close the popup on successful upload
    } catch (error) {
      console.error('Uploading error:', error);
      showToast('Uploading error: ' + (error as Error).message, 'error');
    }
  };

    


  return (
    <div className="flex justify-center items-center">
      <button
        className="text-white bg-gradient-to-r from-[rgb(145,154,243)] to-[#7983FB] hover:bg-gradient-to-br font-bold py-2 px-4 rounded-full"
        onClick={() => setIsOpen(true)}
      >
        Add User
      </button>

      {isOpen && (
        <div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex justify-center items-center"
        onClick={() => setIsOpen(false)}
      >
        <div
          className="relative w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-8 lg:p-12 transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Add New User</h2>
            <div className="grid grid-cols-1 gap-6"><Field name="name" type="text" component={renderField} placeholder="Full Name" iconName={FaUser} />
            <Field name="userId" type="text" component={renderField} placeholder="User ID" iconName={FaIdBadge} />
            <Field name="email" type="email" component={renderField} placeholder="Email" iconName={FaEnvelope} />
            <Field name="section" type="text" component={renderField} placeholder="Section" iconName={FaUsers} />
            <Field
              name="role"
              component={renderField}
              type="select"
              iconName={FaUserTag}
              placeholder="Select a role..."
            >
              <option value="" disabled>Select a role...</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </Field>
            <Field
              name="status"
              component={renderField}
              type="select"
              iconName={FaToggleOn}
              placeholder="Select a status..."
            >
              <option value="" disabled>Select a status...</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Field>
          </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="btn btn-outline btn-error border-2 border-[#7983FB] rounded-xl hover:bg-[#919AF3] text-black py-2 px-4"
                onClick={() => setIsOpen(false)}
                
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-[#7983FB] border-2 hover:bg-[#919AF3] text-white py-2 px-4 rounded-xl font-bold"
              >
                Submit
              </button>
            </div>    
            </form>

        </div>
      </div>
      
      )}
    </div>
  );
};
  
const ConnectedUploadPopup = reduxForm<FormValues>({
  form: 'uploadpop',
  validate,
})(UploadPopup);

export default ConnectedUploadPopup;



