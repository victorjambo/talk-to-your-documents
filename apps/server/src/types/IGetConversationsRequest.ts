import { Request } from "express";

export interface IGetConversationsRequest extends Request {
  params: {
    chatId: string;
  };
}
