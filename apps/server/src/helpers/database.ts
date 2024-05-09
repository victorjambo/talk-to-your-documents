import pg from "pg";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { PrismaVectorStore } from "@langchain/community/vectorstores/prisma";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { PrismaClient, Prisma, Document } from "@prisma/client";
import { PostgresChatMessageHistory } from "@langchain/community/stores/message/postgres";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_LLM_MODEL = process.env.OPENAI_LLM_MODEL;

class DatabaseManagement {
  private db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  public async createDocument(texts: string[]) {
    const vectorStore = this.createStore();

    await vectorStore.addModels(
      await this.db.$transaction(
        texts.map((content) => this.db.document.create({ data: { content } }))
      )
    );
  }

  public async getSimilarDocumentsFromStore(query: string) {
    const vectorStore = this.createStore();

    return vectorStore.similaritySearch(query);
  }

  private createStore() {
    return PrismaVectorStore.withModel<Document>(this.db).create(
      new OpenAIEmbeddings({
        apiKey: OPENAI_API_KEY,
        model: OPENAI_LLM_MODEL,
        dimensions: 1024,
      }),
      {
        prisma: Prisma,
        tableName: "Document",
        vectorColumnName: "vector",
        columns: {
          id: PrismaVectorStore.IdColumn,
          content: PrismaVectorStore.ContentColumn,
        },
      }
    );
  }

  /**
   * chat
   */
  public async chatWithHistory(inputPrompt: string, documents: string[]) {
    const pool = this.pool();

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

    const chainWithHistory = new RunnableWithMessageHistory({
      runnable: chain,
      inputMessagesKey: "input",
      historyMessagesKey: "chat_history",
      getMessageHistory: async (sessionId) => {
        const chatHistory = new PostgresChatMessageHistory({
          sessionId,
          pool,
          // Can also pass `poolConfig` to initialize the pool internally,
          // but easier to call `.end()` at the end later.
        });
        return chatHistory;
      },
    });

    const response = await chainWithHistory
      .invoke(
        {
          input: inputPrompt,
        },
        { configurable: { sessionId: "langchain-test-session" } }
      )
      .finally(() => this.poolEnd(pool));

    return response;
  }

  private pool() {
    return new pg.Pool({
      host: "127.0.0.1",
      port: 5432,
      user: "postgres",
      password: "password",
      database: "vectors",
    });
  }

  private async poolEnd(pool: pg.Pool) {
    await pool.end();
  }
}

export default DatabaseManagement;
