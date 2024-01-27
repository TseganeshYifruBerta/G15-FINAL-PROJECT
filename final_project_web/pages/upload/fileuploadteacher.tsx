import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';

import { useDropzone } from "react-dropzone";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { setSelectedFile } from "@/store/upload/UploadTeacherSliceReducer";
import { RootState } from "@/store/index";
import { uploadFile } from "@/store/upload/ApiCallerTeacher";
import {showToast} from '@/components/popup';

const UploadTeacher: React.FC = () => {
  const dispatch = useDispatch();
//   const [fileContent, setFileContent] = useState<string | null>(null); // State to store file content
  const [fileName, setFileName] = useState<string | null>(null); // State to store file name
  const selectedFile = useSelector((state: RootState) => state.upload.selectedFile);
  const [fileContent, setFileContent] = useState<string | null>(null); // State to store file content
  const router = useRouter();
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        dispatch(setSelectedFile(file));
        setFileName(file.name); // Set the file name in state
      } else {
        console.error("Invalid file type. Only .xlsx files are allowed.");
        showToast('Invalid file type. Only .xlsx files are allowed.', 'error');
        // Handle the error or display an error message to the user
      }
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.classList.contains('icon')) {
      // Perform navigation logic here
      router.push('/upload');
    }
  };
  const handleUploadClick = async () => {
    if (selectedFile) {
      try {
        console.log("Uploading file:", selectedFile);
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const content = fileReader.result as string;
          setFileContent(content); // Store file content in state
        };
        fileReader.readAsText(selectedFile);
        await uploadFile(selectedFile);
        showToast('File uploaded successfully', 'success');
        dispatch(setSelectedFile(null));
        setFileName(null); // Reset the file name
      } catch (error) {
        console.error("File upload failed:", error);
        showToast('File upload failed: ' + (error as Error).message, 'error');
        // Handle the error
      }
    } else {
      setFileName(null); // Reset the file name if no file is selected
    }
  };
  const handleCancelClick = () => {
    setFileName(null); // Reset the file name when "Cancel" button is clicked
    dispatch(setSelectedFile(null)); // Reset the selected file in Redux state
  };

  return (
    <div className="min-h-screen" onClick={handleContainerClick}>
      <main className="w-full px-4 text-center">
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
                  className="bg-[#919AF3] hover:bg-[#919AF3] text-white py-2 mt-8 px-4 rounded-2xl mb-4 cursor-pointer"
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
                      The file should be  in Only .xlsx format, also should contain Name, userID, Email and section respectively as columns.
                    </p>
                  </div>
             
                 
                </div>
                <p className="mt-2 text-center text-gray-600">
                    {fileName && <span className="font-medium text-gray-600">{fileName}</span>}
                  </p>
                <div className="flex flex-row items-center justify-between  ml-20 mr-20 mt-6">
                  <button
                    className="bg-[#7983FB] border-2 hover:bg-[#919AF3] text-white py-2 px-4 ml-48 rounded-xl"
                    onClick={handleUploadClick}
                  >
                    Upload
                  </button>
                  <button className="border-2 border-[#7983FB] rounded-xl hover:bg-[#919AF3] text-black py-2 px-4 mr-48"
                  onClick={handleCancelClick}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadTeacher;