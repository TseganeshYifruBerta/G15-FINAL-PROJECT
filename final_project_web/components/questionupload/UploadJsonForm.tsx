import React, { useState } from "react";

interface JsonInputProps {
  onJsonChange: (json: string) => void;
  onContentChange: (content: string) => void; // Callback function to notify parent of content change
}

const JsonInput: React.FC<JsonInputProps> = ({ onJsonChange, onContentChange }) => {
  const [jsonInput, setJsonInput] = useState("");

  const handleJsonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newJsonInput = event.target.value;
    setJsonInput(newJsonInput);
    onJsonChange(newJsonInput);
  };
  return (
    <div>
      <label htmlFor="jsonInput" className="m-1 p-2 font-bold">
        JSON Input
      </label>
      <textarea
        id="jsonInput"
        value={jsonInput}
        onChange={handleJsonChange}
        className="w-full p-2 rounded-md border"
        placeholder="Enter JSON format"
        rows={8} // You can adjust the number of rows based on your preference
      ></textarea>
    </div>
  );
};

export default JsonInput;
