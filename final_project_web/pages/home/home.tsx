const jwt = require("jsonwebtoken");
import { useSession } from "next-auth/react";

import React, { Component, ReactElement, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavigationItem {
  href: string;
  name: string;
  icon: React.ReactNode;
}

interface Navigation {
  [key: string]: NavigationItem[];
}
const navigation: Navigation = {
  teacher: [
    {
      href: "/teacher/dashboard",
      name: "Dashboard",
      icon: (
        <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />
      ),
    },
    {
      href: "/teacher/profile",
      name: "Profile",
      icon: (
        <FaRegComments className="text-2xl text-gray-600 group-hover:text-white " />
      ),
    },
    {
      href: "/teacher/questions",
      name: "Questions",
      icon: (
        <FaRegComments className="text-2xl text-gray-600 group-hover:text-white " />
      ),
    },
    {
      href: "/teacher/students",
      name: "Students",
      icon: (
        <FaRegComments className="text-2xl text-gray-600 group-hover:text-white " />
      ),
    },
    {
      href: "/teacher/exams",
      name: "Exams",
      icon: (
        <FaRegComments className="text-2xl text-gray-600 group-hover:text-white " />
      ),
    },
  ],
  student: [
    {
      href: "/student/dashboard",
      name: "Dashboard",
      icon: (
        <FaRegComments className="text-2xl text-gray-600 group-hover:text-white " />
      ),
    },
    {
      href: "/student/questions",
      name: "Questions",
      icon: (
        <FaRegComments className="text-2xl text-gray-600 group-hover:text-white " />
      ),
    },
    {
      href: "/teacher/submissions",
      name: "Submissions",
      icon: (
        <FaRegComments className="text-2xl text-gray-600 group-hover:text-white " />
      ),
    },
    {
      href: "/student/exams",
      name: "Students",
      icon: (
        <FaRegComments className="text-2xl text-gray-600 group-hover:text-white " />
      ),
    },
  ],
  admin: [
    {
      href: "/admin/upload",
      name: "Upload User",
      icon: (
        <FaRegComments className="text-2xl text-gray-600 group-hover:text-white " />
      ),
    },
  ],
};

interface ButtonProps {
  name: string;
  href: string;
  icon: ReactElement;
}
const NavButton = (props: ButtonProps) => {
  return (
    <Link href={props.href}>
      <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-primary p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
        {props.icon}
        <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
          {props.name}
        </h3>
      </div>
    </Link>
  );
};
function SideNavbar() {
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwt.decode(token);
        const userRole = decodedToken?.role || null;
        setRole(userRole);
      } else {
        router.push("/login");
      }
    }, []);

    if (!role) {
      return null;
    }

    const navItems = navigation[role];

  return (
    <div>
      <Disclosure as="nav">
        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200 border-r-2">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
              Virtual Dashboard
            </h1>
            <div className=" my-4 border-b border-gray-100 pb-4">
              {(navItems as any).map((item: any) => (
                <NavButton
                  key={item.href}
                  name={item.name}
                  href={item.href}
                  icon={item.icon}
                />
              ))}
              </div>

            {/* logout */}
            <div className=" my-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-primary p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Logout
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default SideNavbar;
