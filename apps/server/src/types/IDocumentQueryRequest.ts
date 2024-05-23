import { Request } from "express";

export interface IDocumentQueryRequest extends Request {
  body: {
    query: string | undefined;
    chatId: string | undefined;
  };
}
