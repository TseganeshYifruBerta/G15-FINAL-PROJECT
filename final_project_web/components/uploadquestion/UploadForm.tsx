import React, { useState } from "react";

interface UploadFormProps {
  label: string;
  onContentChange: (content: string) => void; // Callback function to notify parent of content change
}

const UploadForm: React.FC<UploadFormProps> = ({ label, onContentChange }) => {
  const [content, setContent] = useState("");
  var addinput = `${label} (use JSON format)
     {"nums": [2, 7, 11, 15],
        "target": 9}`;
  var addoutput = `${label} (use JSON format) 
    {"output": [0, 9, 8]}`;
  let add;
  if (!(label === "input")) {
    addinput = label;
  }
  if (!(label === "output")) {
    addoutput = label;
  }
  if (label == "output") {
    add = addoutput;
  } else {
    add = addinput;
  }
  // Function to handle content change
  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newContent = event.target.value;
    setContent(newContent);

    // Notify parent component of the content change
    onContentChange(newContent);
  };
  return (
    <div className="m-2">
      <textarea
        className={`mt-1 p-2 border-primary  rounded-md w-full focus:outline-none border-2 h-[100px]`}
        placeholder={`${add.toLowerCase()}`}
        value={content}
        onChange={handleContentChange}
      />
    </div>
  );
};

export default UploadForm;
