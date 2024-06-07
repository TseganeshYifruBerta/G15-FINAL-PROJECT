import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { useRouter } from "next/router";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  if (isHomePage) {
    return <div></div>;
  }
  return (
   
    <header className="sticky top-0 z-50 flex w-full bg-transparent  shadow-gray-50 shadow-xs">
    <div className="flex flex-grow items-center bg-transparent justify-between px-4 py-1 shadow-md md:px-6 rounded-l-sm 2xl:px-11">
        <div className="hidden sm:block"></div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <DarkModeSwitcher /> */}
            <DropdownNotification />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>

  );
};

export default Header;
