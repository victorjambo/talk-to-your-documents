import { IConversation } from "./IConversation";

export interface IFilesMeta {
  hash: string;
  name: string;
  size: number;
  type: string;
}

export interface IChats {
  id: string;
  title: string;
  createdAt: string;
  conversations?: IConversation[];
  filesMeta: IFilesMeta[];
}

export interface INavbarChats extends IChats {
  href: string;
  initial: string;
}
