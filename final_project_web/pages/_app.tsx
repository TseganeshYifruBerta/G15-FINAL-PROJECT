import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
// import {store} from "@/store";
import Navigation from "@/components/layout/Navigation";
import { store } from "@/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideNavbar from "@/components/sidebar/SideNavBar";
import Header from "@/components/components/Header";
import { useState } from "react";
import SideNavigationBar from "@/components/sidebar/SideNavigationBar";
import RootLayout from "@/components/sidebar/RootLayout";
import SearchBar from "@/components/sidebar/SearchBar";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const isHomepage = router.pathname === "/";
  return isHomepage ? (
    <Provider store={store}>
      <Component {...pageProps} /> <ToastContainer />
    </Provider>
  ) : (
    <RootLayout>
      <Provider store={store}>
        <div className="mx-auto mt-6 h-full no-scrollbar">
          {/* <SearchBar text={"dashboard"} isVisible={true} /> */}
          <div className=" rounded-xl no-scrollbar">
            <Component {...pageProps} /> <ToastContainer />
          </div>
        </div>
      </Provider>
    </RootLayout>
  );
}
