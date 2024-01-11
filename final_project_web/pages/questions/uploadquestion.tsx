import { useDispatch, useSelector } from "react-redux"; // Make sure to adjust the path based on your project structure
import { RootState } from "@/stores";
import { AppDispatch } from "@/stores";
import { useState } from "react";
import { useRouter } from "next/router";
import { registerQuestion } from "@/stores/actions/uploadAction";
import UploadForm from "@/components/questions/UploadForm";

const RegisterScreen: React.FC = () => {
   const router = useRouter();
   const [title, setTitle] = useState("");
   const [difficulty, setDifficulty] = useState("");
   const [description, setDescription] = useState("");
   const [example, setExample] = useState("");
   const [input, setInput] = useState("");
   const [output, setOutput] = useState("");
   const [showWarning, setShowWarning] = useState(false); // State for showing/hiding warning
   const dispatch: AppDispatch = useDispatch(); // Use AppDispatch type
   useSelector((state: RootState) => state.uploadquestion);

  const data = {
    testCases: { input: input, output: output },
    title: title,
    difficulty: difficulty,
    description: description,
    example: example,
  };

  const submitForm = async (data: any, e: React.FormEvent) => {
    e.preventDefault();

    try {
                setShowWarning(false);

      const jsonInput = JSON.parse(input);
      const jsonOutput = JSON.parse(output);
      const jsonTestCases = {
        input: jsonInput,
        output: jsonOutput.output,
      };
      data.testCases = [jsonTestCases];

    } catch (error: any) {
      // Handle parsing errors, if any
              setShowWarning(true);

      console.error("Error parsing JSON:", error.message);
    }

    data.title = title;
    data.difficulty = difficulty;
    data.description = description;
    data.example = example;

    try {
      await dispatch(registerQuestion(data));
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <form onSubmit={(e) => submitForm(data, e)}>
      <div className="p-10">
        <div className="text-3xl font-bold m-2 p-2">
          <span className="">Question</span>
          <span className="text-primary"> Upload</span>
        </div>
        <div className="flex">
          <div className="w-3/5">
            <div className="flex">
              <div className="w-1/2">
                <UploadForm label={"title"} onContentChange={setTitle} />
              </div>
              <div className="w-1/2">
                <UploadForm
                  label={"difficulty"}
                  onContentChange={setDifficulty}
                />
              </div>
            </div>
            <div className="w-full">
              <UploadForm
                label={"description"}
                onContentChange={setDescription}
              />
            </div>
            <div className="w-full">
              <UploadForm label={"example"} onContentChange={setExample} />
            </div>
            <div>
              <label htmlFor="" className="m-1 p-2 font-bold">
                Testcases
              </label>
            </div>
            <div className="flex">
              <div className="w-1/2">
                <UploadForm label={"input"} onContentChange={setInput} />
                {/* <JsonInput onJsonChange={handleJsonChange} onContentChange={setInput} /> */}
              </div>
              <div className="w-1/2">
                <UploadForm label={"output"} onContentChange={setOutput} />
              </div>
            </div>
            {showWarning && (
              <div className="text-red-500">
                Warning: Invalid JSON format for input or output.
              </div>
            )}
          </div>
          <div className="w-1/5 flex ml-10">
            <div className="w-1/2 flex self-center justify-center bg-primary m-1 rounded-md p-2">
              <button className="" type="submit">
                Upload
              </button>
            </div>
            <div className="w-1/2 flex self-center justify-center bg-primary m-1 p-2 rounded-md">
              <button>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default RegisterScreen;
