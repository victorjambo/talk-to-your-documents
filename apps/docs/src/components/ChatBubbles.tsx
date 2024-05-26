import React from "react";

import ChatBubble from "./ChatBubble";
import { IConversation } from "../types";
import { useAppData } from "../hooks/appData";
import { FaceSmileIcon } from "@heroicons/react/24/outline";

const ChatBubbles: React.FC = () => {
  const {
    chatId,
    conversations,
    isPendingFetchConversations,
    errorFetchConversations,
  } = useAppData();

  if (!chatId) return <FaceSmileIcon className="h-20 w-20 mx-auto" />;

  if (isPendingFetchConversations) return <div>Loading...</div>;

  if (errorFetchConversations)
    return <div>Error: {errorFetchConversations.message}</div>;

  return (
    <div className="pt-4 max-h-[600px] overflow-scroll">
      {conversations?.length ? (
        conversations.map((conversation: IConversation) => (
          <ChatBubble key={conversation.id} chat={conversation} />
        ))
      ) : (
        <FaceSmileIcon className="h-20 w-20 mx-auto" />
      )}
    </div>
  );
};

export default ChatBubbles;
