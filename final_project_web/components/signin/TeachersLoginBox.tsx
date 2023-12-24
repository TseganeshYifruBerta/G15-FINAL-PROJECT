import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetTeachersSignInStatusQuery } from "@/store/signin/teachers-signin-api";
import { useRouter } from "next/router";

const TeachersLoginBox: React.FC = () => {
  const router = useRouter();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [count, setcount] = useState(0);
  // Fetch login status
  const {
    data: signinstatus,
    isLoading,
    isError,
  } = useGetTeachersSignInStatusQuery({
    password: password,
    email: email,
  });

  const loginHandle = async () => {
    setcount(count + 1);
    if (isLoading) {
      return <div>loading</div>;
    }

    if (isError) {
      return <div>Error</div>;
    }

    if (signinstatus.success) {
      router.push("/");
    } else {
      // Handle incorrect email or password
      // Display a warning message or update state to show a message in the UI
    }
  };
  return (
    <div className="w-2/3 bg-white p-8 shadow-md flex flex-col -ml-16">
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
      <div className="mb-4 w-full">
        <div className="mb-4">
          <h3 className="mb-1 font-bold">Email</h3>
          <input
            type="text"
            className="w-full border-b border-gray-500 focus:outline-none focus:border-blue-500"
            placeholder="abc@gmail.com"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div>
          <h3 className="mb-1 font-bold">PASSWORD</h3>
          <input
            type="password"
            name=""
            id=""
            placeholder="********"
            className="w-full border-b border-gray-500 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
      </div>
      {count != 0 && signinstatus && signinstatus.success === false && (
        <p className="text-red-500">Email or password is incorrect.</p>
      )}
      <div>
        <Link href={``}>
          <button
            onClick={loginHandle}
            className="w-full bg-primary text-white px-4 py-2"
          >
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TeachersLoginBox;
