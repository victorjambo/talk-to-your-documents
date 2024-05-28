import DatabaseManagement from "../helpers/database";
import { PrismaClient, Prisma } from ".prisma";

class DocumentsModel extends DatabaseManagement {
  private static tableName = "Document";

  private static historyTableName = "conversations";

  constructor() {
    super(DocumentsModel.tableName, DocumentsModel.historyTableName);
  }

  public async createDocument(
    documentTexts: {
      hash: string;
      document: string[];
    }[],
    chatId: string
  ): Promise<void> {
    const vectorStore = this.createStore();

    try {
      const transaction = documentTexts.map(
        (documentText: { hash: string; document: string[] }) => {
          return documentText.document.map((content) => {
            return this.db.document.create({
              data: { content, chatId, hash: documentText.hash },
            });
          });
        }
      );

      await vectorStore.addModels(
        await this.db.$transaction(transaction.flatMap((doc) => doc))
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

  public async deleteFileByHashCode(
    hash: string
  ): Promise<Prisma.BatchPayload> {
    const prisma = new PrismaClient();

    const documents = await prisma.document.findMany({
      where: {
        hash,
      },
    });

    return prisma.document.deleteMany({
      where: {
        id: {
          in: documents.map((doc) => doc.id),
        },
      },
    });
  }
}

export default DocumentsModel;
