import { Request } from "express";

export interface ICreateChatRequest extends Request {
  body: {
    chatName: string;
  };
}
