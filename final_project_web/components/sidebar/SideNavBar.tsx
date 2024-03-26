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
      icon: <MdOutlineSpaceDashboard className="text-2xl text-gray-600 " />,
    },
    {
      href: "/teacher/questions",
      name: "Questions",
      icon: <FaRegComments className="text-2xl text-gray-600 " />,
    },
    {
      href: "/teacher/students",
      name: "Students",
      icon: <FaRegComments className="text-2xl text-gray-600 " />,
    },
    {
      href: "/teacher/exams",
      name: "Exams",
      icon: <FaRegComments className="text-2xl text-gray-600 " />,
    },
  ],
  student: [
    {
      href: "/student/dashboard",
      name: "Dashboard",
      icon: <FaRegComments className="text-2xl text-gray-600 " />,
    },
    {
      href: "/student/questions",
      name: "Questions",
      icon: <FaRegComments className="text-2xl text-gray-600 " />,
    },
    {
      href: "/teacher/submissions",
      name: "Submissions",
      icon: <FaRegComments className="text-2xl text-gray-600" />,
    },
    {
      href: "/student/exams",
      name: "Students",
      icon: <FaRegComments className="text-2xl text-gray-600" />,
    },
  ],
  admin: [
    {
      href: "/admin/upload",
      name: "Upload User",
      icon: <FaRegComments className="text-2xl text-gray-600" />,
    },
  ],
};

interface ButtonProps {
  name: string;
  href: string;
  icon: ReactElement;
  current: string | null;
}
const NavButton = (props: ButtonProps) => {
  return (
    <div
      className={`flex mb-2 justify-start items-center gap-4 -ml-1 ${
        props.current == props.name ? "bg-white text-primary" : "text-white"
      } hover:bg-white hover:text-primary  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto`}
    >
      {props.icon}
      <h3 className="text-base text-gray-800 ">{props.name}</h3>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="ml-2">
      <p className="text-md">
        <span className="font-bold text-2xl">ሁሉ</span>{" "}
        <span className="-ml-1">code</span>
      </p>
    </div>
  );
};
function SideNavbar() {

  const router = useRouter();
  const isHomePage = router.pathname === "/";
  if (isHomePage){
    return (
      <div></div>
    );
  }
  const [role, setRole] = useState<string | null>(null);
  const [currentNav, setCurrentNav] = useState<string | null>("");

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
    <aside className="absolute left-0 top-0 z-9999 h-[1000px] flex w-72.5 flex-col overflow-y-hidden duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 translate-x-0 bg-primary">
      <div>
        <Disclosure as="nav">
          <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
            <GiHamburgerMenu
              className="block md:hidden h-6 w-6"
              aria-hidden="true"
            />
          </Disclosure.Button>
          <div className="pt-6 bg-primary dark:bg-boxdark dark:text-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200 border-r-2">
            <Logo />
            <div className="flex flex-col justify-start item-center">
              <div className=" my-4 pb-4">
                {(navItems as any).map((item: any) => (
                  <Link
                    href={item.href}
                    onClick={(e) => setCurrentNav(item.name)}
                  >
                    <NavButton
                      key={item.href}
                      name={item.name}
                      href={item.href}
                      icon={item.icon}
                      current={currentNav}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Disclosure>
      </div>
    </aside>
  );
}

export default SideNavbar;
