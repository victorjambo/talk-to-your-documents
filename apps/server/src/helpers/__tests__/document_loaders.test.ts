import { describe, expect, test } from "@jest/globals";
import { file, loadFiles } from "./helpers";
import { SupportedFileTypes } from "../supported_file_types";

describe("DocumentLoaders", () => {
  test("Load .txt files", async () => {
    const files: Express.Multer.File[] = [
      {
        ...file,
        originalname: "test.txt",
        mimetype: SupportedFileTypes.txt,
        filename: "test.txt",
        path: "test.txt",
      },
    ];

    const documents = await loadFiles(files);

    expect(documents).toHaveLength(files.length);
  });

  xtest("Load .pdf files", async () => {
    const files: Express.Multer.File[] = [
      {
        ...file,
        originalname: "test.pdf",
        mimetype: SupportedFileTypes.pdf,
        filename: "test.pdf",
        path: "test.pdf",
      },
    ];

    const documents = await loadFiles(files);

    expect(documents).toHaveLength(files.length);
  });

  xtest("Load .docx files", async () => {
    const files: Express.Multer.File[] = [
      {
        ...file,
        originalname: "test.docx",
        mimetype: SupportedFileTypes.docx,
        filename: "test.docx",
        path: "test.docx",
      },
    ];

    const documents = await loadFiles(files);

    expect(documents).toHaveLength(files.length);
  });

  test("Throw Error on Unsupported file types", async () => {
    const files: Express.Multer.File[] = [
      {
        ...file,
        originalname: "test.png",
        mimetype: "image/png",
        filename: "test.png",
        path: "test.png",
      },
    ];

    try {
      await loadFiles(files);

      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.message).toBe("Unsupported file type");
    }
  });
});
