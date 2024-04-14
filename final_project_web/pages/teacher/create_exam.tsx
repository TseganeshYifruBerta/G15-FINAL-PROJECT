import SelectDifficultyGroup from '@/components/components/SelectGroup/SelectDifficultyGroup'
import { showToast } from '@/components/popup'
import { ExamUploadFormData, uploadexam } from '@/store/exam/upload-exam-api'
import { useRouter } from 'next/router'
import React, { useState } from 'react'




const create_exam:React.FC = () => {
  const router = useRouter();
const [examTitle, setExamTitle] = useState("")
const [date, setDate] = useState("")
const [instruction, setInstruction] = useState("")
const [duration, setDuration] = useState("")
const [sections, setSections] = useState<string[]>([])
const [selectedTag, setSelectedTag] = useState("");
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    const [difficulty, setDifficulty] = useState("");
    const [chapter, setChapter] = useState("");
    const [easy_questions, setEasyQuestions] = useState<string>("");
    const [medium_questions, setMediumQuestions] = useState<string>("");
    const [hard_questions, setHardQuestions] = useState<string>("");


  const handleSection = () => {
    setSections([...sections, ""]);
  };
    const changeTextColor = () => {
      setIsOptionSelected(true);
    };
     const values = {
    
    teacherId:"",
    title:examTitle,
    date_and_time:date,
    instruction:instruction,
    duration:duration,
    sections:sections,
    tag : selectedTag,
    chapter :[chapter],
    easy_questions : easy_questions,
    medium_questions : medium_questions,
    hard_questions : hard_questions
    

     };

     const onSubmit = async (event: any) => {
       event.preventDefault();
       try {
         console.log(values, "values");
         const data = await uploadexam(values as ExamUploadFormData);
         showToast("Upload successful", "success");
        //  router.push("/teacher/exams");
       } catch (error) {
         console.error("Upload error:", error);

         showToast("Upload error: " + (error as Error).message, "error");
       }
     };
  return (
    <form onSubmit={onSubmit}>
      <div className="grid w-full gap-9 sm:w-4/5">
        <div className="">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-semibold text-black dark:text-white">
                Create Exam
              </h3>
            </div>
            <>
              <div className="p-6.5 text-sm">
                <div className="mb-4.5 flex">
                  <div className="w-1/2 mr-6">
                    <div className="w-full py-2">
                      <label className="mb-2 block font-medium text-black dark:text-white">
                        Exam Title
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Exam title"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={examTitle}
                        required
                        onChange={(e) => {
                          setExamTitle(e.target.value);
                        }}
                      />
                    </div>
                    <div className="w-full py-2">
                      <label className="mb-2 block font-medium text-black dark:text-white">
                        Instruction
                      </label>
                      <input
                        type="text"
                        placeholder="Enter question title"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={instruction}
                        required
                        onChange={(e) => {
                          setInstruction(e.target.value);
                        }}
                      />
                    </div>
                    <div className="w-full py-2">
                      <label className="mb-2 block font-medium text-black dark:text-white">
                        Date and Time
                      </label>
                      <input
                        type="date"
                        name="date_and_time"
                        id="date_and_time"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        // className="mt-1 flex-1 rounded-lg bg-gray-100 px-3 py-2 shadow focus:outline-none focus:shadow-outline"
                        style={{
                          transition:
                            "box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",
                        }}
                      />
                    </div>
                    <div className="w-full py-2">
                      <label className="mb-2 block font-medium text-black dark:text-white">
                        Duration
                      </label>
                      <input
                        type="number"
                        name="date_and_time"
                        id="date_and_time"
                        required
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter duration in minutes"
                        style={{
                          transition:
                            "box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",
                        }}
                      />
                    </div>
                  </div>

                  <div className="w-1/2 ml-6">
                    <div className="w-full py-2">
                      <label className="mb-2 block font-medium text-black dark:text-white">
                        Section
                      </label>
                      <div className="flex">
                        <div className="w-[110px]">
                          <button
                            type="button"
                            onClick={handleSection}
                            className=" rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          >
                            + Section
                          </button>
                        </div>
                        {sections.map((section, index) => (
                          <div className="w-[80px] mx-1">
                            <input
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              type="number"
                              required
                              value={section}
                              onChange={(e) => {
                                const newTestCasesInput = [...sections];
                                newTestCasesInput[index] = e.target.value;
                                setSections(newTestCasesInput);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="w-full py-2">
                      <label className="mb-2 block font-medium text-black dark:text-white">
                        {" "}
                        Tag{" "}
                      </label>

                      <div className="relative z-20 bg-transparent dark:bg-form-input">
                        <select
                          value={selectedTag}
                          onChange={(e) => {
                            setSelectedTag(e.target.value);
                            changeTextColor();
                          }}
                          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                            isOptionSelected ? "text-black dark:text-white" : ""
                          }`}
                        >
                          <option
                            value=""
                            disabled
                            className="text-gray dark:text-bodydark"
                          >
                            Select Tag
                          </option>
                          <option
                            value="Lab"
                            className="text-body dark:text-bodydark"
                          >
                            Lab
                          </option>
                          <option
                            value="Final"
                            className="text-body dark:text-bodydark"
                          >
                            Final
                          </option>
                        </select>

                        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                          <svg
                            className="fill-current"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                fill=""
                              ></path>
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="w-full py-2 ">
                      {" "}
                      <label className="mb-3 block font-medium text-black dark:text-white">
                        Chapter
                      </label>
                      <input
                        type="number"
                        placeholder="Chapter"
                        required
                        min="1"
                        value={chapter}
                        onChange={(e) => {
                          setChapter(e.target.value);
                        }}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-xs"
                      />
                    </div>

                    <div className="w-full py-2 ">
                      <label className="mb-3 block font-medium text-black dark:text-white">
                        Select Question
                      </label>
                      <div className="flex mr-2 ">
                        {" "}
                        <div className="w-1/4">
                          <input
                            type="number"
                            placeholder="Easy"
                            required
                            min="1"
                            value={easy_questions}
                            onChange={(e) => {
                              setEasyQuestions(e.target.value);
                            }}
                            className="rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-xs"
                          />
                        </div>
                        <div className="w-1/4">
                          <input
                            type="number"
                            placeholder="Medium"
                            required
                            min="1"
                            value={medium_questions}
                            onChange={(e) => {
                              setMediumQuestions(e.target.value);
                            }}
                            className=" rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-xs"
                          />
                        </div>
                        <div className="w-1/4">
                          <input
                            type="number"
                            placeholder="Hard"
                            required
                            min="1"
                            value={hard_questions}
                            onChange={(e) => {
                              setHardQuestions(e.target.value);
                            }}
                            className=" rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    <div className=" flex justify-end">
                      <button
                      onClick={(e)=>router.push("/teacher/exams")}
                        className="flex w-1/3 justify-center rounded bg-primary text-white p-3 font-medium text-gray hover:bg-opacity-90"
                        type="submit"
                      >
                        Submit Question
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </form>
  );
}

export default create_exam