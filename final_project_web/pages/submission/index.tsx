import React from 'react'
import { Editor } from "@monaco-editor/react";

function index() {
    return (
      <div className='p-8'>
        <h3 className='text-xl text-primary'>
          Question #1
        </h3>
        <div className='flex flex-col mt-3 gap-3'>
          <div className='text-3xl'>
            Submission Detail
          </div>
          <div className='border p-3'>
              <div>
                5/5 testcases passed
              </div>
              <div className="flex flex-row">
                <div className="mr-2 text-gray-500 ">Status: </div>
                <div className="text-red-500"> Wrong Answer</div>
              </div>
              <div className="flex flex-row">
                <div className="mr-2 text-gray-500">Submitted: </div>
                <div className="text-black">2 weeks,3 days ago</div>
              </div>

          </div>
          <div className='flex flex-row space-x-[1000px]'>
              <div className="flex flex-row">
                <div className="mr-2 text-gray-500">Language: </div>
                <div className="text-black">Python</div>
              </div>
              <button type="button" className="focus:outline-none text-white bg-primary hover:bg-primary focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary">Edit code</button>
          </div>
          <div>
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
      </div>
          // <div className="min-h-screen p-4 gap-3">
          //   <div className="text-2xl font-bold flex mb-2 bg-primary">
          //     <span>Submission Details</span>
          //   </div>
          //   <div className="flex flex-row">
          //     <div className="mr-2 text-gray-500 ">Status: </div>
          //     <div className="text-red-500"> Wrong Answer</div>
          //   </div>
          //   <div className="flex flex-row">
          //     <div className="mr-2 text-gray-500">Submitted: </div>
          //     <div className="text-black">2 weeks,3 days ago</div>
          //   </div>
          //   <div className="flex flex-row">
          //     <div className="mr-2 text-gray-500">Language: </div>
          //     <div className="text-black">Python</div>
          //   </div>
          //   <div className='mt-3'>
          //   <Editor
          //     height="70vh"
          //     language={"python"}
          //     theme={"vs-dark"}
              
          //   />
          // </div>
          // <a href="#" className="inline-flex items-center justify-center font-medium text-primary hover:underline mt-3">
          // Back to code 
          // <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          //     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          // </svg>
          // </a>         
          // </div>
    );
}

export default index
