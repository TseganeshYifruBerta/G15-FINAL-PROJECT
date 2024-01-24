import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { HiArrowCircleLeft } from "react-icons/hi";
import { HiArrowCircleRight } from "react-icons/hi";
import { IoCloudUploadOutline } from "react-icons/io5";

const Upload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
    const onDrop = useCallback((acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
      }
    }, []);
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setSelectedFile(event.target.files[0]);
      }
    };
  
    const handleUploadClick = () => {
      if (selectedFile) {
        // Perform the file upload logic here
        console.log("Uploading file:", selectedFile);
        // Reset selected file state after upload
        setSelectedFile(null);
      }
    };
  
    return (
      <div className="min-h-screen">
        <main className="w-full px-4 text-center">
          <div className="flex flex-row h-screen mt-4">
            <HiArrowCircleLeft className="text-[#7983FB] text-5xl mr-28 " />
            <div className="flex flex-col flex-1">
              <div className="border-2 border-[#919AF3] rounded-3xl p-8 py-2 w-100 h-full mb-16 mt-4 mr-52 ml-40">
                <p className="text-xl font-bold text-left ">File upload</p>
  
                <div className="mt-8">
                  <div
                    className={`border-dashed border-2 ${
                      isDragActive ? "border-blue-500" : "border-gray-800"
                    } bg-[#dadcf7] rounded-3xl p-8 mr-40 ml-40 mb-8`}
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
                          <span className="font-medium text-gray-400 ">
                            -------------OR-------------
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    {...getInputProps()}
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-input"
                  />
                  <label
                    htmlFor="file-input"
                    className="bg-[#919AF3] hover:bg-[#919AF3] text-white py-2 mt-8 px-4 rounded-2xl mb-12 cursor-pointer"
                  >
                    Browse
                  </label>
                  <div className="border-2 rounded border-[#919AF3] mt-8 mr-44 ml-44">
                    <div className="flex flex-row">
                      <HiArrowCircleRight className="text-[#7983FB] text-5xl  " />
                      <p className="text-2xs text-gray-700 mr-2 mt-2">
                        The file should have username, userid, section as a column unless it will not function as expected.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between mt-4">
                    <button
                      className="bg-[#7983FB] border-2 hover:bg-[#919AF3] text-white py-2 px-4 ml-48 rounded-xl"
                      onClick={handleUploadClick}
                    >
                      Upload
                    </button>
                    <button className="border-2 border-[#7983FB] rounded-xl hover:bg-[#919AF3] text-black py-2 px-4 mr-48">
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
  
  export default Upload;