const jwt = require("jsonwebtoken");
import React from "react";
import {
  RiCheckboxBlankCircleFill,
  RiGroupLine,
  RiMenuFoldLine,
} from "react-icons/ri";
import {
  IoFolderOpenOutline,
  IoBulbOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { MdAutoGraph, MdOutlineTopic, MdOutlineQuiz } from "react-icons/md";
import { AiOutlineMenuFold, AiOutlineMenu } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const navigations: any = {
  teacher: [
    {
      href: "/teacher/dashboard",
      name: "Dashboard",
      icon: MdAutoGraph,
    },
    {
      href: "/teacher/questions",
      name: "Questions",
      icon: MdOutlineQuiz,
    },
    {
      href: "/teacher/students",
      name: "Students",
      icon: RiGroupLine,
    },
    {
      href: "/teacher/exams",
      name: "Exams",
      icon: IoFolderOpenOutline,
    },
    {
      href: "/plagiarism/plagiarism",
      name: "Plagiarism",
      icon: IoFolderOpenOutline,
    }
  ],
  student: [
    {
      href: "/student/dashboard",
      name: "Dashboard",
      icon: MdAutoGraph,
    },
    {
      href: "/student/questions",
      name: "Questions",
      icon: MdOutlineQuiz,
    },
    {
      href: "/teacher/submissions",
      name: "Submissions",
      icon: RiGroupLine,
    },
    {
      href: "/student/exams",
      name: "Students",
      icon: IoFolderOpenOutline,
    },
  ],
  admin: [
    {
      href: "/admin/upload",
      name: "Upload User",
      icon: MdAutoGraph,
    },
  ],
};
function SideNavigationBar() {
  
    const router = useRouter();
    const [role, setRole] = useState("teacher"); // Default role if none is provided
    const [navigation, setNavigation] = useState(navigations.teacher); // Default navigation
    const [activeTab, setActiveTab] = useState("/teacher/dashboard");
    const [isNavOpen, setIsNavOpen] = useState(true);
  const SetActiveMenuTab = (tab: number, link: string) => {
    router.push(link);
  };

    useEffect(() => {
      // Adjust navigation bar visibility based on window size
      const handleResize = () => {
        setIsNavOpen(window.innerWidth >= 1290);
      };
      window.addEventListener("resize", handleResize);
      handleResize(); // Call once initially

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwt.decode(token);
        const userRole = decodedToken?.role || "teacher"; // Default to teacher if role is not decoded
        setRole(userRole);
      } else {
        router.push("/login");
      }
    }, []);

    useEffect(() => {
      // Set navigation based on role
      setNavigation(navigations[role] || []);
    }, [role]);
  return (
    <div>
      <div
        className={` ${
          isNavOpen ? "w-[200px]" : "w-16"
        } h-screen grid grid-cols-12`}
      >
        <div
          className={classNames(
            isNavOpen ? "" : "hidden",
            "bg-white flex col-span-11 flex-col gap-y-5 shadow-gray-300 shadow-2xl h-screen rounded-r-2xl"
          )}
        >
          <div className="flex h-24 min-h-24 items-center bg-primary rounded-bl-xl rounded-tr-xl">
            <Image
              className="relative mx-auto"
              src={"/assets/Logo.svg"}
              alt="Logo"
              width={115}
              height={100}
              priority
            />
          </div>

          <nav className="flex flex-1 flex-col px-6 bg-white no-scrollbar rounded-br-xl pt-9">
            <ul role="list" className="flex flex-1 flex-col">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item: any, i: number) => (
                    <li key={i} className="h-12 rounded-xl">
                      <button
                        onClick={() => {
                          SetActiveMenuTab(item.name, item.href);
                          setActiveTab(item.name);
                        }}
                        className={classNames(
                          activeTab == item.name
                            ? "bg-primary text-primary bg-opacity-30"
                            : "text-primary hover:text-primary hover:bg-primary hover:bg-opacity-30",
                          "group flex gap-x-3 rounded-xl text-sm leading-6 font-medium h-full w-full pt-2"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            activeTab == item.name
                              ? "text-primary"
                              : "text-primary",
                            "h-4 w-4 mt-1 ml-2"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                        {activeTab == item.name ? (
                          <span
                            className="ml-auto text-center text-xs font-medium leading-6 text-white ring-none pt-2 pr-2"
                            aria-hidden="true"
                          >
                            <RiCheckboxBlankCircleFill className="h-2 w-2 text-primary -mb-1" />
                          </span>
                        ) : null}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="w-full mt-auto">
                <button
                  onClick={() => SetActiveMenuTab(7, "/settings")}
                  className={classNames(
                    activeTab == "7"
                      ? "bg-[#EBD7E7] text-primary"
                      : "text-secondary hover:bg-lightPrimaryBg",
                    "group flex gap-x-3 rounded-xl p-2 py-3 text-sm leading-6 font-medium h-full w-full"
                  )}
                >
                  <IoSettingsOutline className="h-4 w-4 text-primary mt-1 ml-1" />
                  <span
                    className={classNames(
                      activeTab == "7" ? "text-primary" : "text-secondary",
                      "mx-3 font-medium"
                    )}
                    aria-hidden="true"
                  >
                    Settings
                  </span>
                </button>
              </li>
              <li className="w-full mb-4">
                <button className="group flex gap-x-3 rounded-xl p-2 py-3 text-sm leading-6 font-medium h-full w-full">
                  <BiLogOut className="h-4 w-4 text-primary mt-1 ml-0.5" />
                  <span
                    className="mx-3 text-secondary font-medium"
                    aria-hidden="true"
                  >
                    Logout
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-span-1">
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className={classNames(
              isNavOpen ? "-ml-4 mt-20" : "ml-3 mt-7 ring-2 ring-primary",
              "text-center h-7 w-7 rounded-full border-2 border-white bg-primary text-xs font-medium leading-5 text-white ring-none"
            )}
            aria-hidden="true"
          >
            {isNavOpen ? (
              <AiOutlineMenuFold className="h-3 w-3 ml-1.5 text-white" />
            ) : (
              <AiOutlineMenu className="h-3 w-3 ml-1.5 px-0.5 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideNavigationBar;
