import { Chat } from ".prisma";

export interface IChatModel {
  createChat(data: { title: string; fileNames?: string[] }): Promise<Chat>;

  getChat(
    chatId: string,
    includeDocuments?: boolean,
    includeConversations?: boolean
  ): Promise<Chat>;

  getChats(
    includeDocuments?: boolean,
    includeConversations?: boolean
  ): Promise<Chat[]>;

  updateChat(
    chatId: string,
    data: Chat,
    includeDocuments?: boolean,
    includeConversations?: boolean
  ): Promise<Chat>;
}
