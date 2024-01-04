// App.tsx
import React from "react";
import CodeOutput from "@/components/CodeOutput";
import CodeEditor from "@/components/CodeEditor";


const PythonRunner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Code Execution Environment</h1>
      <div className="flex">
        <CodeEditor />
        <CodeOutput />
      </div>
    </div>
  );
};

export default PythonRunner;
