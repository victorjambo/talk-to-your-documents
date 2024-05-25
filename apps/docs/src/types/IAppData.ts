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
  isPendingChats: boolean;
  errorChats: Error | null;
  isPendingFetchConversations: boolean;
  errorFetchConversations: Error | null;
  setConversations: Dispatch<SetStateAction<IConversation[]>>;
}
