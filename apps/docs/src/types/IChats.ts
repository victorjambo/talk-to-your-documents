import { IConversation } from "./IConversation";

export interface IChats {
  id: string;
  title: string;
  fileNames: string[];
  createdAt: string;
  conversations?: IConversation[];
}

export interface INavbarChats extends IChats {
  href: string;
  initial: string;
}
