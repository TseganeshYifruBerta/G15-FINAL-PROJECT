import Link from "next/link";
import React from "react";
import SideNavbar from "../sidebar/sidebarstudent";
import SideNavbarTeacher from "../sidebar/sidebar";

const NavigationTeacher: React.FC = () => {
  return (
    <div className="flex w-3/6 text-xl font-bold">
      <SideNavbarTeacher />
    </div>
  );
};

export default NavigationTeacher;
