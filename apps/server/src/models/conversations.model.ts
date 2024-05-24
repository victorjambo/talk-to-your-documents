import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

import { PrismaClient, conversations } from ".prisma";
import type { IConversationsModel } from "../types";
import DatabaseManagement from "../helpers/database";

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
