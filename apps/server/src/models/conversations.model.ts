import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

import { PrismaClient } from ".prisma";
import type { IConversation, IConversationsModel } from "../types";
import DatabaseManagement from "../helpers/database";
import { extendConversations } from "../helpers/prisma_extend";
import prisma from "../helpers/client";

class ConversationsModel implements IConversationsModel {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  public async getConversations(chatId: string): Promise<IConversation[]> {
    const _prisma = prisma.$extends(extendConversations);

    return _prisma.conversations.findMany({
      where: { session_id: chatId },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  }

  public async chatWithHistory(
    inputPrompt: string,
    documents: string[],
    sessionId: string = "langchain-test-session"
  ): Promise<string> {
    const model = new ChatOpenAI();

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are a helpful assistant. Using the context Answer all questions to the best of your ability. Context: ${documents.join(
          "\n\n"
        )}`,
      ],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
    ]);

    const chain = prompt.pipe(model).pipe(new StringOutputParser());

    const db = new DatabaseManagement("Document", "conversations");

    const { history, callback } = await db.runnableMessageHistory(chain);

    const response = await history
      .invoke(
        {
          input: inputPrompt,
        },
        { configurable: { sessionId } }
      )
      .finally(() => callback());

    return response;
  }
}

export default ConversationsModel;
