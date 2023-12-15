import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function CodeEditorBox({ onChange, value }: any)  {
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-light");
  return (
    <div className="">
      <div className="editor-settings text-blackx">
        <select onChange={(e) => setLanguage(e.target.value)} value={language}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
        <select onChange={(e) => setTheme(e.target.value)} value={theme}>
          <option value="vs-light">Light</option>
          <option value="vs-dark">Dark</option>
        </select>
      </div>
      <Editor
        height="70vh"
        language={language}
        theme={theme}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CodeEditorBox;