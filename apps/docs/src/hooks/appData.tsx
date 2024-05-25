import { createContext, useContext } from "react";
import { IAppData } from "../types";
import { fetchChats } from "../queries";
import { useQuery } from "@tanstack/react-query";

export const initialAppData: IAppData = {
  conversations: [],
  chats: [],
  files: [],
  chatId: "",
};

export const AppDataContext = createContext<IAppData>(initialAppData);

export const AppDataProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
  });

  return (
    <AppDataContext.Provider
      value={{
        ...initialAppData,
        chats: data ?? [],
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = (): IAppData => {
  return useContext(AppDataContext);
};
