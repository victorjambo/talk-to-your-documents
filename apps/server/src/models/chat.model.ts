import { PrismaClient, Chat } from ".prisma";

class ChatModel {
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
}

export default ChatModel;
