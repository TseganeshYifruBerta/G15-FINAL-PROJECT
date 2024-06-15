interface QuestionSetProps {
  questionTitle: string;
  questionDescription: string;
  questionExample: string;
  difficulty:string
  questionId: string;
}
const QuestionSet: React.FC<QuestionSetProps> = ({questionId, questionTitle, questionDescription, questionExample, difficulty}) => {
  return (
    <div className="col-span-12 rounded-md bg-white px-5 pb-5 pt-7.5 shadow-lg dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8  h-[550px]">
      <div className=" border-primary mb-6">
        <h1 className="text-lg font-semibold">
          {questionId} . {questionTitle}
        </h1>
        <div className="text-sm ml-4 font-light">
          <span
            className={
              difficulty === "hard"
                ? "text-red-500 bg-red-500 ml-2 bg-opacity-20 px-4 py-1 rounded-xl"
                : difficulty === "easy"
                ? "text-green-500 bg-green-500 bg-opacity-20 px-4 py-1 rounded-xl ml-2"
                : difficulty === "medium"
                ? "text-yellow-800 bg-opacity-20 px-4 py-1 rounded-xl bg-yellow-800"
                : ""
            }
          >
            {difficulty}
          </span>
        </div>
      </div>

      <div className="pb-16 rounded-lg shadow-1 px-2 pt-2 ">
        <div className="text-lg text-gray-700 text-opacity-80  font-semibold py-2">
          Description :
        </div>
        <div>
          <p className="pb-2 text-sm">{questionDescription}</p>
        </div>
      </div>
      <div className="mt-2 text-sm bg-primary bg-opacity-20 pb-10 pt-2 px-2 rounded-lg">
        <div className="text-sm text-gray-700 text-opacity-80  font-semibold py-2">
          Example :
        </div>

        <p>{questionExample}</p>
      </div>
    </div>
  );
};

export default QuestionSet;
