import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

import Divider from "./divider";
import { createConversations } from "../queries";
import ChatBubbles from "./ChatBubbles";
import { useAppData } from "../hooks/appData";

const MainChats: React.FC = () => {
  const { chatId, setConversations, conversations, chatName } = useAppData();

  const { mutate, isPending } = useMutation({
    mutationKey: ["createConversations"],
    mutationFn: (query: string) =>
      createConversations({
        query,
        chatId,
      }),
    onMutate: (variables) => {
      form.reset();
      const newConversation = [
        {
          id: conversations.length + 1,
          message: variables,
          session_id: chatId,
          createdAt: new Date(),
          sender: "human",
        },
        ...conversations,
      ];
      setConversations(newConversation);
      return variables;
    },
    onError: (error, variables, context) => {
      console.log("🚀 ~ Error while querying:", { error, variables, context });
    },
    onSuccess: (data, variables, context) => {
      const newConversation = [
        {
          id: conversations.length + 1,
          message: data.message,
          session_id: chatId,
          createdAt: new Date(),
          sender: "ai",
        },
        ...conversations,
      ];
      setConversations(newConversation);
    },
  });

  const form = useForm({
    defaultValues: {
      prompt: "",
    },
    onSubmit: async ({ value: { prompt } }) => {
      if (!chatId) {
        console.error("Chat ID is missing");
        return;
      }
      mutate(prompt);
    },
    validators: {
      onSubmit: ({ value }) =>
        value.prompt === "" ? "Ask a question first" : undefined,
    },
  });

  const formErrors = form.useStore((state) => state.errors);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <div className="relative bg-white shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg lg:col-span-2 p-4">
      <h2 className="font-thin">{chatName || "talk to your documents"}</h2>
      <Divider classNames="py-4" />
      <ChatBubbles />
      <Divider classNames="py-4" />

      {/* <TextArea /> */}
      <form className="relative" onSubmit={handleSubmit}>
        <form.Field
          name="prompt"
          children={(field) => (
            <div>
              <textarea
                rows={4}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={
                  chatId
                    ? "talk to your documents..."
                    : "Start a conversation..."
                }
                className={`relative w-full p-3 rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 ${field.state.meta.errors.length || formErrors.length ? "ring-rose-700" : ""}`}
              />
              {field.state.meta.errors.length ? (
                <span className="absolute left-2 -bottom-4 text-rose-700">
                  {field.state.meta.errors.join(", ")}
                </span>
              ) : null}
              {formErrors.length ? (
                <span className="absolute left-2 -bottom-4 text-rose-700">
                  {formErrors.join(", ")}
                </span>
              ) : null}
            </div>
          )}
          validators={{
            onSubmit: ({ value }) => {
              return value === "" ? "Ask a question first" : undefined;
            },
          }}
        />
        <div className="absolute right-0 bottom-0 flex justify-between m-4">
          <button
            disabled={isPending || !chatId}
            type="submit"
            className={`inline-flex space-x-1 items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${isPending || !chatId ? "opacity-75 cursor-not-allowed" : ""}`}
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
