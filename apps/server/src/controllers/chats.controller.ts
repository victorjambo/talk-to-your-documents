import { Request, Response } from "express";

import ChatModel from "../models/chat.model";
import { IGetChatRequest, ICreateChatRequest } from "../types";

class ChatsController {
  public async getChat(req: IGetChatRequest, res: Response): Promise<void> {
    try {
      const chatId = req.params.chatId;
      if (!chatId) {
        res.status(400).json({
          error: "chatId param is required",
        });
        return;
      }

      const chatModel = new ChatModel();
      const chat = await chatModel.getChat(chatId);

      res.status(200).json({ chat });
    } catch (err) {
      console.log("🚀 ~ ChatsController ~ getChat ~ err:", err);
      res.status(500).json({
        error: err,
      });
    }
  }

  public async createChat(
    req: ICreateChatRequest,
    res: Response
  ): Promise<void> {
    try {
      const title = req.body.chatName;
      if (!title) {
        res.status(400).json({
          error: "chatName is a required field",
        });
        return;
      }

      const chatModel = new ChatModel();
      const chat = await chatModel.createChat({ title });

      res.status(201).json({ chat });
    } catch (err) {
      console.log("🚀 ~ ChatsController ~ getChat ~ err:", err);
      res.status(500).json({
        error: err,
      });
    }
  }

  public async getChats(req: Request, res: Response): Promise<void> {
    try {
      const chatModel = new ChatModel();
      const chats = await chatModel.getChats();

      res.status(200).json({ chats });
    } catch (err) {
      console.log("🚀 ~ ChatsController ~ getChats ~ err:", err);
      res.status(500).json({
        error: err,
      });
    }
  }
}

export default ChatsController;
