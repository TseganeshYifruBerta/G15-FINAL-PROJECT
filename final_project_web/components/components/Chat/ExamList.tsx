import Link from "next/link";
import Image from "next/image";
import { useGetAllExamListQuery } from "@/store/exam/get-all-exam-api";

const ExamList: React.FC = () => {
  const {
    data: allexamlist,
    isLoading: isLoadingTop,
    isError: isErrorTop,
  } = useGetAllExamListQuery("");

  if (isLoadingTop) {
    return <div>Loading...</div>;
  }
  return (
    <div className="col-span-12 rounded-sm  bg-white py-6 shadow-md dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-md font-semibold text-black dark:text-white">
        Exams{" "}
      </h4>
      {allexamlist?.exams.length == undefined ||
      allexamlist?.exams.length == 0 ? (
        <div className="flex flex-col items-center justify-center p-10 text-center">
          <Image
            src="/images/nodata.svg"
            className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-500"
            alt={""}
            width={12}
            height={12}
          ></Image>
          <h3 className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
            No Exams Added Yet
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            It looks like there are no exams to display at the moment. Check
            back later!
          </p>
        </div>
      ) : (
        <div className="w-full">
          <div className="border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="flex items-center">
              <div className="w-full gap-4 flex sm:items-center">
                <div className="w-1/2">
                  <p className="text-sm text-black dark:text-white">Title</p>
                </div>
                <div className="w-1/2">
                  <p className="text-sm text-black dark:text-white">
                    Date and Time
                  </p>
                </div>
              </div>
            </div>
          </div>
          {allexamlist?.exams.map((exam: any, key: any) => (
            <Link href={""} key={exam.id}>
              <div
                className="border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 text-xs"
                key={key}
              >
                <div className="flex items-center">
                  <div className="w-full gap-4 flex sm:items-center">
                    <div className="w-1/2">
                      <p className=" text-black dark:text-white">
                        {exam.id} . {exam.title}
                      </p>
                    </div>
                    <div className="w-1/2">
                      <p className=" text-gray-500 dark:text-white">
                        {exam.date_and_time}
                      </p>
                    </div>
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

export default ExamList;
