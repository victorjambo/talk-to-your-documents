import { Request } from "express";

export interface IGetChatRequest extends Request {
  params: {
    chatId: string;
  };
}
