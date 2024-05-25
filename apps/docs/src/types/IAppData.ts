import { INavbarChats } from "./IChats";
import { IConversation } from "./IConversation";

export interface IAppData {
  conversations: IConversation[];
  chats: INavbarChats[];
  files: string[];
  chatId: string;
}
