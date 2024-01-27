interface QuestionSetProps {
  questionTitle: string,
  questionDescription: string,
}
const QuestionSet: React.FC<QuestionSetProps> = ({questionTitle, questionDescription}) => {
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
      {/* <div className="mt-10">
        <h1 className="font-semibold text-xl mb-2">Constraints</h1>
        <p>
          <span className="font-extrabold text-2xl mr-2">.</span> 1 - n - 1000
        </p>
        <p>
          {" "}
          <span className="font-extrabold text-2xl mr-2">.</span>all the
          elements are unique
        </p>
        <p>
          {" "}
          <span className="font-extrabold text-2xl mr-2">.</span>guaranted that
          the answer will always exist
        </p>
      </div> */}
    </div>
  );
};

export default QuestionSet;
