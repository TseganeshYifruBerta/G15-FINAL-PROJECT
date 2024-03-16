import Link from "next/link";
interface studentProps {
  id: number;
  name: string;
  userID: string;
  email: string;
  section: string;
  createdAt: string;
  updatedAt: string;
}
const StudentsListsCard: React.FC<studentProps> = ({
  name,
  userID,
  email,
  section,
  createdAt,
  updatedAt,
  id,
}) => {
  // return (
  //   <Link href={``}>
  //     <div className="flex ml-10 w-full">
  //       <div className="flex bg-gray-200 rounded-md p-2 m-2 w-3/5">
  //         {/* <div className="w-1/5"><FaCode /></div> */}
  //         <div className="w-3/5 font-semibold">
  //           {id}. {name}
  //         </div>
  //         <div>{userID}</div>
  //         <div className="ml-6 font-light">{section}</div>
  //         <div className="ml-6 font-light">{email}</div>
  //       </div>
  //     </div>
  //   </Link>
  // );
  return (
    <Link href={`/students/${id}`}>
      <div className="block">
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden m-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <div className="w-full md:w-2/5 p-4 md:p-6 text-center md:text-left">
            <div className="text-lg font-semibold">{name}</div>
            <p className="text-gray-700 mt-1">{email}</p>
          </div>
          <div className="w-full md:w-3/5 p-4 md:p-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">Student ID: {userID}</div>
              <div className="text-sm text-gray-600">Section: {section}</div>
            </div>
            <div className="mt-3 md:mt-0 md:flex md:justify-between">
              <div className="text-sm text-gray-600">Joined: {createdAt}</div>
              <div className="text-sm text-gray-600">Updated: {updatedAt}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StudentsListsCard;
