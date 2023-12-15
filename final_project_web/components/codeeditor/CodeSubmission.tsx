function CodeSubmission({onSubmit} : any) {
    return (
      <div className="w-full h-1/3 bg-white p-4">
        <div className="flex mb-4">
          <div className="mt-4 text-black w-1/12">
            <div className="mr-2">
              <h3>Inputs</h3>
            </div>
            <div className="mr-2">
              <h3>Stdout</h3>
            </div>
            <div className="mr-2">
              <h3 className="">Outputs</h3>
            </div>
          </div>
          <div className="w-11/12 bg-gray-200">
            <div className="mt-4 text-black pl-2">
              <div className="mr-2">
                <h3>[1, 2, 3, 4, 5]</h3>
              </div>
              <div className="mr-2">
                <h3>hello world!</h3>
              </div>
              <div className="mr-2">
                <h3 className="">5</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="mr-4">
            <button
              className="bg-primary hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
              onClick={onSubmit}
            >
              Submit Code
            </button>
          </div>
          <div>
            <button
              className="bg-gray-300 font-bold py-2 px-4 rounded"
              onClick={onSubmit}
            >
              Run Code
            </button>
          </div>
        </div>
      </div>
    );
}

export default CodeSubmission;