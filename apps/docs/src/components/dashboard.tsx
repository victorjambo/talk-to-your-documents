"use client";
import { Fragment, useState } from "react";

import MobileSidebar from "./sidebar/mobile";
import DesktopSidebar from "./sidebar/desktop";
import MobileNavbar from "./sidebar/navbar";
import Files from "./files";
import MainChats from "./mainChats";
import { useAppData } from "../hooks/appData";

export default function Dashboard() {
  const { chats } = useAppData();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatTitle = "Conversations";

  return (
    <div>
      {/* Sidebar */}
      <Fragment>
        <MobileSidebar
          chats={chats}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <DesktopSidebar chats={chats} />
        <MobileNavbar chatTitle={chatTitle} setSidebarOpen={setSidebarOpen} />
      </Fragment>

      {/* Main */}
      <div className="lg:ml-72 bg-stone-50 h-screen">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <MainChats />
            <Files />
          </div>
        </div>
      </div>
    </div>
  );
}
