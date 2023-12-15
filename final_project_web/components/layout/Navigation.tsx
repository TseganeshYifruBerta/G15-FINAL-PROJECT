import Link from "next/link";
import React from "react"

const Navigation : React.FC = () => {
    return (
      <div>
        <Link href={"/"}>Home</Link>
        <Link href={"/questions/id"}>Questions</Link>
      </div>
    );
}

export default Navigation;