interface QuestionSetProps {
  questionTitle: string;
  questionDescription: string;
  questionExample: string;
}
const QuestionSet: React.FC<QuestionSetProps> = ({questionTitle, questionDescription, questionExample}) => {
  return (
    <div className="m-6 p-4 bg-gray-200">
      <div>
        <h1 className="text-3xl font-bold mb-6">{questionTitle}</h1>
      </div>
      <div>
        <p className="pb-6">
      {questionDescription}
        </p>
      </div>
      <div className="mt-10">       
        <p>
         {questionExample}
        </p>
      </div>
    </div>
  );
};

export default QuestionSet;
