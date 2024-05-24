import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { Document } from "@langchain/core/documents";

import { SupportedFileTypes } from "./supported_file_types";

class DocumentLoaders {
  private blobs: { fieType: string; blob: Blob }[];

  constructor(files: Express.Multer.File[]) {
    this.blobs = files.map((file) => ({
      fieType: file.mimetype,
      blob: new Blob([file.buffer]),
    }));
  }

  public async load(): Promise<Document<Record<string, any>>[]> {
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
