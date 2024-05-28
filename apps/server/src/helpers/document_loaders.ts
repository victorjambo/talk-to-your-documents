import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { Document } from "@langchain/core/documents";

import { SupportedFileTypes } from "./supported_file_types";
import { hashCode } from "./hashCode";

class DocumentLoaders {
  private blobs: { fileType: string; blob: Blob; hash: string }[];

  constructor(files: Express.Multer.File[]) {
    this.blobs = files.map((file) => ({
      fileType: file.mimetype,
      blob: new Blob([file.buffer]),
      hash: hashCode(`${file.originalname}-${file.size}-${file.mimetype}`),
    }));
  }

  public async load(): Promise<
    { document: Document<Record<string, any>>[]; hash: string }[]
  > {
    return Promise.all(
      this.blobs.map(async ({ fileType, blob, hash }) => {
        switch (fileType) {
          case SupportedFileTypes.txt:
            return {
              document: await this.textLoader(blob).load(),
              hash,
            };
          case SupportedFileTypes.pdf:
            return {
              document: await this.pdfLoader(blob).load(),
              hash,
            };
          case SupportedFileTypes.docx:
            return {
              document: await this.docxLoader(blob).load(),
              hash,
            };
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
