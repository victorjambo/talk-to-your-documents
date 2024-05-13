import React from "react";
import TextArea from "./text_area";
import Chats from "./chats";
import Header from "./header";

const MainChat: React.FC = () => {
  return (
    <div className="w-2/3 lg:w-5/6 h-full flex flex-col">
      <Header />
      <Chats />
      <TextArea />
    </div>
  )
};

export default MainChat;
