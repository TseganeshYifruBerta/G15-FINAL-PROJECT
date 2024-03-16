import { useState, ChangeEvent } from "react";

interface Question {
  id: string;
  text: string;
}

interface FormData {
  title: string;
  sections: string[];
  sectionsText: string[];
  questionIds: string[];
  questionsText: string[];
  dateOfExam: string;
  duration: string;
}

const CreateExam = () => {
  const sections = [
    "Section 1",
    "Section 2",
    "Section 3",
    "Section 4",
    "Section 5",
    "Section 6",
    "Section 7",
    "Section 8",
    "Section 9",
  ];
  const questions: Question[] = [
    { id: "1", text: "Two sum" },
    { id: "2", text: "Palindrom" },
    { id: "3", text: "Grade Checker" },
    { id: "4", text: "Two sum II" },
    { id: "5", text: "Count Odd" },
    { id: "6", text: "Fizz Buzz" },
  ];

  const [formData, setFormData] = useState<FormData>({
    title: "",
    sections: [],
    sectionsText: [],
    questionIds: [],
    questionsText: [],
    dateOfExam: "",
    duration: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectedSections = (e: ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedValues: string[] = [];
    const selectedTexts: string[] = [];
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.selected) {
        selectedValues.push(option.value);
        selectedTexts.push(option.text);
      }
    }
    setFormData((prevState) => ({
      ...prevState,
      sections: selectedValues,
      sectionsText: selectedTexts,
    }));
  };

  const handleSelectedQuestions = (e: ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedValues: string[] = [];
    const selectedTexts: string[] = [];
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.selected) {
        selectedValues.push(option.value);
        selectedTexts.push(option.text);
      }
    }
    setFormData((prevState) => ({
      ...prevState,
      questionIds: selectedValues,
      questionsText: selectedTexts,
    }));
  };

  const removeChip = (chipType: "sections" | "questionIds", index: number) => {
    // Explicitly handle updates for each chip type
    if (chipType === "sections") {
      const newSections = [...formData.sections];
      const newSectionsText = [...formData.sectionsText];
      newSections.splice(index, 1);
      newSectionsText.splice(index, 1);

      setFormData((prevState) => ({
        ...prevState,
        sections: newSections,
        sectionsText: newSectionsText,
      }));
    } else if (chipType === "questionIds") {
      const newQuestionIds = [...formData.questionIds];
      const newQuestionsText = [...formData.questionsText];
      newQuestionIds.splice(index, 1);
      newQuestionsText.splice(index, 1);

      setFormData((prevState) => ({
        ...prevState,
        questionIds: newQuestionIds,
        questionsText: newQuestionsText,
      }));
    }
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // Logic to send formData to the backend goes here
  };

  return (
    <div className="container px-4 py-8 ml-10">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Create new Exam</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-lg shadow-md border border-gray-200"
      >
        {/* Title Input */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700"
          >
            Title of the Exam
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full md:w-1/2 bg-gray-100 px-3 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline"
            placeholder="Enter the title of the exam"
            style={{
              transition:
                "box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",
            }}
          />
        </div>

        {/* Sections Selection */}
        <div className="mb-4">
          <label
            htmlFor="sections"
            className="block text-sm font-semibold text-gray-700"
          >
            Select Sections
          </label>
          <select
            multiple
            name="sections"
            id="sections"
            value={formData.sections}
            onChange={handleSelectedSections}
            className="mt-1 block w-full rounded-lg bg-gray-100 px-3 py-2 shadow focus:outline-none focus:shadow-outline"
            style={{
              transition:
                "box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",
            }}
          >
            {sections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
          <div className="mt-3 flex flex-wrap gap-2">
            {formData.sectionsText.map((text, index) => (
              <span
                key={index}
                className="flex items-center bg-indigo-200 text-indigo-800 text-xs px-2 py-1 rounded-full"
              >
                {text}
                <button
                  type="button"
                  className="ml-2 text-indigo-500 hover:text-indigo-700"
                  onClick={() => removeChip("sections", index)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Questions Selection */}
        <div className="mb-4">
          <label
            htmlFor="questionIds"
            className="block text-sm font-semibold text-gray-700"
          >
            Select Questions
          </label>
          <select
            multiple
            name="questionIds"
            id="questionIds"
            value={formData.questionIds}
            onChange={handleSelectedQuestions}
            className="mt-1 block w-full rounded-lg bg-gray-100 px-3 py-2 shadow focus:outline-none focus:shadow-outline"
            style={{
              transition:
                "box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",
            }}
          >
            {questions.map((question) => (
              <option key={question.id} value={question.id}>
                {question.text}
              </option>
            ))}
          </select>
          <div className="mt-3 flex flex-wrap gap-2">
            {formData.questionsText.map((text, index) => (
              <span
                key={index}
                className="flex items-center bg-indigo-200 text-indigo-800 text-xs px-2 py-1 rounded-full"
              >
                {text}
                <button
                  type="button"
                  className="ml-2 text-indigo-500 hover:text-indigo-700"
                  onClick={() => removeChip("questionIds", index)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Date of Exam Input */}
        <div className="flex p-4 bg-white rounded-lg shadow-md items-center mb-4 w-full md:w-1/2 lg:w-1/3">
          <label
            htmlFor="dateOfExam"
            className="block text-sm font-semibold text-gray-700 mr-4"
          >
            Date of Exam
          </label>
          <input
            type="date"
            name="dateOfExam"
            id="dateOfExam"
            required
            value={formData.dateOfExam}
            onChange={handleInputChange}
            className="mt-1 flex-1 rounded-lg bg-gray-100 px-3 py-2 shadow focus:outline-none focus:shadow-outline"
            style={{
              transition:
                "box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",
            }}
          />
        </div>

        {/* Duration Input */}
        <div className=" p-4 bg-white rounded-lg shadow-md flex items-center mb-4 w-full md:w-1/2 lg:w-1/3">
          <label
            htmlFor="duration"
            className="block text-sm font-semibold text-gray-700 mr-4"
          >
            Duration (minutes)
          </label>
          <input
            type="number"
            name="duration"
            id="duration"
            required
            min="1"
            value={formData.duration}
            onChange={handleInputChange}
            className="mt-1 flex-1 rounded-lg bg-gray-100 px-3 py-2 shadow-sm focus:outline-none focus:bg-white"
            style={{
              transition:
                "box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-1/5 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:border-primary"
        >
          Create Exam
        </button>
      </form>
    </div>
  );
};

export default CreateExam;
