import React, { useState } from "react";

interface UploadFormProps {
  label: string;
  width: string;
  height: string;
  onContentChange: (content: string) => void; // Callback function to notify parent of content change
}

const UploadForm: React.FC<UploadFormProps> = ({
  label,
  width,
  height,
  onContentChange,
}) => {
  const [content, setContent] = useState("");

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
        className={`mt-1 p-2 border border-primary rounded-md w-full focus:outline-none border-2`}
        placeholder={`${label.toLowerCase()}`}
        value={content}
        onChange={handleContentChange}
      />
    </div>
  );
};

export default UploadForm;
