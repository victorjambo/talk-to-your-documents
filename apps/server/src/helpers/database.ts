import pg from "pg";
import { PrismaVectorStore } from "@langchain/community/vectorstores/prisma";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PostgresChatMessageHistory } from "@langchain/community/stores/message/postgres";
import {
  Runnable,
  RunnableConfig,
  RunnableWithMessageHistory,
} from "@langchain/core/runnables";

import { PrismaClient, Prisma, Document } from ".prisma";
import type { TDocumentStore } from "../types";
import prisma from "./client";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_LLM_MODEL = process.env.OPENAI_LLM_MODEL;
const DATABASE_URL = process.env.DATABASE_URL;

class DatabaseManagement {
  protected db: PrismaClient;

  protected tableName: string;

  protected historyTableName: string;

  constructor(tableName: string, historyTableName?: string) {
    this.db = prisma;
    this.tableName = tableName;
    this.historyTableName = historyTableName ?? "conversations";
  }

  protected createStore(): TDocumentStore {
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

  protected pool(): pg.Pool {
    return new pg.Pool({
      connectionString: DATABASE_URL,
    });
  }

  protected async poolEnd(pool: pg.Pool): Promise<void> {
    await pool.end();
  }

  public async runnableMessageHistory(
    chain: Runnable<any, string, RunnableConfig>
  ): Promise<{
    history: RunnableWithMessageHistory<any, string>;
    callback: () => void;
  }> {
    const pool = this.pool();

    const history = async (
      sessionId: string
    ): Promise<PostgresChatMessageHistory> => {
      const chatHistory = new PostgresChatMessageHistory({
        sessionId,
        pool,
        tableName: this.historyTableName,
      });
      return chatHistory;
    };

    return {
      history: new RunnableWithMessageHistory({
        runnable: chain,
        getMessageHistory: history,
        inputMessagesKey: "input",
        historyMessagesKey: "chat_history",
      }),
      callback: () => this.poolEnd(pool),
    };
  }
}

export default DatabaseManagement;
