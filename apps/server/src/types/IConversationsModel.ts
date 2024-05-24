import { conversations } from ".prisma";

export interface IConversationsModel {
  getConversations(chatId: string): Promise<conversations[]>;
}
