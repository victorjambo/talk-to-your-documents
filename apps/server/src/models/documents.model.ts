import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

import DatabaseManagement from "../helpers/database";

class DocumentsModel extends DatabaseManagement {
  private static tableName = "Document";

  private static historyTableName = "chat_history";

  constructor() {
    super(DocumentsModel.tableName, DocumentsModel.historyTableName);
  }

  public async createDocument(texts: string[], chatId: string): Promise<void> {
    const vectorStore = this.createStore();

    try {
      await vectorStore.addModels(
        await this.db.$transaction(
          texts.map((content) =>
            this.db.document.create({ data: { content, chatId } })
          )
        )
      );
    } catch (error) {
      throw new Error(`Error creating document: ${error}`);
    }
  }

  public async getSimilarDocumentsFromStore(query: string, chatId: string) {
    const vectorStore = this.createStore();

    return vectorStore.similaritySearch(query, undefined, {
      chatId: { equals: chatId },
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

    const { history, callback } = await this.runnableMessageHistory(chain);

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

export default DocumentsModel;
