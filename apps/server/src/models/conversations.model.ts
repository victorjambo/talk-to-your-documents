import { PrismaClient, conversations } from ".prisma";
import type { IConversationsModel } from "../types";

class ConversationsModel implements IConversationsModel {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getConversations(chatId: string): Promise<conversations[]> {
    return this.prisma.conversations.findMany({
      where: { session_id: chatId },
    });
  }
}

export default ConversationsModel;
