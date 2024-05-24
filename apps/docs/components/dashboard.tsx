"use client";
import { Fragment, useState } from "react";
import MobileSidebar from "./sidebar/mobile";
import DesktopSidebar from "./sidebar/desktop";
import MobileNavbar from "./sidebar/navbar";

const chats = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Presidents", href: "#", initial: "W", current: false },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatTitle = "Presidents";

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

      <main className="lg:pl-72 bg-[#f8f8f8] h-screen">
        <div className="xl:pr-96">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            {/* Main area */}
          </div>
        </div>
      </main>

      <aside className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        {/* Secondary column (hidden on smaller screens) */}
      </aside>
    </div>
  );
}
