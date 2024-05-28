import { Request } from "express";

export interface IDeleteFileFromChatRequest extends Request {
  params: {
    chatId: string;
    hash: string;
  };
}
