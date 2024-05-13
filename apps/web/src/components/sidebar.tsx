import React from "react";
import { PencilSquareIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const chats = [
  {
    title: "Raila Odinga",
    documents: ["file.txt", "file2.txt", "file3.txt"],
  },
  {
    title: "JF Kennedy",
    documents: ["file.txt", "file2.txt", "file3.txt"],
  },
  {
    title: "Nelson Mandela",
    documents: ["file.txt", "file2.txt", "file3.txt"],
  },
];

const Sidebar: React.FC = () => {
  return (
    <nav className="w-1/3 lg:w-1/6 border-r flex flex-col">
      <div className="flex text-xl border-b py-4">
        <span className="px-4">Chats</span>
      </div>
      <div className="flex-1 py-4">
        <button className="text-lg px-4 mb-3 flex justify-between w-full items-center hover:bg-slate-100 rounded-md py-2">
          <span>new chat</span>
          <PencilSquareIcon className="w-5 h-5 text-slate-500 hover:text-slate-600" />
        </button>
        <ul>
          {chats.map((chat) => (
            <li key={chat.title} className="">
              <button className="flex flex-row space-x-0.5 items-center hover:bg-slate-100 px-4 py-2 w-full">
                <ChevronRightIcon className="w-4 h-4 rotate-90" />
                <span>{chat.title}</span>
              </button>
              <ul className="pl-10 -mt-1">
                {chat.documents.map((document) => (
                  <li key={document}>{document}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
