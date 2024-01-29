import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from '@headlessui/react' ;
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import { MdMenuBook } from "react-icons/md";
import Link from "next/link";

function SideNavbar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div>
      <Disclosure as="nav">
        <div className="p-6 w-1/2 h-screen bg-[#7983FB] z-20 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
          <div className="flex justify-center">
  <div className="text-base text-center cursor-pointer font-bold text-white  pb-4 w-full items-center ml-16">
    <MdMenuBook className="text-4xl" />
  </div>
</div>
            <div className=" my-4 border-b border-gray-100 pb-4">
            <Link
            href="/profile"
            >
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineSpaceDashboard className="text-2xl text-white   group-hover:text-white " />
                <h3 className="text-base text-white group-hover:text-white font-semibold ">
                  Dashboard
                </h3>
              </div>
              </Link>
              <Link
            href="/profile"
            >
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <CgProfile className="text-2xl text-white group-hover:text-white " />
                <h3 className="text-base text-white group-hover:text-white font-semibold ">
                  Profile
                </h3>
              </div>
              </Link>
              <Link
            href="/profile"
            >
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineAnalytics className="text-2xl text-white group-hover:text-white " />
                <h3 className="text-base text-white group-hover:text-white font-semibold ">
                  Analytics
                </h3>
              </div>
              </Link>

              <Link
            href="/profile"
            >
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineIntegrationInstructions className="text-2xl text-white group-hover:text-white " />
                <h3 className="text-base text-white group-hover:text-white font-semibold ">
                  Student List
                </h3>
              </div>
              </Link>
            </div>
           
            {/* logout */}
            
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default SideNavbar;