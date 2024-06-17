import { fetchUserProfile, UserProfile2, updateUserProfilePhoto  } from '@/store/account/api_caller';
const jwt = require("jsonwebtoken");
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/router";
import { AcademicCapIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import Link from "next/link";

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
      icon: MdOutlineTopic,
    },
    {
      href: "/grading/grading",
      name: "Grading",
      icon: MdOutlineTopic,
    },
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
      href: "/student/submissions",
      name: "Submissions",
      icon: RiGroupLine,
    },
    {
      href: "/student/exams",
      name: "Exams",
      icon: IoFolderOpenOutline,
    },
  ],
  admin: [
    {
      href: "/admin/upload",
      name: "Upload User",
      icon: MdAutoGraph,
    },
    {
      href: "/admin/studentlist",
      name: "Student List",
      icon: UserGroupIcon,
    },
    {
      href: "/admin/teacherlist",
      name: "Teacher List",
      icon: AcademicCapIcon,
    },
  ],
};
const roleDisplayName = {
  admin: "Admin",
  student: "Student",
  teacher: "Teacher",
} as const; // 'as const' asserts that this object's structure and values are fixed and literal

// Define the RoleKey type based on the keys of roleDisplayName
type RoleKey = keyof typeof roleDisplayName;

function SideNavigationBar() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile2 | null>(null);
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<RoleKey>("teacher"); // Default role if none is provided
  const [navigation, setNavigation] = useState(navigations.teacher); // Default navigation
  const [activeTab, setActiveTab] = useState("/teacher/dashboard");
  const [isNavOpen, setIsNavOpen] = useState(true);

  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
        setToken(storedToken);
        const decodedToken = jwt.decode(storedToken);
        if (decodedToken && typeof decodedToken === 'object') {
            setUserId(decodedToken.id); 
        }
    }
}, []);

useEffect(() => {
    const fetchData = async (token: string, userId: number) => {
        try {
            const data = await fetchUserProfile(token, userId);
            setUserProfile(data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    if (token && userId !== null) {
        fetchData(token, userId);
    }
}, [token, userId]); 

  const SetActiveMenuTab = (tab: number, link: string) => {
    router.push(link);
  };

  // useEffect(() => {
  //   const storedFullName = localStorage.getItem('fullName');
  //   if (storedFullName) {
  //     setFullName(storedFullName);
  //   }
  // }, []);

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
      const userRole = decodedToken?.role || "teacher"; 
      setRole(userRole);
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    // Set navigation based on role
    setNavigation(navigations[role] || []);
  }, [role]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    localStorage.removeItem("role");
    router.push("/");
  };

  return (
    <div>
      <div className={` ${isNavOpen ? "w-[300px]" : "w-16"} h-screen grid grid-cols-12`}>
        <div
          className={classNames(
            isNavOpen ? "" : "hidden",
            "bg-white flex col-span-11 flex-col gap-y-5 shadow-gray-300 shadow-2xl h-screen rounded-r-2xl"
          )}
        >
          <div className="flex flex-col h-10 min-h-24 items-start justify-start rounded-bl-xl rounded-tr-xl">
            <div className="flex items-center justify-center">
              <Image
                className="relative drop-shadow-md"
                src={"/assets/Logo.svg"}
                alt="Logo"
                width={115}
                height={212}
                priority
              />
              <p className="font-bold drop-shadow-md text-xl">ሁሉ Code</p>
            </div>
          </div>
          <div className="flex flex-row gap-4 h-18 min-h-24 bg-gray-500 bg-opacity-20 items-center m-4 rounded-xl justify-start">
              <span className="h-12 w-12 ml-2">
              <Image
              className="w-12 h-12 rounded-full drop-shadow-md"
                width={112}
                height={112}
                src={userProfile?.photoUrl || "/assets/pro2.png"}

                alt="User"
              />
            </span>
            <div className="hidden lg:flex justify-center items-center">
              <div className="text-center">
                <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">

                    <span>
                      <strong className='drop-shadow-md'>{userProfile?.fullName}</strong>
                    </span>

                </span>
                <span className="block text-xs text-gray-500 dark:text-gray-400">

                    <strong className="text-gray-600 drop-shadow-md dark:text-gray-300">
                    {userProfile?.role }
                    </strong>

                </span>
              </div>
            </div>
          </div>
          <nav className="flex flex-1 flex-col px-6 bg-white no-scrollbar rounded-br-xl pt-9">
            <strong className="text-base drop-shadow-md text-black mb-5">{roleDisplayName[role]}</strong>
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
                            : "text-gray-700 hover:text-primary hover:bg-gray-100 transition-transform duration-200 ease-in-out transform hover:scale-105",
                          "group flex gap-x-3 items-center rounded-xl text-sm leading-6 font-medium h-full w-full pt-2 px-2"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            "h-6 w-5 mt-1 ml-2 mr-4",
                            "transition-colors duration-200 ease-in-out"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                        {activeTab == item.href && (
                          <span className="ml-auto text-center text-xs font-medium leading-6 text-white ring-none pt-2 pr-2">
                            <RiCheckboxBlankCircleFill className="h-2 w-2 text-primary -mb-1" />
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="w-full flex flex-col items-center justify-center mb-5 mt-auto">
                <Image
                  className="relative mb-4 "
                  src={"/assets/image5.png"}
                  alt="Logo"
                  width={155}
                  height={152}
                  priority
                />
                <span className="block drop-shadow-md text-sm font-medium text-gray-800 dark:text-gray-200">

                    <span className='drop-shadow-md'>
                      Hi, <strong>{userProfile?.fullName}</strong>
                    </span>

                </span>
              </li>
              <li className="w-full mb-4">
                <button
                  onClick={handleLogout}
                  className="group flex text-gray-600 hover:text-primary hover:font-bold gap-x-3 rounded-xl transition-transform duration-200 ease-in-out transform hover:scale-105 p-2 py-3 text-2sm leading-6 font-medium h-full w-full"
                >
                  <BiLogOut className="h-4 w-4 hover:text-primary text-sm mt-1 ml-0.5" />
                  <span
                    className="mx-3 drop-shadow-md hover:text-primary font-medium"
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
              "text-center h-9 w-9 rounded-full border-2 border-white bg-primary text-lg font-medium leading-5 text-white ring-none"
            )}
            aria-hidden="true"
          >
            {isNavOpen ? (
              <AiOutlineMenuFold className="h-5 w-5 ml-1.5 text-white" />
            ) : (
              <AiOutlineMenu className="h-5 w-5 ml-1.5 px-0.5 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideNavigationBar;