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
  console.log(topsolved, "topsolved");
  return (
    <div className="col-span-12 rounded-sm  bg-white py-6 shadow-md dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-md font-semibold text-black dark:text-white">
        Top Solved Questions
      </h4>
      {topsolved?.combinedResults.length == undefined ||
      topsolved?.combinedResults.length == 0 ? (
        <div className="flex flex-col items-center justify-center p-10 text-center">
          <Image
            src="/images/nodata.svg"
            className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-500"
            alt={""}
            width={12}
            height={12}
          ></Image>
          <h3 className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
            No Questions Added Yet
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            It looks like there are no top solved questions to display at the
            moment. Check back later!
          </p>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default TopSovedQuestions;
