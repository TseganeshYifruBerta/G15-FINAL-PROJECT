import React from "react";
import { Disclosure } from "@headlessui/react";
import { MdOutlineSpaceDashboard, MdOutlineAnalytics } from "react-icons/md";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdMenuBook } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaHome,
  FaQuestionCircle,
  FaUsers,
  FaChartPie,
  FaBookOpen,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

const navigationConfig: any = {
  student: [
    { name: "Dashboard", href: "/profile/", icon: FaHome },
    {
      name: "Questions",
      href: "/profile/getallquestions",
      icon: FaQuestionCircle,
    },
    // ... other student routes
    {
      name: "Submissions",
      href: "/profile/getallsubmissionsbyid",
      icon: FaQuestionCircle,
    },
  ],
  teacher: [
    { name: "Dashboard", href: "/teacher", icon: FaHome },
    {
      name: "Questions",
      href: "/teacher/getallquestions",
      icon: FaQuestionCircle,
    },
    { name: "Students", href: "/teacher/getallstudents", icon: FaUsers },

    { name: "Exams", href: "/teacher/exams", icon: FaHome },
    // ... other teacher routes
  ],
};

const useRoleBasedNavigation = (role: any) => {
  return navigationConfig[role] || [];
};
const SideNavbar: React.FC = () => {
  const [nav, setNav] = useState(true);
  const router = useRouter();
  const isSigninPage = router.pathname === "/signin";
  const isSignupPage = router.pathname === "/signup";
  const isHomePage = router.pathname === "/";
  const isStudentProfile = router.pathname === "/student";
  const isTeacherProfile = router.pathname === "/teacher";
  const isTeacherExam = router.pathname === "/teacher/exams";
  const isTeacherQuestion = router.pathname === "/teacher/getallquestions";
  const isTeacherGetallStudents = router.pathname === "/teacher/getallstudents";

  const listt =
    isTeacherProfile ||
    isTeacherExam ||
    isTeacherQuestion ||
    isTeacherGetallStudents
      ? navigationConfig.teacher
      : navigationConfig.student;
  // const role = useSelector((state) => state.currentUser.role);

  // const navigationItems = useRoleBasedNavigation("student");
  return (
    <div className="h-full w-64 bg-gradient-to-b from-primary to-blue-400 text-white flex flex-col">
      <div className="px-5 py-4 border-b border-blue-300">
        <h1 className="text-xl font-semibold text-white">Hulu</h1>
      </div>

      {/* User Profile Section */}
      <div className="flex flex-col items-center justify-center pt-6">
        <FaUserCircle className="text-8xl" />
        <h2 className="mt-2 mb-4 text-xl font-semibold">User Name</h2>
      </div>
      <div className="flex-grow">
        {listt.map((link: any) => (
          <Link key={link.name} href={link.href} passHref>
            <div
              className={`flex items-center px-4 py-3 mt-2 rounded-lg hover:bg-white hover:text-primary ${
                router.pathname == link.href ? "bg-white text-primary" : ""
              } transition-colors duration-200 ease-in-out`}
            >
              <link.icon className="mr-3" />
              {link.name}
            </div>
          </Link>
        ))}
      </div>

      <div className="px-5 py-4 border-t border-blue-300">
        <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300 py-4">
          <FaSignOutAlt />
          <span>Logout</span>
        </div>
        <Link href="/settings" passHref>
          <div className="flex items-center hover:text-white">
            <FaQuestionCircle className="mr-3" />
            Help &amp; Support
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideNavbar;

// import React from "react";

// const SideNavbar = () => {
//   return (
//     <div className="flex flex-col h-full bg-purple-700 text-white min-h-screen w-full">
//       <div className="flex items-center justify-center h-20 shadow-md">
//         {/* Logo or User Avatar */}
//         <div className="rounded-full bg-white p-4"></div>
//       </div>
//       <div className="flex flex-col py-4">
//         {/* Navigation Items */}
//         <a
//           href="#profile"
//           className="flex items-center p-4 hover:bg-purple-800"
//         >
//           <i className="icon-placeholder mr-2"></i>{" "}
//           {/* Replace with actual icon */}
//           Profile
//         </a>
//         <a href="#exams" className="flex items-center p-4 hover:bg-purple-800">
//           <i className="icon-placeholder mr-2"></i>{" "}
//           {/* Replace with actual icon */}
//           Exams
//         </a>
//         <a
//           href="#questions"
//           className="flex items-center p-4 hover:bg-purple-800"
//         >
//           <i className="icon-placeholder mr-2"></i>{" "}
//           {/* Replace with actual icon */}
//           Questions
//         </a>
//         <a
//           href="#students"
//           className="flex items-center p-4 hover:bg-purple-800"
//         >
//           <i className="icon-placeholder mr-2"></i>{" "}
//           {/* Replace with actual icon */}
//           Students
//         </a>
//         {/* More items... */}
//       </div>
//     </div>
//   );
// };

// export default SideNavbar;
