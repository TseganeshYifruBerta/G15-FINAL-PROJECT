import Link from "next/link";
import Image from "next/image";
const ChooseRole: React.FC = () => {
  return (
    <div className="w-2/3 bg-white p-8 shadow-md flex flex-col -ml-16">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div>
            <Image
              src="/images/profile.png"
              alt=""
              width={80}
              height={80}
              className="rounded-full"
            />
            <h1 className="text-2xl font-semibold">LOGIN</h1>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-8">Choose Your Role</h1>
        <div className="flex justify-center space-x-4">
          <Link
            href="/signin/students"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Student
          </Link>
          <Link
            href="/signin/teachers"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Teacher
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;
