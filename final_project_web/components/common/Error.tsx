import React from "react";
// import { ExclamationCircleIcon, RefreshIcon } from "@heroicons/react/outline";

function FetchError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* <ExclamationCircleIcon className="w-16 h-16 text-red-600" /> */}
      <h1 className="text-2xl font-bold text-red-300 mt-4">
        Oops! Something went wrong.
      </h1>
      <p className="mt-2 text-md text-red-300">
        We&apos;re having trouble loading the page.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        {/* <RefreshIcon className="w-5 h-5 mr-2" /> */}
        Refresh the Page
      </button>
    </div>
  );
}

export default FetchError;
