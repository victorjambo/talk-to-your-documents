import React from "react";

import Divider from "./divider";
import ChatBubbles from "./ChatBubbles";

const MainChats: React.FC = () => {
  return (
    <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg lg:col-span-2 p-4">
      <h2 className="text-base font-semibold leading-6 text-gray-900">Chats</h2>
      <Divider classNames="py-4" />
      <ChatBubbles />
    </div>
  );
};

export default MainChats;
