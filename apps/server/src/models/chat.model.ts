import { JsonObject } from "@prisma/client/runtime/library";

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
    includeDocuments: boolean = false,
    includeConversations: boolean = false
  ): Promise<Chat> {
    return this.prisma.chat.findFirstOrThrow({
      where: { id: chatId },
      include: {
        documents: includeDocuments,
        conversations: includeConversations,
      },
    });
  }

  public async getChats(
    includeDocuments: boolean = false,
    includeConversations: boolean = false
  ): Promise<Chat[]> {
    const prisma = new PrismaClient().$extends({
      result: {
        conversations: {
          sender: {
            needs: { message: true },
            compute(conversations) {
              return (conversations.message as JsonObject).type as string;
            },
          },
          message: {
            needs: { message: true },
            compute(conversations) {
              return (conversations.message as JsonObject).content as string;
            },
          },
        },
      },
    });

    return prisma.chat.findMany({
      include: {
        documents: includeDocuments,
        conversations: includeConversations,
      },
    });
  }

  public async updateChat(
    chatId: string,
    data: Chat,
    includeDocuments: boolean = false,
    includeConversations: boolean = false
  ): Promise<Chat> {
    return this.prisma.chat.update({
      where: { id: chatId },
      data,
      include: {
        documents: includeDocuments,
        conversations: includeConversations,
      },
    });
  }
}

export default ChatModel;
