"use client";
import React, { useState, useEffect, useRef } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

import { classNames } from "../../utils/classNames";
import { INavbarChats } from "../../types";
import { useAppData } from "../../hooks/appData";
import MenuOptions from "./MenuOptions";
import { useMutation } from "@tanstack/react-query";
import { createChat, updateChat } from "../../queries";
import StartNewChat from "../StartNewChat";

interface Props {
  chats: INavbarChats[];
}

const DesktopSidebar: React.FC<Props> = ({ chats }) => {
  const { chatId, setChatId, refetchChats, setChatName } = useAppData();

  const [selectedChat, setSelectedChat] = useState<INavbarChats | null>(null);
  const [openNewChat, setOpenNewChat] = useState<boolean>(false);

  const { mutate } = useMutation({
    mutationKey: ["updateChat"],
    mutationFn: () => {
      return updateChat(selectedChat?.id ?? "", {
        chatName: selectedChat?.title,
      });
    },
    onError: (error, variables, context) => {
      console.log("🚀 ~ Error while querying:", { error, variables, context });
    },
    onSuccess: () => {
      refetchChats();
      setSelectedChat(null);
    },
  });

  const handleNewChat = () => {
    setChatName("");
    setChatId("");
    setOpenNewChat(true);
  };

  const handleInputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      mutate();
    } else if (e.key === "Escape") {
      setSelectedChat(null);
    }
  };

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-72 lg:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <div className="flex h-16 shrink-0 items-center">
          <h1 className="text-xl font-bold text-indigo-600">AI</h1>
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
                <StartNewChat openNewChat={openNewChat} setOpenNewChat={setOpenNewChat} />
                {chats.map((chat) => (
                  <li key={chat.id} className="relative">
                    {selectedChat?.id === chat.id ? (
                      <form action={() => mutate()}>
                        <input
                          type="text"
                          className="border border-indigo-300 rounded-md w-full px-2 py-1"
                          value={selectedChat.title}
                          onKeyDown={handleInputOnKeyDown}
                          onChange={(e) =>
                            setSelectedChat({
                              ...selectedChat,
                              title: e.target.value,
                            })
                          }
                          onBlur={() => setSelectedChat(null)}
                          autoFocus
                        />
                      </form>
                    ) : (
                      <>
                        <button
                          className={classNames(
                            chat.id === chatId
                              ? "bg-gray-50 text-indigo-600"
                              : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full"
                          )}
                          onClick={() => setChatId(chat.id)}
                        >
                          <span
                            className={classNames(
                              chat.id === chatId
                                ? "text-indigo-600 border-indigo-600"
                                : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                            )}
                          >
                            {chat.initial}
                          </span>
                          <span className="truncate">{chat.title}</span>
                        </button>
                        <div className="absolute top-0 right-0 mr-1 mt-2">
                          <MenuOptions
                            chat={chat}
                            setSelectedChat={setSelectedChat}
                          />
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DesktopSidebar;
