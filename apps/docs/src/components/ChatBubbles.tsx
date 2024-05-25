import React from "react";

import ChatBubble from "./ChatBubble";
import { IConversation } from "../types";
import { useAppData } from "../hooks/appData";

const ChatBubbles: React.FC = () => {
  const {
    chatId,
    conversations,
    isPendingFetchConversations,
    errorFetchConversations,
  } = useAppData();

  if (!chatId) return <div>Select a chat to view messages</div>;

  if (isPendingFetchConversations) return <div>Loading...</div>;

  if (errorFetchConversations)
    return <div>Error: {errorFetchConversations.message}</div>;

  return (
    <div className="pt-4 max-h-[600px] overflow-scroll">
      {conversations?.length &&
        conversations.map((conversation: IConversation) => (
          <ChatBubble key={conversation.id} chat={conversation} />
        ))}
    </div>
  );
};

export default ChatBubbles;
