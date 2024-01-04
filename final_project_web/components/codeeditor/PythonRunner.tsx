// components/PythonRunner.tsx
import React, { useRef } from "react";
import Brython from "brython";

interface PythonRunnerProps {
  pythonCode: string;
}

const PythonRunner: React.FC<PythonRunnerProps> = ({ pythonCode }) => {
  const outputRef = useRef<HTMLPreElement>(null);

  const runPythonCode = () => {
    Brython.run_script(pythonCode, null, outputRef.current);
  };

  return (
    <div>
      <button onClick={runPythonCode}>Run Python Code</button>
      <pre ref={outputRef}></pre>
    </div>
  );
};

export default PythonRunner;
