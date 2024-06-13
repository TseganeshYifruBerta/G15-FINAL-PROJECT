import { FaCheck, FaTimes } from "react-icons/fa";

const handleSubmissionResults = (
  inputs: string[],
  actualOutputs: string[],
  expectedOutputs: string[],
  passed: boolean[]
) => {
  var allInputResults = [];
  console.log(passed)
  for (var i = 0; i < inputs.length; i++) {
    allInputResults.push({
      input: inputs[i],
      actualOutput: actualOutputs[i],
      expectedOutput: expectedOutputs[i],
      pass: passed[i],
    });
  }

  return allInputResults;
};

interface submissionResultProps {
  inputs: string[];
  actualOutputs: string[];
  expectedOutputs: string[];
  passed: boolean[];
}
const CodeSubmissionResluts: React.FC<submissionResultProps> = ({
  inputs,
  actualOutputs,
  expectedOutputs,
  passed,
}) => {
  const allCodeSubmissionResults = handleSubmissionResults(
    inputs,
    actualOutputs,
    expectedOutputs,
    passed
  );
  console.log(passed, "passed");
  return (
    <>
      {passed.length == 0 ? (
        <div></div>
      ) : (
        <div className="flex w-full">
          <div className="bg-gray-100 p-2 m-2 w-full rounded-md ml-0 overflow-y-scroll h-[100px]">
            <div className="flex border-b-2 border-gray-500 text-sm font-semibold">
              <div className="w-2/6">Test Cases </div>
            </div>
            {allCodeSubmissionResults.map((result, index) => (
              <div key={index} className="flex border-b-2 text-xs">
                {result.pass ? (
                  <div className="w-[25px]">
                    <FaCheck style={{ color: "green" }} />
                  </div>
                ) : (
                  <div className="w-[25px]">
                    <FaTimes style={{ color: "red" }} />
                  </div>
                )}
                {/* <div className="w-2/6">{result.input}</div>
            <div className="w-2/6 justify-center flex">{result.actualOutput}</div>
            <div className="w-2/6 justify-center flex">{result.expectedOutput}</div> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CodeSubmissionResluts;
