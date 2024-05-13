"use client"

import React, { useRef } from "react";
import Chat from "./chat";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

const chats = [
  {
    id: '1',
    message: 'hello ChatGPT',
    username: 'You',
    createdAt: '1715630822859'
  },
  {
    id: '2',
    message: 'hello how can i help you?',
    username: 'ChatGPT',
    createdAt: '1715630822860'
  }
]

const Chats: React.FC = () => {
  const ref = useRef(null);
  useSmoothScroll({ len: chats.length, ref });
  
  return (
    <section className="flex-1 h-full flex-col overflow-scroll">
      <div className="flex w-full">
        <div className="flex flex-col w-full">
          {chats.length ? (
            chats.map((chat) => <Chat key={chat.id} chat={chat} />)
          ) : (
            <div className="p-4">No Chats</div>
          )}
          <div ref={ref} />
        </div>
      </div>
    </section>
  )
};

export default Chats;
