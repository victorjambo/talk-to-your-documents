import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

class DocumentManagement {
  public static splitText(document: string): Promise<string[]> {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 80,
    });

    return splitter.splitText(document);
  }
}

export default DocumentManagement;
