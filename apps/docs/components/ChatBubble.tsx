import React from "react";

interface Props {
  chat: {
    id: number;
    message: string;
    sender: string;
  };
}

const ChatBubble: React.FC<Props> = ({ chat }) => {
  const isSender = chat.sender === "You";

  return (
    <div className={`flex flex-col mb-4 items-${isSender ? "end" : "start"}`}>
      <div
        className={`rounded-2xl p-2 ${
          isSender ? "self-end bg-sky-100" : "self-start bg-zinc-100"
        }`}
      >
        <p className="text-gray-800">{chat.message}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
