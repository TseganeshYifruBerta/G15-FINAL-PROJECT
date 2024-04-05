import QuestionTable from "@/components/components/Tables/QuestionTable";
import {
  useDeleteQuestionMutation,
  useGetAllQuestionsQuery,
  useUpdateQuestionMutation,
} from "@/store/question/get-all-questions";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function Questions() {
  // <Mutation></Mutation> hook for updating a question
  const [updateQuestion, { isLoading: isUpdating }] =
    useUpdateQuestionMutation();

  // Mutation hook for deleting a question
  const [deleteQuestion, { isLoading: isDeleting }] =
    useDeleteQuestionMutation();

  const {
    data: questions,
    isLoading: isLoadingQuestion,
    isError: isErrorQuestion,
    refetch,
  } = useGetAllQuestionsQuery("");
  if (isLoadingQuestion || isDeleting || isUpdating) {
    return <div>Loading...</div>;
  }
  // Example function to update a question
  const handleUpdateQuestion = async (
    questionId: any,
    updatedData: any,
    event: any
  ) => {
    event.preventDefault();
    try {
      await updateQuestion({ id: questionId, ...updatedData }); // Assuming 'updatedData' is an object containing the updated fields
      // Optionally, you can trigger a refetch of all questions after updating
      refetch();
    } catch (error) {
      // Handle error
    }
  };

  // Example function to delete a question
  const handleDeleteQuestion = async (questionId: any, event: any) => {
    event.preventDefault();
    try {
      await deleteQuestion(questionId);
      refetch();
    } catch (error) {
      // Handle error
      console.log("error deleting");
    }
  };

  console.log(questions, "questions");

  return (
    <div className="dark:bg-boxdark h-screen">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between w-full">
          <div className="w-full">
            <QuestionTable questions={questions.questionWithTestcase} deletequestion={refetch} />
          </div>
         
        </div>
      </div>
    </div>
  );
}
