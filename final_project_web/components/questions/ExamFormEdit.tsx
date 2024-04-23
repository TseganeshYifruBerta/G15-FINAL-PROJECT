const jwt = require("jsonwebtoken");
import { Metadata } from "next";
import { useEffect, useState } from "react";
import SelectDifficultyGroup from "../components/SelectGroup/SelectDifficultyGroup";
import { showToast } from "../popup";
import {
  QuestionUploadFormData,
  uploadquestion,
} from "@/store/question-upload/question-upload-api";
import { useRouter } from "next/router";
import {
  ExamQuestionUploadFormData,
  uploadexamquestion,
} from "@/store/exam/upload-exam-question-api";
import { useUpdateExamMutation } from "@/store/exam/get-all-exam-api";

export const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};
interface ExamFormEditProps {
    title:string,
    duration:string,
    date_and_time:string
    instruction:string
    examId:string
}
const ExamFormEdit: React.FC<ExamFormEditProps> = ({
  title,
  duration,
  date_and_time,
  instruction,
  examId,
}) => {
  const router = useRouter();
  const [editedTitle, setEditedTitle] = useState(title);
  const [teacherId, setTeacherId] = useState();
  const [editedDuration, setEditedDuration] = useState(duration);
  const [editedInstruction, setEditedInstruction] = useState(instruction);

  const [editedDate, setEditedDate] = useState(date_and_time);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  console.log(editedDate, "editedDate");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      const userId = decodedToken?.id || null;
      setTeacherId(userId);
    } else {
      router.push("/login");
    }
  }, []);
  const values = {
    title: editedTitle,

    instruction: editedInstruction,
    duration: editedDuration,
    date_and_time: editedDate,
    examId: examId,
    sections: [
      { id: 1, sections: "4" },
      { id: 2, sections: "3" },
    ],
    status: "upcoming",
  };

  const [updateExam, { isLoading: isUpdating }] = useUpdateExamMutation();
  if (isUpdating) {
    return <div>Loading...</div>;
  }
  const handleUpdateExam = async (updatedData: any, event: any) => {
    event.preventDefault();

    try {
      console.log(updatedData, "updatedData");
      const data = await updateExam({ ...updatedData }); // Assuming 'updatedData' is an object containing the updated fields
      console.log(data, "data");
      // Optionally, you can trigger a refetch of all questions after updating
      //   refetch();
      showToast("Exam Updated successfully", "success");

      router.push("/teacher/exams");
    } catch (error) {
      // Handle error
    }
  };
  return (
    <form onSubmit={(e: any) => handleUpdateExam(values, e)}>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-semibold text-black dark:text-white">
                Update Exam
              </h3>
            </div>
            <>
              <div className="p-6.5 text-xs">
                <div className="w-full mr-6">
                  <div className="w-full py-2">
                    <label className="mb-2 block font-medium text-black dark:text-white">
                      Exam Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Exam title"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={editedTitle}
                      required
                      onChange={(e) => {
                        setEditedTitle(e.target.value);
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
                      value={editedInstruction}
                      required
                      onChange={(e) => {
                        setEditedInstruction(e.target.value);
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
                      value={editedDate}
                      onChange={(e) => setEditedDate(e.target.value)}
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
                      value={editedDuration}
                      onChange={(e) => setEditedDuration(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="Enter duration in minutes"
                      style={{
                        transition:
                          "box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",
                      }}
                    />
                  </div>
                  <div className="justify-end flex">
                    <button
                      className="flex w-1/3 justify-center rounded bg-primary text-white p-3 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Update Exam
                    </button>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ExamFormEdit;
