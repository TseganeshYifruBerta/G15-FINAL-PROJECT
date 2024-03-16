import {
  ExamQuestionUploadFormData,
  uploadexamquestion,
} from "@/store/exam/upload-exam-question-api";
import test from "node:test";
import React, { useState, ChangeEvent } from "react";



const CreateExamQuestion = () => {
  const [formData, setFormData] = useState<ExamQuestionUploadFormData>({
    title: "",
    difficulty: "",
    description: "",
    example: "",
    testcases: [{ input: "{}", output: "{}" }],
    solution: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (typeof index === "number") {
      const updatedTestCases = formData.testcases.map((testCase, i) => {
        if (i === index) {
          return { ...testCase, [name]: value };
        }
        return testCase;
      });
      setFormData((prev) => ({ ...prev, testcases: updatedTestCases }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddTestCase = () => {
    setFormData((prev) => ({
      ...prev,
      testcases: [...prev.testcases, { input: "", output: "" }],
    }));
  };

  const handleRemoveTestCase = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      testcases: prev.testcases.filter((_, i) => i !== index),
    }));
  };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form data submitted:", formData);

//     for (let i = 0; i < formData.testcases.length; i++) {
//       formData.testcases[i].input = JSON.parse(formData.testcases[i].input);
//     //   formData.testcases[i].output = JSON.parse(formData.testcases[i].output);
//     formData.testcases[i] = {input:formData.testcases[i].input, output:formData.testcases[i].output}
//     }
//     // Call API to submit formData here
//     console.log("Form data submitted afterrrrr:", formData);

//     const data = await uploadexamquestion(
//       formData as ExamQuestionUploadFormData
//     );
//     console.log(data);
//   };
// interface TestCase {
//   input: Record<string, any>; // This allows for a flexible key-value pair object
//   output: string;
// }


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Attempt to safely parse test case inputs as JSON
  const safeTestcases = formData.testcases.map((testCase) => {
    try {
      const parsedInput = JSON.parse(testCase.input);
      return { ...testCase, input: parsedInput };
    } catch (error) {
      console.error("Error parsing test case input as JSON:", error);
      return testCase; // or handle this case as needed
    }
  });

  const submissionData = {
    ...formData,
    testcases: safeTestcases,
  };

  console.log("Form data prepared for submission:", submissionData);

  try {
    const data = await uploadexamquestion(
      submissionData as ExamQuestionUploadFormData
    );
    console.log("Submission successful:", data);
    // Handle success (e.g., clear form, show message)
  } catch (error) {
    console.error("Submission failed:", error);
    // Handle error (e.g., show error message)
  }
};

  return (
    <div className="container mx-auto p-4 ml-10">
      <h1 className="text-2xl font-bold mb-4">Create New Exam Question</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title, Difficulty, Description, Example, and Solution inputs here */}
        <div className="flex">
          {/* Title */}
          <div className="w-2/5 mr-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg bg-gray-50 py-2 px-4 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter the title here"
              style={{
                transition:
                  "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              }}
            />
          </div>

          {/* Difficulty */}
          <div className="w-1/5">
            <label
              htmlFor="difficulty"
              className="block text-sm font-medium text-gray-700"
            >
              Difficulty
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg bg-gray-50 py-2 px-4 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-sm"
              style={{
                transition:
                  "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              }}
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="w-3/5">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-lg bg-gray-50 py-2 px-4 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            rows={3}
            style={{
              transition:
                "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            }}
          ></textarea>
        </div>

        <div className="w-3/5">
          <label
            htmlFor="example"
            className="block text-sm font-medium text-gray-700"
          >
            Example
          </label>
          <textarea
            name="example"
            value={formData.example}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-lg bg-gray-50 py-2 px-4 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            rows={2}
          ></textarea>
        </div>

        {/* Dynamic Test Cases */}
        <div className="w-3/5">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Test Cases
          </label>
          {formData.testcases.map((testCase, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 mb-2 bg-gray-50 p-4 rounded-lg shadow"
            >
              <input
                type="text"
                name="input"
                placeholder="Input"
                value={testCase.input}
                onChange={(e) => handleInputChange(e, index)}
                className="mt-1 flex-1 rounded-lg bg-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              />
              <input
                type="text"
                name="output"
                placeholder="Output"
                value={testCase.output}
                onChange={(e) => handleInputChange(e, index)}
                className="mt-1 flex-1 rounded-lg bg-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              />
              <button
                type="button"
                onClick={() => handleRemoveTestCase(index)}
                className="text-red-500 rounded-full flex items-center justify-center"
                aria-label="Remove test case"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTestCase}
            className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-primary"
          >
            Add Test Case
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg shadow"
        >
          Submit Question
        </button>
      </form>
    </div>
  );
};

export default CreateExamQuestion;
