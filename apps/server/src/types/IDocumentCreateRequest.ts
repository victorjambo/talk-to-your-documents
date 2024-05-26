import { Request } from "express";

export interface IDocumentCreateRequest extends Request {
  body: {
    chatName: string | undefined;
    chatId: string | undefined;
  };
  files: Express.Multer.File[] | undefined;
}
