import UploadForm from "@/components/questionupload/UploadForm";
import { useUploadQuestionQuery } from "@/store/questionupload/question-upload-api";
import { useState } from "react";

function UploadQuestion() {
  interface initial {
    nums: string,
    target: string
  }
  const init: initial = {
    nums: '',
    target: ""
  }
   const [title, setTitle] = useState("");
   const [difficulty, setDifficulty] = useState("");
   const [description, setDescription] = useState("");
   const [example, setExample] = useState("");
   const [output, setOutput] = useState("");
   const [input, setInput] = useState(init);

   
   const { data, isLoading, isError } = useUploadQuestionQuery({
     title: title,
     difficulty: difficulty,
     description: description,
     example: example,
     output: output,
     input: input,
   });

  return (
    <div className="p-10">
      <div className="text-3xl font-bold m-2 p-2">
        <span className="">Question</span>
        <span className="text-primary"> Upload</span>
      </div>
      <div className="flex">
        <div className="w-3/5">
          <div className="flex">
            <div className="w-1/2">
              <UploadForm
                label={"Title"}
                width={""}
                height={""}
                onContentChange={setTitle}
              />
            </div>
            <div className="w-1/2">
              <UploadForm
                label={"Difficulty"}
                width={""}
                height={""}
                onContentChange={setDifficulty}
              />
            </div>
          </div>
          <div className="w-full">
            <UploadForm
              label={"Question Description"}
              width={""}
              height={""}
              onContentChange={setDescription}
            />
          </div>
          <div className="w-full">
            <UploadForm
              label={"Examples"}
              width={""}
              height={""}
              onContentChange={setExample}
            />
          </div>
          <div>
            <label htmlFor="" className="m-1 p-2 font-bold">
              Testcases
            </label>
          </div>
          <div className="flex">
            <div className="w-1/2">
              <UploadForm
                label={"Input"}
                width={""}
                height={""}
                onContentChange={() => init}
              />
            </div>
            <div className="w-1/2">
              <UploadForm
                label={"Output"}
                width={""}
                height={""}
                onContentChange={setOutput}
              />
            </div>
          </div>
          {/* <div className="w-full">
            <UploadForm label={"Constraints"} width={""} height={""} />
          </div> */}
        </div>
        <div className="w-1/5 flex">
          <div className="w-1/2 flex self-center justify-center bg-primary m-1 rounded-md p-2">
            <button className="">Upload</button>
          </div>
          <div className="w-1/2 flex self-center justify-center bg-primary m-1 p-2 rounded-md">
            <button>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadQuestion;
