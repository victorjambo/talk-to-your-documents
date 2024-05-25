import { Request } from "express";

export interface IGetChatsRequest extends Request {
  query: {
    conversations: string; // true | false
  };
}
