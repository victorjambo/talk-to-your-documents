import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { Document } from "@langchain/core/documents";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";

export enum SupportedFileTypes {
  txt = "text/plain",
  pdf = "application/pdf",
  docx = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}

type TBlob = { fieType: string; blob: Blob };
type TDocument = Document<Record<string, any>>;

class DocumentLoaders {
  private blobs: TBlob[];

  constructor(files: Express.Multer.File[]) {
    this.blobs = files.map((file) => ({
      fieType: file.mimetype,
      blob: new Blob([file.buffer]),
    }));
  }

  public async load(): Promise<TDocument[]> {
    return Promise.all(
      this.blobs.map(async ({ fieType, blob }) => {
        switch (fieType) {
          case SupportedFileTypes.txt:
            return this.textLoader(blob).load();
          case SupportedFileTypes.pdf:
            return this.pdfLoader(blob).load();
          case SupportedFileTypes.docx:
            return this.docxLoader(blob).load();
          default:
            throw new Error("Unsupported file type");
        }
      })
    ).then((docs) => docs.flatMap((doc) => doc));
  }

  private textLoader(blob: Blob) {
    return new TextLoader(blob);
  }

  private pdfLoader(blob: Blob) {
    return new PDFLoader(blob, {
      parsedItemSeparator: "",
    });
  }

  private docxLoader(blob: Blob) {
    return new DocxLoader(blob);
  }
}

export default DocumentLoaders;
