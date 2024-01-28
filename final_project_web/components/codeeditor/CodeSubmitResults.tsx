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
  return (
    <div className="flex w-full">
      <div className="bg-gray-100 p-2 m-2 w-full rounded-md ml-0">
        {allCodeSubmissionResults.map((result, index) =>
          result.pass ? (
            <div key={index} className="flex border-b-2">
              <div className="w-1/6">
                <FaCheck style={{ color: "green" }} />
              </div>
              <div className="w-2/6">{result.input}</div>
              <div className="w-1/6">{result.actualOutput}</div>
              <div className="w-1/6">{result.expectedOutput}</div>
            </div>
          ) : (
            <div key={index} className="flex border-b-2">
              <div className="w-1/6">
                <FaTimes style={{ color: "red" }} />
              </div>
              <div className="w-2/6">{result.input}</div>
              <div className="w-1/6">{result.actualOutput}</div>
              <div className="w-1/6">{result.expectedOutput}</div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CodeSubmissionResluts;
