import React, { FC, useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import Image from "next/image";
import { Skeleton } from "@nextui-org/react";

interface SearchBarProps {
  text: string;
  isVisible?: boolean;
}

const SearchBar: FC<SearchBarProps> = ({ text, isVisible = false }) => {



  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    profileImage: "",
  });

  return (
    <div className="flex items-center justify-between h-20 w-full mb-10 rounded-3xl bg-primary px-14">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          {isVisible && <IoMdSearch color="#808080" />}
        </div>
        {isVisible && (
          <input
            type="text"
            placeholder={`Search ${text}`}
            className="bg-[#EBD7E7] text-primary placeholder:text-primary text-xs pr-4 pl-8 pt-2 py-2 rounded-3xl w-96 h-10"
          />
        )}
      </div>

      <div className="flex items-center text-right">
        <div className="mr-4"> 
            <>
              <p className="text-sm text-white font-medium">
                firstName lastName
              </p>
              <p className="text-xs text-white  text-opacity-70">{user.role}</p>
            </>
          
        </div>

        <div className="ring-1 rounded-full ring-[#f4e4f4] p-1">
          {" "}
          {user.profileImage ? (
            <Image
              src={user.profileImage}
              alt="Profile"
              width={50}
              height={50}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-400">
              <span className="font-medium text-xs leading-none text-white">
                {user.firstName[0]}
                {user.lastName[0]}
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
