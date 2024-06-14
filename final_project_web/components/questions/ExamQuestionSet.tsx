interface QuestionSetProps {
  questionTitle: string;
  questionDescription: string;
  questionExample: string;
  difficulty: string;
  questionId: string;
  tag:string,
  chapter:string,
  solution:any[]
  testcases:any[]
}
const ExamQuestionSet: React.FC<QuestionSetProps> = ({
  questionId,
  questionTitle,
  questionDescription,
  questionExample,
  difficulty,
  tag,
  solution,
  chapter,
  testcases,
}) => {
  return (
    <div className="col-span-12 rounded-md bg-white px-5 pb-5 pt-7.5 shadow-lg dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8  overflow-y-scroll scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300">
      <div className=" border-primary mb-6">
        <h1 className="text-md font-semibold">
          {questionId} . {questionTitle}
        </h1>
      </div>

      <div className="pb-16 rounded-lg shadow-1 px-2 pt-2 text-xs">
        <div className=" font-semibold py-2">Description :</div>
        <div>
          <p className="pb-2 text-xs">{questionDescription}</p>
        </div>
        <h1 className="">
          <span className="font-semibold">Tag:</span> {tag}
        </h1>

        <h1 className="">
          <span className="font-semibold">Chapter: </span>
          {chapter}
        </h1>

        <h1 className="">
          <span className="font-semibold">Difficulty: </span>
          {difficulty}
        </h1>
      </div>

      <div className="pb-16 rounded-lg shadow-1 px-2 pt-2 text-xs">
        <div className="mt-2 text-xs pb-4 pt-2 px-2 rounded-lg">
          <div className="font-semibold">Example:</div>
          <div className="ml-4 bg-primary bg-opacity-20 w-2/3 p-2 rounded-md">
            {questionExample}
          </div>
        </div>
        <div className="mt-2 text-xs pb-4 pt-2 px-2 rounded-lg">
          <div className="font-semibold">Solutions:</div>
          <div className="ml-4 bg-primary bg-opacity-20 w-2/3 p-2 rounded-md">
            {solution.map((sol, index) => (
              <div className="py-2" key={index}>
                <div className="text-xs pb-1">Solution {index + 1}</div>
                <div className="ml-2 w-1/2 rounded-md px-2 py-2">
                  {sol.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 text-xs pb-4 pt-2 px-2 rounded-lg">
          <div className="font-semibold">Testcases:</div>
          <div className="ml-4">
            <div className="pt-4 flex w-2/3 mb-2">
              <div className="ml-2 w-1/2 rounded-md px-2">Inputs</div>
              <div className="ml-2 w-1/2 rounded-md px-2">Outputs</div>
            </div>
            <div className=" w-2/3">
              {testcases.map((testcase, testIdx) => (
                <div
                  className="py-2 flex bg-primary bg-opacity-20 rounded-md"
                  key={testIdx}
                >
                  {/* <div className="text-xs pb-1">Testcase {index + 1}</div> */}
                  <div className="ml-2 w-1/2 rounded-md px-2 py-2">
                    {typeof testcase.input === "object"
                      ? JSON.stringify(testcase.input)
                      : testcase.input}
                  </div>
                  <div className="ml-2 w-1/2 rounded-md px-2 py-2">
                    {typeof testcase.output === "object"
                      ? JSON.stringify(testcase.output)
                      : testcase.output}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamQuestionSet;
