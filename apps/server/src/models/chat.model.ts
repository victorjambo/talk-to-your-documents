import { PrismaClient, Chat } from ".prisma";
import type { IChatModel } from "../types";
import { extendConversations } from "../helpers/prisma_extend";
import { JsonArray, JsonValue } from "@prisma/client/runtime/library";

class ChatModel implements IChatModel {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createChat(data: {
    title: string;
    filesMeta?: JsonArray;
  }): Promise<Chat> {
    return this.prisma.chat.create({
      data: {
        title: data.title,
        filesMeta: data.filesMeta ?? {},
      },
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
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  }

  public async updateChat(
    chatId: string,
    data: Chat,
    includeConversations: boolean = false
  ): Promise<Chat> {
    return this.prisma.chat.update({
      where: { id: chatId },
      data: {
        ...data,
        filesMeta: data.filesMeta ?? {},
      },
      include: {
        conversations: includeConversations,
      },
    });
  }

  public async deleteChat(chatId: string): Promise<Chat> {
    return this.prisma.chat.delete({
      where: { id: chatId },
    });
  }

  public async deleteFileFromChat(chatId: string, hash: string): Promise<Chat> {
    const chat = await this.getChat(chatId);

    let filesMeta = chat.filesMeta as JsonArray;

    filesMeta = filesMeta.filter((item: any) => item.hash !== hash);

    return this.prisma.chat.update({
      where: { id: chatId },
      data: {
        filesMeta,
      },
    });
  }
}

export default ChatModel;
