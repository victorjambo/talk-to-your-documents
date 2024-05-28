import { Response } from "express";

import ChatModel from "../models/chat.model";
import type {
  IGetChatRequest,
  ICreateChatRequest,
  IChatsController,
  IGetChatsRequest,
  IUpdateChatRequest,
  IDeleteFileFromChatRequest,
} from "../types";
import DocumentsModel from "../models/documents.model";

class ChatsController implements IChatsController {
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

  public async getChats(req: IGetChatsRequest, res: Response): Promise<void> {
    try {
      const includeConversations = Boolean(req.query.conversations);

      const chatModel = new ChatModel();
      const chats = await chatModel.getChats(includeConversations);

      res.status(200).json({ chats });
    } catch (err) {
      console.log("🚀 ~ ChatsController ~ getChats ~ err:", err);
      res.status(500).json({
        error: err,
      });
    }
  }

  public async updateChat(
    req: IUpdateChatRequest,
    res: Response
  ): Promise<void> {
    try {
      const title = req.body.chatName;
      const fileNames = req.body.fileNames;
      const chatId = req.params.chatId;

      if (!chatId && (!title || !fileNames)) {
        res.status(400).json({
          error: "either chatId, chatName or fileNames are required field",
        });
        return;
      }

      const chatModel = new ChatModel();
      const chat = await chatModel.getChat(chatId);

      const updatedChat = await chatModel.updateChat(chatId, {
        ...chat,
        title,
        // fileNames, TODO
      });

      res.status(200).json({ chat: updatedChat });
    } catch (err) {
      console.log("🚀 ~ ChatsController ~ getChat ~ err:", err);
      res.status(500).json({
        error: err,
      });
    }
  }

  public async deleteChat(req: IGetChatRequest, res: Response): Promise<void> {
    try {
      const chatId = req.params.chatId;
      if (!chatId) {
        res.status(400).json({
          error: "chatId param is required",
        });
        return;
      }

      const chatModel = new ChatModel();
      const chat = await chatModel.deleteChat(chatId);

      res.status(200).json({ chat });
    } catch (err) {
      console.log("🚀 ~ ChatsController ~ getChat ~ err:", err);
      res.status(500).json({
        error: err,
      });
    }
  }

  public async deleteFileFromChat(req: IDeleteFileFromChatRequest, res: Response): Promise<void> {
    try {
      const chatId = req.params.chatId;
      const hash = req.params.hash;
      if (!chatId && !hash) {
        res.status(400).json({
          error: "chatId and hash param are required",
        });
        return;
      }

      const chatModel = new ChatModel();
      const chat = await chatModel.deleteFileFromChat(chatId, hash);

      const documentModel = new DocumentsModel();
      const document = await documentModel.deleteFileByHashCode(hash);

      res.status(200).json({ chat, count: document.count });
    } catch (err) {
      console.log("🚀 ~ ChatsController ~ getChat ~ err:", err);
      res.status(500).json({
        error: err,
      });
    }
  }

}

export default ChatsController;
