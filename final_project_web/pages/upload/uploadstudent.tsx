import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { useDropzone } from "react-dropzone";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RootState } from "@/store/index";
import { uploadFile, FileData } from '@/store/upload/ApiCallerUploadStudent';
import {showToast} from '@/components/popup';
import Link from "next/link";

interface FileForm {
  selectedFile: File | null;
}

const Upload: React.FC<InjectedFormProps<FileForm>> = ({ handleSubmit }) => {

  const [fileName, setFileName] = useState<string | null>(null); // State to store file name

  
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        setFileName(file.name); // Set the file name in state
      } else {
        console.error("Invalid file type. Only .xlsx files are allowed.");
        showToast('Invalid file type. Only .xlsx files are allowed.', 'error');
        // Handle the error or display an error message to the user
      }
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted: onDrop,
  });
  const router = useRouter();
  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    
    const target = event.target as HTMLDivElement;
    if (target.classList.contains('icon')) {
      // Perform navigation logic here
      router.push('/upload');
    }
  };
  
  
  const onSubmit = async (values: FileForm) => {
   
      try {
        // const data = await uploadFile(values as FileData);
        showToast('File uploaded successfully', 'success');
      } catch (error) {
        console.error("File upload failed:", error);
        showToast('File upload failed: ' + (error as Error).message, 'error');
        // Handle the error
      }
    
  };
 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="min-h-screen" onClick={handleContainerClick}>
        <main className="w-full px-4 text-center ml-0">
          <div className="flex flex-row h-screen mt-4">
            <HiArrowCircleLeft className="text-[rgb(121,131,251)] text-5xl mr-28 icon" />
            <div className="flex flex-col flex-1">
              <div className="border-2  rounded-3xl p-8 py-2  h-full mb-16 mt-0 mr-52 ml-20">
                <p className="text-xl font-bold text-left">File upload</p>

                <div className="mt-8">
                  <div
                    className={`border-dashed border-2 ${
                      isDragActive ? "border-blue-500" : "border-gray-800"
                    } bg-[#dadcf7] rounded-3xl p-6 mr-40 ml-40 mb-8`}
                    {...getRootProps()}
                  >
                    <div className="flex flex-col items-center justify-center mb-6">
                      <IoCloudUploadOutline className="text-[#7983FB] text-6xl mt-1" />
                      <div className="flex flex-col items-center justify-center text-gray-600">
                        <p className="mt-1 text-xl text-center mb-1">
                          <span className="font-medium text-gray-400">
                            Drag and drop
                          </span>{" "}
                        </p>
                        <p className="mt-1 text-sm text-center mb-1">
                          <span className="font-medium text-gray-400">
                            -------------OR-------------
                          </span>{" "}
                        </p>

                        <label
                          htmlFor="file-input"
                          className="bg-[rgb(145,154,243)] hover:bg-[#919AF3] text-white py-2 mt-8 px-4 rounded-2xl mb-4 cursor-pointer"
                        >
                          Browse
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="border-2 rounded border-[#919AF3] mt-8 mr-44 ml-44">
                    <div className="flex flex-row">
                      <HiArrowCircleRight className="text-[#7983FB] text-5xl" />
                      <p className="text-sm text-gray-700 mr-2 mt-2">
                        The file should be in Only .xlsx format, also should
                        contain Full Name, Email and section respectively as
                        columns.
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-center text-gray-600">
                    {fileName && (
                      <span className="font-medium text-gray-600">
                        {fileName}
                      </span>
                    )}
                  </p>
                  <div className="flex flex-row items-center justify-between  ml-20 mr-20 mt-6">
                    <Link href={"/teacherprofile/getallstudents"}>
                      <button
                        type="submit"
                        className="bg-[#7983FB] border-2 hover:bg-[#919AF3] text-white py-2 px-4 ml-48 rounded-xl"
                      >
                        Upload
                      </button>
                    </Link>
                    <Link href="/upload">
                      <button className="border-2 border-[#7983FB] rounded-xl hover:bg-[#919AF3] text-black py-2 px-4 mr-48">
                        Cancel
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </form>
  );
};

const ConnectedUpload = reduxForm<FileForm>({
form: 'upload',
})(Upload);

export default ConnectedUpload;


