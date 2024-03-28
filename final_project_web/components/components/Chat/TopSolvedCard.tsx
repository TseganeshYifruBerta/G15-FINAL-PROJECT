import Link from "next/link";
import Image from "next/image";
import { useGetTopSolvedQuestionsQuery } from "@/store/question/get-top-solved-questions";

const TopSovedQuestions: React.FC = () => {
  const {
    data: topsolved,
    isLoading: isLoadingTop,
    isError: isErrorTop,
  } = useGetTopSolvedQuestionsQuery("");

  if (isLoadingTop) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Top Solved Questions
      </h4>

      <div className="w-full">
        {topsolved?.combinedResults.map((question: any, key: any) => (
          <Link href={""}>
            <div
              className="border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              key={key}
            >
              <div className="flex items-center">
                <div className="w-full gap-4 flex sm:items-center">
                  <p className="text-sm text-black dark:text-white">
                    {question.questionDetail.title}
                  </p>
                  <p className="w-1/2 text-sm text-gray-500 dark:text-white">
                    {question.userCount} solved
                  </p>
                </div>
                {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center"></div> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopSovedQuestions;
