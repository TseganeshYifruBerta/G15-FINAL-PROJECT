import Link from "next/link";
import React from "react"
import SideNavbar from "../sidebar/sidebarstudent";

const Navigation : React.FC = () => {
    return (
      <div className="flex w-3/6 text-xl font-bold">
        <SideNavbar />
      </div>
    );
}

export default Navigation;