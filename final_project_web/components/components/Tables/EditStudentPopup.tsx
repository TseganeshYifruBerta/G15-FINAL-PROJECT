import React, { useEffect, useState } from "react";
import { Field, reduxForm, InjectedFormProps, reset, FieldArray } from "redux-form";
import { Student, updateStudent,Section,fetchAllStudents, addSections, deleteSection } from "@/store/admin/get-all-students"; // Import the updateStudent function
import {FaEnvelope,FaIdBadge,FaPlus,FaToggleOn,FaTrash,FaUser,FaUserTag,FaUsers,} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { showToast } from "@/components/popup";
import { TiTick } from "react-icons/ti";
import { AiOutlineClose } from 'react-icons/ai';
interface OwnProps {
  student: Student;
  onClose: () => void;
  onSave: (updatedStudent: Student) => void;
}



interface FormStudent extends Omit<Student, "SectionsOfUser"> {
  NewSections: Section[];
  SectionsOfUser: Array<{ id?: number; section: string }>;
}

// This interface now correctly extends InjectedFormProps, defining the form's value type and the component's own props.
interface FormProps extends InjectedFormProps<FormStudent, OwnProps>, OwnProps {}
const validate = (
  values: FormStudent
): Partial<Record<keyof FormStudent, string>> => {
  const errors: Partial<Record<keyof FormStudent, string>> = {};
  if (!values.fullName) {
    errors.fullName = "Please enter a username.";
  }
  if (!values.userId) {
    errors.userId = "Please enter a user ID.";
  }
  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.SectionsOfUser || values.SectionsOfUser.length === 0) {
    errors.SectionsOfUser = "Please enter at least one section.";
  }

  if (!values.role) {
    errors.role = "Please select a role.";
  }
  if (!values.status) {
    errors.status = "Please select a status.";
  }

  return errors;
};

const renderField = ({
  input,
  type,
  placeholder,
  meta: { touched, error },
  iconName,
}: any) => (
  <div className="flex flex-col mb-4">
    <div className="flex align-center border-b-2 border-gray-300 focus-within:border-blue-500">
      <div className="text-xl text-gray-700 p-2">
        {React.createElement(iconName)}
      </div>
      {type === "select" ? (
        <select
          {...input}
          placeholder={placeholder}
          className="flex-1 p-2 outline-none"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {/* Check the type to determine which options to render */}
          {input.name === "role" && (
            <>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </>
          )}
          {input.name === "status" && (
            <>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </>
          )}
        </select>
      ) : (
        <input
          {...input}
          type={type}
          className="flex-1 p-2 outline-none"
          placeholder={placeholder}
        />
      )}
    </div>
    {touched && error && <span className="text-red-500 text-xs">{error}</span>}
  </div>
);


export const EditStudentPopup: React.FC<FormProps> = (props) => {
  const { handleSubmit, student, onClose, onSave, initialize } = props;
  const dispatch = useDispatch(); // Use useDispatch to get the dispatch function
  const [sectionsToDelete, setSectionsToDelete] = useState<number[]>([]);
  const [sections, setSections] = useState(student.SectionsOfUser || []);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); 
 
  const getStudents = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetchAllStudents();
      if (response.user) {
        console.log(response.user); // After fetchAllStudents call
        
       setStudents(response.user);
console.log(students); // This might not log updated state immediately due to setState being asynchronous

      } else {
        console.error('Error: response does not have a user property', response);
        setError('Failed to load students due to unexpected data format.');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to load students.');
    } finally {
      setIsLoading(false);
    }
  };
  const handlePopupClose = () => {
    dispatch(reset("editStudent")); // Dispatch the reset action with your form name
    onClose(); // Then call the onClose prop to close the popup
  };
  
  useEffect(() => {
    initialize({ ...student, SectionsOfUser: student.SectionsOfUser ?? [],NewSections: []  });
  }, [student, initialize]);

  const handleDeleteSection = async (sectionId: number) => {
   
    try {
      const response = await deleteSection(sectionId);
      showToast(`Section ${sectionId} deleted successfully`, "success");
      const updatedSections = sections.filter(sec => sec.id !== sectionId);
      setSections(updatedSections);
      console.log("svdiluCWEVFUI",updatedSections)
    initialize({ ...student, SectionsOfUser: updatedSections });
    onSave(response)
    await getStudents();
    } catch (error) {
      showToast("Error deleting section: " + (error as Error).message, "error");
      console.error("Error deleting section:", error);
    }
  };
  

  const handleAddSection = async (sectionInput: { section: string }) => {
    const section = sectionInput.section;
      const userId = student.id.toString();
   
      
     
     
      try {
        console.log("Adding section:", section);  // Debug: Log the section being added
        const response = await addSections({ userId, sections: section });
        console.log("API response:", response);  // Debug: Log the complete API response
        showToast("Section added successfully", "success");
        // Check if 'sections' is present and has at least one item
        if (response && response.sections && response.sections.length > 0) {
          console.log("Response section:", response.sections);  // Debug: Log the response section
    
          const newSections = [...sections, ...response.sections];
          setSections(newSections);  // Update the state to reflect the newly added sections
          console.log('Updated sections:', newSections);  // Debug: Log the new sections array
    
          initialize({ ...student, SectionsOfUser: newSections });
          onSave(response);  // Update the local state to reflect the changes
          
        } else {
          console.error("No sections in response or empty sections array:", response);  // Error handling: Log if no sections
        }

    } catch (error) {
      showToast("Error adding section: " + (error as Error).message, "error");
      console.error("Error adding section:", error);
    }
  };
  
  
  useEffect(() => {
    getStudents();
  }, [sections]);
  
