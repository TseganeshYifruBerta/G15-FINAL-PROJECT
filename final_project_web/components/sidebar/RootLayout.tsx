import Header from "../components/Header";
import SideNavigationBar from "./SideNavigationBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <SideNavigationBar />
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
          {children}
        </div>
      </div>
    </div>
  );
}
