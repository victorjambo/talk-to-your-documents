import { Request, Response } from "express";

import { ICreateChatRequest } from "./ICreateChatRequest";
import { IGetChatRequest } from "./IGetChatRequest";

export interface IChatsController {
  getChat(req: IGetChatRequest, res: Response): Promise<void>;

  createChat(req: ICreateChatRequest, res: Response): Promise<void>;

  getChats(req: Request, res: Response): Promise<void>;
}
