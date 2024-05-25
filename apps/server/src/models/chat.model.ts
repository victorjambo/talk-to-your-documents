import { PrismaClient, Chat } from ".prisma";
import type { IChatModel } from "../types";
import { extendConversations } from "../helpers/prisma_extend";

class ChatModel implements IChatModel {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createChat(data: {
    title: string;
    fileNames?: string[];
  }): Promise<Chat> {
    return this.prisma.chat.create({
      data,
    });
  }

  public async getChat(
    chatId: string,
    includeConversations: boolean = false
  ): Promise<Chat> {
    return this.prisma.chat.findFirstOrThrow({
      where: { id: chatId },
      include: {
        conversations: includeConversations,
      },
    });
  }

  public async getChats(
    includeConversations: boolean = false
  ): Promise<Chat[]> {
    const prisma = new PrismaClient().$extends(extendConversations);

    return prisma.chat.findMany({
      include: {
        conversations: includeConversations,
      },
    });
  }

  public async updateChat(
    chatId: string,
    data: Chat,
    includeConversations: boolean = false
  ): Promise<Chat> {
    return this.prisma.chat.update({
      where: { id: chatId },
      data,
      include: {
        conversations: includeConversations,
      },
    });
  }
}

export default ChatModel;
