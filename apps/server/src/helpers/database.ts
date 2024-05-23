import pg from "pg";
import {
  PrismaSqlFilter,
  PrismaVectorStore,
} from "@langchain/community/vectorstores/prisma";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PostgresChatMessageHistory } from "@langchain/community/stores/message/postgres";
import {
  Runnable,
  RunnableConfig,
  RunnableWithMessageHistory,
} from "@langchain/core/runnables";
import { PrismaClient, Prisma, Document } from ".prisma";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_LLM_MODEL = process.env.OPENAI_LLM_MODEL;
const DATABASE_URL = process.env.DATABASE_URL;

type TStore = PrismaVectorStore<
  Document,
  "Document",
  { [K in keyof Document]?: true },
  PrismaSqlFilter<Document>
>;

class DatabaseManagement {
  protected db: PrismaClient;

  protected tableName: string;

  constructor(tableName: string) {
    this.db = new PrismaClient();
    this.tableName = tableName;
  }

  protected createStore(): TStore {
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

  protected pool() {
    return new pg.Pool({
      connectionString: DATABASE_URL,
    });
  }

  protected async poolEnd(pool: pg.Pool) {
    await pool.end();
  }

  public async runnableMessageHistory(
    chain: Runnable<any, string, RunnableConfig>
  ): Promise<{
    history: RunnableWithMessageHistory<any, string>;
    callback: () => void;
  }> {
    const pool = this.pool();

    return {
      history: new RunnableWithMessageHistory({
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
      }),
      callback: () => this.poolEnd(pool),
    };
  }
}

export default DatabaseManagement;
