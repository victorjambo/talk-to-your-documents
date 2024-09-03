import { Readable } from "node:stream";
import DocumentLoaders from "../document_loaders";

export const file: Express.Multer.File = {
  fieldname: "file",
  originalname: "test.txt",
  encoding: "7bit",
  mimetype: "text/plain",
  size: 1000,
  stream: new Readable(),
  destination: "",
  filename: "test.txt",
  path: "test.txt",
  buffer: Buffer.from(""),
};

export const loadFiles = (files: Express.Multer.File[]) => {
  const documentLoader = new DocumentLoaders(files);
  return documentLoader.load();
};
