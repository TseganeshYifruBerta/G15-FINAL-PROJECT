import Link from "next/link";
import React from "react";
import SideNavbar from "../sidebar/sidebarstudent";
import { useRouter } from "next/router";

const Navigation: React.FC = () => {
  const router = useRouter();
  const isSigninPage = router.pathname === "/signin";
  const isSignupPage = router.pathname === "/signup";
  const isHomePage = router.pathname === "/";
  const isStudentProfile = router.pathname === "/student";
  const isTeacherProfile = router.pathname === "/teacher";

  console.log(isSigninPage, isSignupPage, isHomePage);
  return (
    <div className="w-full min-h-screen">
      <SideNavbar />
    </div>
    // <div
    //   className={`${isSigninPage ? "hidden" : ""} ${
    //     isHomePage ? "hidden" : ""
    //   } ${isSignupPage ? "hidden" : ""}`}
    // >
    //   {!isSigninPage &&
    //     !isSignupPage &&
    //     !isHomePage &&
    //     isStudentSignUp &&
    //     isTeacherSignUp && (
    //       <div className="flex w-3/6 text-xl font-bold">
    //         <SideNavbar />

    //       </div>
    //     )}
    // </div>
  );
};

export default Navigation;
