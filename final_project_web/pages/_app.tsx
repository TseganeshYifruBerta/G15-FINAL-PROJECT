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
  const isQuestionRelated = router.pathname.startsWith("/question")
  return isHomepage || isQuestionRelated ? (
    <Provider store={store}>
      <div className="flex flex-col flex-1 overflow-hidden">
        {" "}
        {/* Ensure this container allows internal scrolling */}
        <Header
          sidebarOpen={undefined}
          setSidebarOpen={function (arg0: boolean): void {
            throw new Error("Function not implemented.");
          }}
        />{" "}
        {/* Assuming your header is meant to stay fixed at the top */}
        <div className="overflow-auto">
          {" "}
          {/* This allows the children content to scroll */}
          <Component {...pageProps} /> <ToastContainer />
        </div>
      </div>
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
