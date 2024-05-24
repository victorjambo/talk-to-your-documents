import { Response } from "express";

import ConversationsModel from "../models/conversations.model";
import type { IGetConversationsRequest } from "../types";

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
}

export default ConversationsController;
