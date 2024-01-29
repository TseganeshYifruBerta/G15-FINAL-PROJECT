import { MdErrorOutline } from "react-icons/md";

const NoSubmission: React.FC = () => {
    return (
      <div className=" bg-blue-100 p-20 m-32 rounded-lg flex justify-center text-4xl font-extrabold text-gray-500">
        <div>
          <div className="flex justify-center">
            <MdErrorOutline style={{ color: "red", fontSize: "70px" }} />{" "}
          </div>
          <div className="flex">No Submission</div>
        </div>
      </div>
    );
}

export default NoSubmission