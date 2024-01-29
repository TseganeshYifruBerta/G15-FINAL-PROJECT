import Link from "next/link";
interface studentProps {
    
        id: number,
        name: string,
        userID: string,
        email: string,
        section: string,
        createdAt: string,
        updatedAt: string
    
}
const StudentsListsCard: React.FC<studentProps> = ({name, userID, email, section, createdAt, updatedAt, id}) => {
  return (
    <Link href={``}>
      <div className="flex justify-center w-full">
        <div className="flex bg-gray-200 rounded-md p-2 m-2 w-3/5">
          {/* <div className="w-1/5"><FaCode /></div> */}
          <div className="w-3/5 font-semibold">
            {id}. {name}
          </div>
          <div>{userID}</div>
          <div className="ml-6 font-light">{section}</div>
          <div className="ml-6 font-light">{email}</div>
        </div>
      </div>
    </Link>
  );
};

export default StudentsListsCard