import QuestionLoading from "@/components/common/QuestionLoading";
import QuestionSubmissionCard from "@/components/questions/QuestionSubmissionCard";
import { useGetAllSubmissionsByIdQuery } from "@/store/submissions/get-all-submissions-by-id";
import { useState } from "react";

export interface singleSubmissionProps {
  questionsForId: {
    id: number;
    title: string;
    difficulty: string;
    description: string;
    example: string;
    createdAt: string;
    updatedAt: string;
  };
  questionStatus: {
    id: number;
    status: string;
    userId: string;
    questionId: string;
    userCode: string;
    createdAt: string;
    updatedAt: string;
    submittedCodeId: number;
  };
  id: number;
}

const initial = [
  {
    questionsForId: {
      id: 25,
      title: "Grade Checker",
      difficulty: "easy",
      description:
        "This function assigns grades based on the given score according to the specified criteria.",
      example: "Example: If the score is 85, the grade will be B.",
      createdAt: "2024-01-28T07:15:54.000Z",
      updatedAt: "2024-01-28T07:15:54.000Z",
    },
    questionStatus: {
      id: 1,
      status: "Wrong Answer",
      userId: "3",
      questionId: "25",
      userCode:
        "def grade_checker(score):\n    if score >= 70:\n        return 'A'\n    elif score >= 80:\n        return 'B'\n    elif score >= 70:\n        return 'C'\n    elif score >= 60:\n        return 'D'\n    else:\n        return 'F'",
      createdAt: "2024-01-28T21:43:21.000Z",
      updatedAt: "2024-01-28T21:43:21.000Z",
      submittedCodeId: 1,
    },
    id: 1,
  },
];

const AllSubmissions: React.FC = () => {
  const userId = "1";

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const {
    data: submissionsData,
    isLoading,
    isError,
  } = useGetAllSubmissionsByIdQuery({
    userId: userId,
  });

  const handleSort = (a: singleSubmissionProps, b: singleSubmissionProps) => {
    if (sortOrder === "asc") {
      console.log(a.questionStatus);
      return (
        new Date(a.questionStatus.createdAt).getTime() -
        new Date(b.questionStatus.createdAt).getTime()
      );
    } else {
      return (
        new Date(b.questionStatus.createdAt).getTime() -
        new Date(a.questionStatus.createdAt).getTime()
      );
    }
  };

  const filteredSubmissions = initial
    ?.filter((submission: singleSubmissionProps) => {
      return (
        submission.questionsForId.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        (filter ? submission.questionStatus.status === filter : true)
      );
    })
    .sort(handleSort);
  if (isLoading) {
    return (
      <div className="flex">
        <QuestionLoading />
      </div>
    );
  }
  if (isError) {
    return <div>Error</div>;
  }
  console.log(submissionsData);
  return (
    <div className="p-6 min-h-screen w-full bg-white">
      <div className="text-2xl font-bold mb-6">All Submissions</div>
      <div className="flex justify-between mb-4 items-center">
        <div className="flex-grow mr-4">
          <input
            type="text"
            placeholder="Search by title..."
            className="w-4/5 px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center w-2/5">
          <select
            className="select select-bordered select-primary w-1/2 max-w-xs mr-4 px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary shadow"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="">All Submissions</option>
            <option value="Accepted">Accepted</option>
            <option value="Wrong Answer">Wrong Answer</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 w-1/2"
          >
            Sort by Date {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      <div>
        {filteredSubmissions.map((submission: singleSubmissionProps) => (
          <QuestionSubmissionCard
            key={submission.id}
            id={submission.id}
            questionTitle={submission.questionsForId.title}
            status={submission.questionStatus.status}
            difficulty={submission.questionsForId.difficulty}
            createdAt={submission.questionStatus.createdAt}
          />
        ))}
      </div>
    </div>
  );
};
export default AllSubmissions;
