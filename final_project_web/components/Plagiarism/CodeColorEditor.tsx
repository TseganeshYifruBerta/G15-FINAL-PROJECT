import React from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; 

interface CodeHighlighterProps {
  code: string;       
  language: string;  
}

const tailwindClassMap = {
  'hljs-keyword': 'text-purple-500 font-bold',
  'hljs-function .hljs-title': 'text-white-500 font-bold',
  'hljs-variable': 'text-red-500',
  'hljs-params': 'text-yellow-500',
  'hljs-built_in': 'text-purple-500'
};



const CodeHighlighter: React.FC<CodeHighlighterProps> = ({ code, language }) => {
  

  const highlightedCode = React.useMemo(() => {
    const rawHighlighted = hljs.highlight(code, { language }).value;
 
  const tailwindHighlighted = Object.entries(tailwindClassMap).reduce((acc, [hljsClass, twClass]) => {
    const regex = new RegExp(`class="${hljsClass}"`, 'g');
    
    return acc.replace(regex, `class="${twClass}"`);
  }, rawHighlighted);

  return tailwindHighlighted;
}, [code, language]);

  return (
    <pre>
      <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </pre>
  );
};

export default CodeHighlighter;
