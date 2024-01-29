import { statusProps } from "./Submissions";


const Submission: React.FC<statusProps> = ({ createdAt, status }) => {
  return (
    <div>
      {status=="Wrong Answer" ? (
        <div className="flex mb-2">
          <div className="w-1/2">
            {" "}
            <h1 className="text-red-700 font-bold">Wrong Answer</h1>
          </div>
          <div className="w-1/2 justify-end flex">
            <h1 className="font-light text-">{createdAt}</h1>
          </div>
        </div>
      ) : (
        <div className="flex mb-2">
          <div className="w-1/2">
            <h1 className="text-green-700 font-bold">Accepted</h1>
          </div>
          <div className="w-1/2 justify-end flex">
            <h1 className="font-light text-">{createdAt}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Submission