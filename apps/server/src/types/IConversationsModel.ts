import { IConversation } from "./IConversation";

export interface IConversationsModel {
  getConversations(chatId: string): Promise<IConversation[]>;
}
