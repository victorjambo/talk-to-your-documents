import React from "react";

import Divider from "./divider";
import ChatBubbles from "./ChatBubbles";
import TextArea from "./textarea";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const MainChats: React.FC = () => {
  return (
    <div className="relative bg-white shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg lg:col-span-2 p-4">
      <h2 className="text-base font-semibold leading-6 text-gray-900">Chats</h2>
      <Divider classNames="py-4" />
      <ChatBubbles />
      <Divider classNames="py-4" />

      {/* <TextArea /> */}
      <form className="relative ">
        <textarea
          rows={4}
          name="prompt"
          className="w-full p-3 rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
          placeholder="talk to your documents..."
        />
        <div className="absolute right-0 bottom-0 flex justify-between m-4">
          <button className="inline-flex space-x-1 items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
            <span>Ask</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainChats;
