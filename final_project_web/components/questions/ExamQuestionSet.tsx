interface QuestionSetProps {
  questionTitle: string;
  questionDescription: string;
  questionExample: string;
  difficulty: string;
  questionId: string;
}
const ExamQuestionSet: React.FC<QuestionSetProps> = ({
  questionId,
  questionTitle,
  questionDescription,
  questionExample,
  difficulty,
}) => {
  return (
    <div className="col-span-12 rounded-md bg-white px-5 pb-5 pt-7.5 shadow-lg dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8 h-[400px] overflow-y-scroll scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300">
      <div className=" border-primary mb-6">
        <h1 className="text-md font-semibold">
          {questionId} . {questionTitle}
        </h1>

      </div>

      <div className="pb-16 rounded-lg shadow-1 px-2 pt-2">
        <div className="text-xs font-semibold py-2">Description :</div>
        <div>
          <p className="pb-2 text-xs">{questionDescription}</p>
        </div>
      </div>
      <div className="mt-2 text-xs bg-primary bg-opacity-20 pb-10 pt-2 px-2 rounded-lg">
        <p>{questionExample}</p>
      </div>
    </div>
  );
};

export default ExamQuestionSet;
