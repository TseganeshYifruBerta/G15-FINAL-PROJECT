import React, { useState } from "react";
import {
  register,
} from "@/store/api-helper-function/apiCallerFunction";
import { useNavigate } from "react-router-dom";
import UploadForm from "@/components/questionupload/UploadForm";
import { useRouter } from "next/router";
interface formDataProps  {
name: string;
email:string;
password: string;

}
const RegistrationForm = () => {
    const router = useRouter();
  const [formData, setFormData] = useState({
    title: "hhhhhhhhh",
    difficulty: "hhhhhhhhh",
    description: "hhhhhhhhh",
    output: [8, 9, 8],
    input: {
      nums: [9, 8, 7],
      target: 9,
    },
    example: "hhhhhhhhh",
  });
 
  // Update form state based on input
  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 

  const handleSubmit = async (e:any) => {
    e.preventDefault();

      try {
        const data = await register(formData);
console.log(data)
        if (data.success) {
            console.log(data)
          router.push("/");
        } else {
          // Handle registration failure, show error message, etc.
           console.log(data);
        }
      } catch (error:any) {
        // Handle the error from the backend (e.g., display error message to the user)
        console.error("Registration error:", error.message);
      }
    
  };

  return (
    <div className="p-10">
      <div className="text-3xl font-bold m-2 p-2">
        <span className="">Question</span>
        <span className="text-primary"> Upload</span>
      </div>
      <div className="flex">
        <div className="w-3/5">
          <div className="flex">
            <div className="w-1/2">
              <UploadForm label={"Title"} width={""} height={""} onContentChange={()=>formData.title}/>
            </div>
            <div className="w-1/2">
              <UploadForm label={"Difficulty"} width={""} height={""} onContentChange={()=>formData.difficulty}/>
            </div>
          </div>
          <div className="w-full">
            <UploadForm label={"Question Description"} width={""} height={""} onContentChange={()=>formData.description}/>
          </div>
          <div className="w-full">
            <UploadForm label={"Examples"} width={""} height={""} onContentChange={()=>formData.example}/>
          </div>
          <div>
            <label htmlFor="" className="m-1 p-2 font-bold">
              Testcases
            </label>
          </div>
          <div className="flex">
            <div className="w-1/2">
              <UploadForm label={"Input"} width={""} height={""} onContentChange={()=>{}}/>
            </div>
            <div className="w-1/2">
              <UploadForm label={"Output"} width={""} height={""} onContentChange={()=>{}}/>
            </div>
          </div>
          {/* <div className="w-full">
            <UploadForm label={"Constraints"} width={""} height={""} />
          </div> */}
        </div>
        <div className="w-1/5 flex">
          <div className="w-1/2 flex self-center justify-center bg-primary m-1 rounded-md p-2" onClick={handleSubmit}>
            <button className="">Upload</button>
          </div>
          <div className="w-1/2 flex self-center justify-center bg-primary m-1 p-2 rounded-md">
            <button>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;