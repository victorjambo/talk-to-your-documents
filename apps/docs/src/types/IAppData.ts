import { Dispatch, SetStateAction } from "react";
import { IFilesMeta, INavbarChats } from "./IChats";
import { IConversation } from "./IConversation";

export interface IAppData {
  conversations: IConversation[];
  chats: INavbarChats[];
  files: IFilesMeta[];
  setFiles: Dispatch<SetStateAction<IFilesMeta[]>>;
  chatId: string;
  setChatId: Dispatch<SetStateAction<string>>;
  isPendingFetchChats: boolean;
  errorFetchChats: Error | null;
  isPendingFetchConversations: boolean;
  errorFetchConversations: Error | null;
  setConversations: Dispatch<SetStateAction<IConversation[]>>;
  chatName: string;
  setChatName: Dispatch<SetStateAction<string>>;
  refetchChats: () => void;
  refetchConversations: () => void;
}
