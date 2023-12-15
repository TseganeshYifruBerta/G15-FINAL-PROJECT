import React from "react"

const Submissions: React.FC = () => {
    return (
      <div className="m-6">
        <div>
          <h1 className="text-xl font-bold mb-2">Submissions</h1>
        </div>
        <div>
          <div className="flex mb-2">
            <div className="w-1/2">
              {" "}
              <h1 className="text-red-700 font-bold">Wrong Answer</h1>
            </div>
            <div className="w-1/2 justify-end flex">
              <h1 className="font-light text-">12/14/2023 7:40 PM</h1>
            </div>
          </div>
          <div className="flex mb-2">
            <div className="w-1/2">
              {" "}
              <h1 className="text-red-700 font-bold">Wrong Answer</h1>
            </div>
            <div className="w-1/2 justify-end flex">
              <h1 className="font-light text-">12/14/2023 7:40 PM</h1>
            </div>
          </div>
          <div className="flex mb-2">
            <div className="w-1/2">
              {" "}
              <h1 className="text-green-700 font-bold">Accepted</h1>
            </div>
            <div className="w-1/2 justify-end flex">
              <h1 className="font-light text-">12/14/2023 7:40 PM</h1>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Submissions