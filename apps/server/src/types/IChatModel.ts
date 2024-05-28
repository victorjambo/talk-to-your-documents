import { Chat } from ".prisma";

export interface IChatModel {
  createChat(data: { title: string; filesMeta?: string[] }): Promise<Chat>;

  getChat(chatId: string, includeConversations?: boolean): Promise<Chat>;

  getChats(includeConversations?: boolean): Promise<Chat[]>;

  updateChat(
    chatId: string,
    data: Chat,
    includeConversations?: boolean
  ): Promise<Chat>;
}
