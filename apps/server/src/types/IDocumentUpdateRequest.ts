import { Request } from "express";

export interface IDocumentUpdateRequest extends Request {
  files: Express.Multer.File[] | undefined;
  params: {
    chatId: string;
  };
}
