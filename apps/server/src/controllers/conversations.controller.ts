import { Response } from "express";

import ConversationsModel from "../models/conversations.model";
import type { IConversationsQueryRequest, IGetConversationsRequest } from "../types";
import DocumentsModel from "../models/documents.model";

class ConversationsController {
  public async getConversations(
    req: IGetConversationsRequest,
    res: Response
  ): Promise<void> {
    try {
      const chatId = req.params.chatId;
      if (!chatId) {
        res.status(400).json({
          error: "chatId param is required",
        });
        return;
      }

      const conversationsModel = new ConversationsModel();
      const conversations = await conversationsModel.getConversations(chatId);

      res.status(200).json({ conversations });
    } catch (err) {
      console.log(
        "🚀 ~ ConversationsController ~ getConversations ~ err:",
        err
      );
      res.status(500).json({
        error: err,
      });
    }
  }

  public async query(
    req: IConversationsQueryRequest,
    res: Response
  ): Promise<void> {
    try {
      const query = req.body.query;
      const chatId = req.body.chatId;
      if (!query || !chatId) {
        res.status(400).json({
          error: "Query and chatId parameters are required",
        });
        return;
      }

      const documentModel = new DocumentsModel();

      const searchResults = await documentModel.getSimilarDocumentsFromStore(
        query,
        chatId
      );

      const conversationsModel = new ConversationsModel();
      const message = await conversationsModel.chatWithHistory(
        query,
        searchResults.map((doc) => doc.pageContent),
        chatId
      );

      res.status(200).json({ message });
    } catch (err) {
      console.log("🚀 ~ ConversationsController ~ query ~ err:", err);
      res.status(500).json({
        error: err,
      });
    }
  }
}

export default ConversationsController;
