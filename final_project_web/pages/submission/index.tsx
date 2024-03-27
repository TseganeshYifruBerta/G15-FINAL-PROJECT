import React from 'react'
import { Editor } from "@monaco-editor/react";

function index() {
    return (
          <div className="min-h-screen p-4 gap-3">
            <div className="text-2xl font-bold flex mb-2 bg-primary">
              <span>Submission Details</span>
            </div>
            <div className="flex flex-row">
              <div className="mr-2 text-gray-500">Status: </div>
              <div className="text-red-500"> Wrong Answer</div>
            </div>
            <div className="flex flex-row">
              <div className="mr-2 text-gray-500">Submitted: </div>
              <div className="text-black">2 weeks,3 days ago</div>
            </div>
            <div className="flex flex-row">
              <div className="mr-2 text-gray-500">Language: </div>
              <div className="text-black">Python</div>
            </div>
            <div className='mt-3'>
            <Editor
              height="70vh"
              language={"python"}
              theme={"vs-dark"}
              
            />
          </div>
          <a href="#" className="inline-flex items-center justify-center font-medium text-primary hover:underline mt-3">
          Back to code 
          <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
          </a>         
          </div>
    );
}

export default index
