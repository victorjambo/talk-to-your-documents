import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import DatabaseManagement from "src/helpers/database";

class DocumentsModel extends DatabaseManagement {
  private static tableName = "Document";

  constructor() {
    super(DocumentsModel.tableName);
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

  public async chatWithHistory(
    inputPrompt: string,
    documents: string[]
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
        { configurable: { sessionId: "langchain-test-session" } }
      )
      .finally(() => callback());

    return response;
  }
}

export default DocumentsModel;
