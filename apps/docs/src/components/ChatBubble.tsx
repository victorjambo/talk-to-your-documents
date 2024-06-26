import React from "react";
import { IConversation } from "../types";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

interface Props {
  chat: IConversation;
}

const ChatBubble: React.FC<Props> = ({ chat }) => {
  const isSender = chat.sender === "human";

  return (
    <div className={`flex flex-col mb-4 items-${isSender ? "end" : "start"}`}>
      <div
        className={`rounded-t-2xl p-2 ${
          isSender
            ? "self-end bg-sky-100 rounded-es-2xl"
            : "self-start bg-zinc-100 rounded-ee-2xl"
        }`}
      >
        <p className="text-gray-800">{chat.message}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
