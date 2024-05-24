import { PrismaClient, Chat } from ".prisma";
import type { IChatModel } from "../types";

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
    includeDocuments: boolean = false
  ): Promise<Chat> {
    return this.prisma.chat.findFirstOrThrow({
      where: { id: chatId },
      include: {
        documents: includeDocuments,
      },
    });
  }

  public async getChats(includeDocuments: boolean = false): Promise<Chat[]> {
    return this.prisma.chat.findMany({
      include: {
        documents: includeDocuments,
      },
    });
  }

  public async updateChat(
    chatId: string,
    data: Chat,
    includeDocuments: boolean = false
  ): Promise<Chat> {
    return this.prisma.chat.update({
      where: { id: chatId },
      data,
      include: {
        documents: includeDocuments,
      },
    });
  }
}

export default ChatModel;
