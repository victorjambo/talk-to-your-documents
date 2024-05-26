import React, { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

import Divider from "./divider";
import { createConversations } from "../queries";
import ChatBubbles from "./ChatBubbles";
import { useAppData } from "../hooks/appData";

const MainChats: React.FC = () => {
  const formRef = useRef<any>();

  const { chatId, setConversations, conversations } = useAppData();

  const { mutate } = useMutation({
    mutationFn: (query: string) =>
      createConversations({
        query,
        chatId,
      }),
    onMutate: (variables) => {
      const newConversation = [
        ...conversations,
        {
          id: conversations.length + 1,
          message: variables,
          session_id: chatId,
          createdAt: new Date(),
          sender: "human",
        },
      ];
      setConversations(newConversation);
      return variables;
    },
    onError: (error, variables, context) => {
      console.log("🚀 ~ Error while querying:", {error, variables, context});
    },
    onSuccess: (data, variables, context) => {
      const newConversation = [
        ...conversations,
        {
          id: conversations.length + 1,
          message: data.message,
          session_id: chatId,
          createdAt: new Date(),
          sender: "ai",
        },
      ];
      setConversations(newConversation);
    },
    onSettled: (data, error, variables, context) => {
      formRef.current?.reset();
    },
  });

  const handleSubmit = (data: FormData) => {
    const prompt = data.get("prompt");
    mutate(prompt as string);
  };

  return (
    <div className="relative bg-white shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg lg:col-span-2 p-4">
      <h2 className="font-thin">talk to your documents</h2>
      <Divider classNames="py-4" />
      <ChatBubbles />
      <Divider classNames="py-4" />

      {/* <TextArea /> */}
      <form className="relative" action={handleSubmit} ref={formRef}>
        <textarea
          rows={4}
          id="prompt"
          name="prompt"
          className="w-full p-3 rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
          placeholder={chatId ? "talk to your documents..." : "Start a conversation..."}
        />
        <div className="absolute right-0 bottom-0 flex justify-between m-4">
          <button
            type="submit"
            className="inline-flex space-x-1 items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
            <span>Ask</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainChats;
