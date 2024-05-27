import { Dispatch, SetStateAction } from "react";
import { INavbarChats } from "./IChats";
import { IConversation } from "./IConversation";

export interface IAppData {
  conversations: IConversation[];
  chats: INavbarChats[];
  files: string[];
  setFiles: Dispatch<SetStateAction<string[]>>;
  chatId: string;
  setChatId: Dispatch<SetStateAction<string>>;
  isPendingFetchChats: boolean;
  errorFetchChats: Error | null;
  isPendingFetchConversations: boolean;
  errorFetchConversations: Error | null;
  setConversations: Dispatch<SetStateAction<IConversation[]>>;
  chatName: string;
  refetchChats: () => void;
}
