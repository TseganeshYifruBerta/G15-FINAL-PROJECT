import React, { useState, useCallback } from "react";
import { reduxForm, InjectedFormProps } from 'redux-form';
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import Link from "next/link";
import { uploadFile } from "@/store/upload/ApiCallerupload"; // Ensure this path is correct
import {showToast} from '@/components/popup'; // Ensure this is correctly imported
import UploadPopup from "@/components/upload/popupform";
import styles from '@/styles/TypingEffect.module.css';

interface FileForm {
  selectedFile: File | null;
}

const Upload: React.FC<InjectedFormProps<FileForm>> = ({ handleSubmit }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        setSelectedFile(file);
      } else {
        console.error("Invalid file type. Only .xlsx files are allowed.");
        showToast('Invalid file type. Only .xlsx files are allowed.', 'error');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted: onDrop,
  });

  // Adjust onSubmit to use the selectedFile state
  const onSubmit = async (formValues: any) => {
    if (selectedFile) {
      try {
        await uploadFile(selectedFile); // Use the selectedFile directly
        showToast('File uploaded successfully', 'success');
      } catch (error) {
        console.error("File upload failed:", error);
        showToast('File upload failed: ' + (error as Error).message, 'error');
      }
      
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
       
        <main className="px-4 text-center flex flex-col gap-2">
       
        <div className="flex flex-col items-center justify-center h-screen">
        <div className="mt-2 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto h-screen"> 
         <div className="mt-8 mx-auto p-6 max-w-md bg-gray-300 rounded-xl shadow-xl mb-20">
          <div className="flex flex-col items-center">
            <h3 className={`${styles.typingEffect} text-lg text-[#7983FB] font-bold mb-4`}>
              Upload File Instructions 📤
            </h3>
            <p className={`text-black text-sm sm:text-xs md:text-sm lg:text-base`}>
              📄 File must be in .xlsx format with columns for fullName, userId, email, section, role, and status.
            </p>
          </div>
       </div>
              <div className="mt-2 mb-20">
              <div
  className={`border ${isDragActive ? "border-blue-500" : "border-gray-200"} bg-gray-200 rounded-3xl shadow-xl`}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center mb-6">
                    <IoCloudUploadOutline className="text-[#7983FB] text-6xl mt-1" />
                    <div className="flex flex-col items-center justify-center text-gray-900">
                      <p className="mt-1 text-xl text-center mb-1">
                        <span className="font-medium text-gray-900">
                          Drag and drop
                        </span>{" "}
                      </p>
                      <p className="mt-1 text-sm text-center mb-1">
                        <span className="font-medium text-gray-900">
                          -------------OR-------------
                        </span>{" "}
                        
                      </p>
                      
                <label
                  htmlFor="file-input"
                  className="bg-[#7983FB] hover:bg-[rgb(145,154,243)] text-white py-2 mt-8 px-4 rounded-2xl cursor-pointer"
                >
                  Browse
                </label>
                    </div>

                  </div>
                </div>
               
              </div>
              <p className="mt-2 text-center text-gray-600">
        {selectedFile && <span className="font-medium text-gray-600">{selectedFile.name}</span>}
      </p>
                  <div className="flex flex-row items-center justify-center gap-6 mt-6 mb-4">
              <button
                type="submit"
                className="bg-[#7983FB] hover:bg-[#919AF3] text-white py-2 px-4 rounded-xl shadow-xl"
              >
                Upload
              </button>
              <Link href='/upload'>
                <button className="ml-4 bg-gray-300 rounded-xl hover:bg-[#919AF3] text-black py-2 px-4 shadow-xl">
                  Cancel
                </button>
              </Link>
            </div>
                
    <UploadPopup/>
           </div>
           

               
          </div> 
      
      </main>
    </form>
    
    </>
  );
};

const ConnectedUpload = reduxForm<FileForm>({
  form: 'upload',
})(Upload);

export default ConnectedUpload;