import { useIsMutating } from "@tanstack/react-query";
import React from "react";

const LoadingChatBubble: React.FC = () => {
  const isMutatingConversations = useIsMutating({
    mutationKey: ["createConversations"],
  });

  if (isMutatingConversations === 0) return null;

  return (
    <div className="flex flex-col mb-4 items-start">
      <div className="rounded-t-2xl p-2 self-start bg-zinc-100 rounded-ee-2xl">
        <div className="flex space-x-2 justify-center items-center py-2.5 pr-2">
          <span className="sr-only">Loading...</span>
          <div className="h-1.5 w-1.5 bg-indigo-700 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-1.5 w-1.5 bg-indigo-700 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-1.5 w-1.5 bg-indigo-700 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingChatBubble;
