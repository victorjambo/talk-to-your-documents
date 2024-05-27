import { Request } from "express";

export interface IUpdateChatRequest extends Request {
  body: { chatName: string; fileNames: string[] };
  params: {
    chatId: string;
  };
}
