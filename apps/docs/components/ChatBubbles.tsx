import React from "react";
import { useQuery } from "@tanstack/react-query";

import ChatBubble from "./ChatBubble";
import { fetchConversations } from "../queries";
import { IConversation } from "../types";

const ChatBubbles: React.FC = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => fetchConversations("clwl5m42n0000m8b7srj3mxth"),
  });

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