interface RenderSectionsProps {
  fields: any;  // Depending on your setup, you might want to define a more specific type
  meta: {
    error: string;
    submitFailed: boolean;
  };
}

  // Adjusted RenderSections component to use handleDeleteSection and handleAddSection
  const RenderSections: React.FC<any> = ({ fields, meta: { error, submitFailed } }) => (
    <>
      <button type="button" onClick={() => fields.push({})} className="flex w-35 items-center bg-[#7983FB] bg-opacity-30 text-[#7983FB] hover:bg-[#7983FB] hover:bg-opacity-60  font-bold py-2 px-2 rounded-xl  mb-4">
        <FaPlus className="mr-2" />Add Section
      </button>
      {fields.map((section:string, index:number) => (
        <div key={index} className="flex items-center space-x-2">
          <Field name={`${section}.id`} type="hidden" component="input" />
          <Field name={`${section}.section`} type="number" component="input" placeholder="Section" parse={(value: string) => Number(value)} className="p-2 border rounded" />
          <button type="button" className="p-3 text-green-600 bg-green-50 hover:bg-green-100 rounded-full" onClick={() => handleAddSection(fields.get(index) )} >
    <TiTick />
</button>

          
        </div>
      ))}
    </>
  );
  const RenderSections2: React.FC<any> = ({ fields, meta: { error, submitFailed } }) => (
    <>
     
      {fields.map((section:string, index:number) => (
        <div key={index} className="flex items-center space-x-2">
           <Field name={`${section}.section`} type="number" component="input" placeholder="Section" className="p-2 border rounded" readOnly />
          <button type="button" className="p-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-full" onClick={() => handleDeleteSection(fields.get(index).id)}>
            <FaTrash />
          </button>
        </div>
      ))}
    </>
  );
  const RenderSections3: React.FC<any> = ({ fields, meta: { error, submitFailed } }) => (
    <>
     
      {fields.map((section:string, index:number) => (
        <div key={index} className="flex items-center space-x-2">
           <Field name={`${section}.section`} type="number" component="input" placeholder="Section" className="p-2 border rounded" />
          
        </div>
      ))}
    </>
  );


  // Define onSubmit within the component to use closure variables
  const onSubmit = async (formValues:FormStudent) => {
    // Destructure formValues to separate sections from other data
    const { SectionsOfUser, ...studentData } = formValues;

    // Assuming SectionsOfUser might already be in the correct format or just needs filtering out undefined ids
    const sectionsTransformed = SectionsOfUser.map(section => ({
      ...(section.id && { id: section.id.toString() }),// Convert id to string, handle undefined safely
        section: section.section,
    }));

    const finalPayload = {
        
        fullName: studentData.fullName,
        email: studentData.email,
        userId: studentData.userId,
        role: studentData.role,
        status: studentData.status,
        sections: sectionsTransformed,
    };

    console.log("Final payload being sent to server:", JSON.stringify(finalPayload));

    try {
        // Replace `updateStudent` with the actual function call to your API
        const response = await updateStudent({ id: studentData.id, updateData: finalPayload });
        console.log("Update response:", response);
        showToast("Updated successfully", "success");
        onSave(response); // Assuming this is how you update the local state to reflect the changes
      await getStudents();
    } catch (error) {
        console.error("Error updating student:", error);
        showToast("Error updating student: " + (error as Error).message, "error");
    }
};


  
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-8 lg:p-12 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
         <button
              type="button"
              onClick={handlePopupClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                  <AiOutlineClose size={24} />
            </button>
        <div className="flex flex-row gap-10">
          
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Edit User
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <Field
              name="fullName"
              component={renderField}
              type="text"
              placeholder={student.fullName || "Full Name"}
              iconName={FaUser}
            />
            <Field
              name="userId"
              component={renderField}
              type="text"
              placeholder={student.userId || "User ID"}
              iconName={FaIdBadge}
            />
            <Field
              name="email"
              component={renderField}
              type="email"
              placeholder={student.email || "User ID"}
              iconName={FaEnvelope}
            />
            <p className="flex items-center"><FaUsers className="text-xl text-gray-700 mr-2"/>Section</p>
            <FieldArray name="SectionsOfUser" component={RenderSections3}  />
            <Field
              name="role"
              component={renderField}
              type="select"
              iconName={FaUserTag}
              placeholder={student.role || "Role"}
            >
              <option value="" disabled>
                Select a role...
              </option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </Field>
            
          </div>
          <div className="flex justify-end space-x-4">
           
            <button
              type="submit"
              className="btn bg-[#7983FB] border-2 hover:bg-[#919AF3] text-white py-2 px-4 rounded-xl font-bold"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="w-1/2  ">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 mt-2">
           Add Section
          </h2>
        <FieldArray name="NewSections" component={RenderSections} props={{ sections, setSections }} />
        
        
        <div className="mb-4">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 mt-2">
            Delete Section
          </h2>
        <FieldArray name="SectionsOfUser" component={RenderSections2} props={{ sectionsToDelete, setSectionsToDelete }} />
        </div>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default reduxForm<FormStudent, OwnProps>({
  form: "editStudent",
  validate,
  
})(EditStudentPopup);
