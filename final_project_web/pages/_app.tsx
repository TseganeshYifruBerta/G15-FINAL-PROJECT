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

export default function App({ Component, pageProps }: AppProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // <Provider store={store}>
    //   <div className="flex">
    //     {/* <SideNavbar /> */}
    //     <SideNavigationBar />

    //     <div className="w-full">
    //       <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    //       <Component {...pageProps} /> <ToastContainer />
    //     </div>
    //   </div>
    // </Provider>

    <RootLayout>
      <Provider store={store}>
        <div className="mx-16 mt-6 h-full">
          <SearchBar text={"dashboard"} isVisible={true} />
          <div className="h-[88%] -mt-6 rounded-xl overflow-scroll no-scrollbar">
            <Component {...pageProps} /> <ToastContainer />
          </div>
        </div>
      </Provider>
    </RootLayout>
    // <>
    //   {/* <!-- ===== Page Wrapper Start ===== --> */}
    //   <div className="flex h-screen overflow-hidden">
    //     {/* <!-- ===== Sidebar Start ===== --> */}
    //     <SideNavbar />
    //     {/* <!-- ===== Sidebar End ===== --> */}

    //     {/* <!-- ===== Content Area Start ===== --> */}
    //     <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
    //       {/* <!-- ===== Header Start ===== --> */}
    //       {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
    //       {/* <!-- ===== Header End ===== --> */}

    //       {/* <!-- ===== Main Content Start ===== --> */}
    //       <main>
    //         <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
    //           <Component {...pageProps} /> <ToastContainer />
    //         </div>
    //       </main>
    //       {/* <!-- ===== Main Content End ===== --> */}
    //     </div>
    //     {/* <!-- ===== Content Area End ===== --> */}
    //   </div>
    //   {/* <!-- ===== Page Wrapper End ===== --> */}
    // </>
  );
}
