import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

import { classNames } from "../../utils/classNames";
import { INavbarChats } from "../../types";
import { useAppData } from "../../hooks/appData";

interface Props {
  chats: INavbarChats[];
}

const DesktopSidebar: React.FC<Props> = ({ chats }) => {
  const { setChatId } = useAppData();

  const handleNewChat = () => {
    // handle new chat
    // Open up pop up modal
  };

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <div className="flex h-16 shrink-0 items-center">
          <h1 className="text-xl font-bold text-indigo-600">
            talk to your documents
          </h1>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400 flex justify-between items-center">
                <span>Chats</span>
                <button onClick={handleNewChat}>
                  <PencilSquareIcon className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {chats.map((chat) => (
                  <li key={chat.title}>
                    <button
                      className={classNames(
                        chat.current
                          ? "bg-gray-50 text-indigo-600"
                          : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full"
                      )}
                      onClick={() => setChatId(chat.id)}
                    >
                      <span
                        className={classNames(
                          chat.current
                            ? "text-indigo-600 border-indigo-600"
                            : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                        )}
                      >
                        {chat.initial}
                      </span>
                      <span className="truncate">{chat.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
            <li className="-mx-6 mt-auto">
              <a
                href="#"
                className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
              >
                <img
                  className="h-8 w-8 rounded-full bg-gray-50"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span className="sr-only">Your profile</span>
                <span aria-hidden="true">Tom Cook</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DesktopSidebar;
