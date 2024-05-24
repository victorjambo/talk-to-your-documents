import React from "react";
import ChatBubble from "./ChatBubble";

const messages = [
  {
    id: 1,
    message: "Hello, how can I help you today?",
    sender: "AI",
  },
  {
    id: 2,
    message: "I have a question about my order",
    sender: "You",
  },
  {
    id: 3,
    message: "Sure, what would you like to know?",
    sender: "AI",
  },
  {
    id: 4,
    message: "When will my order arrive?",
    sender: "You",
  },
  {
    id: 5,
    message: "Your order will arrive in 3-5 business days",
    sender: "AI",
  },
];

const ChatBubbles: React.FC = () => {
  return (
    <div className="pt-4">
      {messages.map((chat) => (
        <ChatBubble key={chat.id} chat={chat} />
      ))}
    </div>
  );
};

export default ChatBubbles;
