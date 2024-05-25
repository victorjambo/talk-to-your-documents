import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { IAppData, IConversation } from "../types";
import { fetchChat, fetchChats, fetchConversations } from "../queries";

export const initialAppData: IAppData = {
  conversations: [],
  chats: [],
  files: [],
  setFiles: () => {},
  chatId: "",
  setChatId: () => {},
  isPendingChats: false,
  errorChats: null,
  isPendingFetchConversations: false,
  errorFetchConversations: null,
  setConversations: () => {},
};

export const AppDataContext = createContext<IAppData>(initialAppData);

export const AppDataProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [chatId, setChatId] = useState<string>("");
  const [files, setFiles] = useState<string[]>([]);
  const [conversations, setConversations] = useState<IConversation[]>([]);

  const {
    isPending: isPendingChats,
    error: errorChats,
    data: chats,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
  });

  const {
    isPending: isPendingFetchConversations,
    error: errorFetchConversations,
    data: dataFetchConversations,
  } = useQuery({
    queryKey: ["conversations", chatId],
    queryFn: async () => {
      const chat = await fetchChat(chatId);

      setFiles(chat.chat.fileNames ?? null);

      return fetchConversations(chatId);
    },
    enabled: !!chatId,
  });

  useEffect(() => {
    setConversations(dataFetchConversations?.conversations ?? []);
  }, [dataFetchConversations?.conversations]);

  return (
    <AppDataContext.Provider
      value={{
        ...initialAppData,
        chats: chats ?? [],
        conversations,
        isPendingChats,
        errorChats,
        chatId,
        setChatId,
        files,
        setFiles,
        isPendingFetchConversations,
        errorFetchConversations,
        setConversations
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = (): IAppData => {
  return useContext(AppDataContext);
};
