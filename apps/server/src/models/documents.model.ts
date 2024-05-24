import DatabaseManagement from "../helpers/database";

class DocumentsModel extends DatabaseManagement {
  private static tableName = "Document";

  private static historyTableName = "conversations";

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
}

export default DocumentsModel;
