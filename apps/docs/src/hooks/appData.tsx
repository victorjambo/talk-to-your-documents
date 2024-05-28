import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { IAppData, IConversation, IFilesMeta } from "../types";
import { fetchChat, fetchChats, fetchConversations } from "../queries";

export const initialAppData: IAppData = {
  conversations: [],
  chats: [],
  files: [],
  setFiles: () => {},
  chatId: "",
  setChatId: () => {},
  isPendingFetchChats: false,
  errorFetchChats: null,
  isPendingFetchConversations: false,
  errorFetchConversations: null,
  setConversations: () => {},
  chatName: "",
  setChatName: () => {},
  refetchChats: () => {},
  refetchConversations: () => {},
};

export const AppDataContext = createContext<IAppData>(initialAppData);

export const AppDataProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [chatId, setChatId] = useState<string>("");
  const [chatName, setChatName] = useState<string>("");
  const [files, setFiles] = useState<IFilesMeta[]>([]);
  const [conversations, setConversations] = useState<IConversation[]>([]);

  const {
    isPending: isPendingFetchChats,
    error: errorFetchChats,
    data: chats,
    refetch: refetchChats,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
  });

  const {
    isPending: isPendingFetchConversations,
    error: errorFetchConversations,
    data: dataFetchConversations,
    refetch: refetchConversations,
  } = useQuery({
    queryKey: ["conversations", chatId],
    queryFn: async () => {
      const chat = await fetchChat(chatId);
      setFiles(chat.chat.filesMeta ?? null);

      return fetchConversations(chatId);
    },
    enabled: !!chatId,
  });

  useEffect(() => {
    setConversations(dataFetchConversations?.conversations ?? []);
  }, [dataFetchConversations?.conversations]);

  useEffect(() => {
    if (chatId) {
      const title = chats?.find((chat) => chat.id === chatId)?.title;
      setChatName(title ?? "");
    }
  }, [chatId]);

  return (
    <AppDataContext.Provider
      value={{
        ...initialAppData,
        chats: chats ?? [],
        conversations,
        isPendingFetchChats,
        errorFetchChats,
        chatId,
        setChatId,
        files,
        setFiles,
        isPendingFetchConversations,
        errorFetchConversations,
        setConversations,
        chatName,
        setChatName,
        refetchChats,
        refetchConversations
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = (): IAppData => {
  return useContext(AppDataContext);
};
