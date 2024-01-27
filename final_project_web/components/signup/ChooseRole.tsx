import Link from "next/link";

const ChooseRole: React.FC = () => {
  return (
    <div className="w-2/3 bg-white p-8 shadow-md flex flex-col -ml-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Choose Your Role</h1>
        <div className="flex justify-center space-x-4">
          <Link
            href="/signup/student"
            className="bg-[#7983FB] text-white px-4 py-2 rounded"
          >
            Student
          </Link>
          <Link
            href="/signup/teacher"
            className="bg-[#7983FB] text-white px-4 py-2 rounded"
          >
            Teacher
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;
