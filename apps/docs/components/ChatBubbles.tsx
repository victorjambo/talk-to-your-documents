import React from "react";
import ChatBubble from "./ChatBubble";

const messages = [
  {
    id: 1,
    message: "when did raila go to school",
    chatId: "clwl5m42n0000m8b7srj3mxth",
    sender: "human",
  },
  {
    id: 2,
    message:
      "Raila Odinga attended school in East Germany, where he earned a master's degree in mechanical engineering in 1970.",
    chatId: "clwl5m42n0000m8b7srj3mxth",
    sender: "ai",
  },
  {
    id: 3,
    message: "How old is raila",
    chatId: "clwl5m42n0000m8b7srj3mxth",
    sender: "human",
  },
  {
    id: 4,
    message:
      "Raila Odinga was born on January 7, 1945, so as of now, he is 77 years old.",
    chatId: "clwl5m42n0000m8b7srj3mxth",
    sender: "ai",
  },
];

const ChatBubbles: React.FC = () => {
  return (
    <div className="pt-4 max-h-[600px] overflow-scroll">
      {messages.map((chat) => (
        <ChatBubble key={chat.id} chat={chat} />
      ))}
    </div>
  );
};

export default ChatBubbles;
