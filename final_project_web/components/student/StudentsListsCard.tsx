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
 // Update the import path as necessary

const StudentsListsCard: React.FC<studentProps> = ({
  id,
  name,
  userID,
  email,
  section,
  createdAt,
  updatedAt,
}) => {
  return (
      <Link className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden m-4 hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer" href={`/teacher/student/${id}`}>
        <div className="grid grid-cols-3 p-4">
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-gray-600 text-center">
            Student ID: {userID}
          </div>
          <div className="text-sm text-gray-600 text-right">
            Section: {section}
          </div>
        </div>
        <div className="grid grid-cols-3 p-4 border-t">
          <div className="text-sm text-gray-600">{email}</div>
          <div className="text-sm text-gray-600 text-center">
            Joined: {new Date(createdAt).toLocaleDateString()}
          </div>
          <div className="text-sm text-gray-600 text-right">
            Updated: {new Date(updatedAt).toLocaleDateString()}
          </div>
        </div>
      </Link>
  );
};

export default StudentsListsCard;
