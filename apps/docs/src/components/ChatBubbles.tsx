import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import ChatBubble from "./ChatBubble";
import { fetchChat, fetchConversations } from "../queries";
import { IConversation } from "../types";
import { useAppData } from "../hooks/appData";

const ChatBubbles: React.FC = () => {
  const { chatId, setFiles } = useAppData();

  const { isPending, error, data } = useQuery({
    queryKey: ["conversations", chatId],
    queryFn: async () => {
      const chat = await fetchChat(chatId);

      setFiles(chat.chat.fileNames ?? null);

      return fetchConversations(chatId);
    },
    enabled: !!chatId,
  });

  if (!chatId) return <div>Select a chat to view messages</div>;

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="pt-4 max-h-[600px] overflow-scroll">
      {data?.conversations?.length &&
        data?.conversations.map((conversation: IConversation) => (
          <ChatBubble key={conversation.id} chat={conversation} />
        ))}
    </div>
  );
};

export default ChatBubbles;
