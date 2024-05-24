import { Request } from "express";

export interface IConversationsQueryRequest extends Request {
  body: {
    query: string | undefined;
    chatId: string | undefined;
  };
}
