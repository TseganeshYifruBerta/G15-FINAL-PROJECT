import Link from "next/link";
import React from "react"

const Navigation : React.FC = () => {
    return (
      <div className="flex mt-4 space-x-10 text-xl font-bold ml-6">
        <Link href={"/home"}>Home</Link>
        <Link className="text-primary" href={"/questions"}>Questions</Link>
      </div>
    );
}

export default Navigation;