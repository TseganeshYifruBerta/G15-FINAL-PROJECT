import Link from "next/link";

const ChooseRole: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
  <div className="w-2/3 border-2  border-[#c1c3dd] bg-white p-8 shadow-md flex flex-col">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Choose Your Role</h1>
      <div className="flex justify-center space-x-4">
        <Link
          href="/upload/uploadstudent"
          className="bg-[#7983FB] text-white px-4 py-2 rounded"
        >
          Student
        </Link>
        <Link
          href="/upload/uploadteacher"
          className="bg-[#7983FB] text-white px-4 py-2 rounded"
        >
          Teacher
        </Link>
      </div>
    </div>
  </div>
</div>
  );
};

export default ChooseRole;
