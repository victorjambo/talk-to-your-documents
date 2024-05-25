import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { IAppData } from "../types";
import { fetchChats } from "../queries";

export const initialAppData: IAppData = {
  conversations: [],
  chats: [],
  files: [],
  setFiles: () => {},
  chatId: "",
  setChatId: () => {},
  isPendingChats: false,
  errorChats: null,
};

export const AppDataContext = createContext<IAppData>(initialAppData);

export const AppDataProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const {
    isPending: isPendingChats,
    error: errorChats,
    data: chats,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
  });

  const [chatId, setChatId] = useState<string>("");
  const [files, setFiles] = useState<string[]>([]);

  return (
    <AppDataContext.Provider
      value={{
        ...initialAppData,
        chats: chats ?? [],
        isPendingChats,
        errorChats,
        chatId,
        setChatId,
        files,
        setFiles,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = (): IAppData => {
  return useContext(AppDataContext);
};
