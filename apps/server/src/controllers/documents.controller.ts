import { Response } from "express";

import { Chat } from ".prisma";
import DocumentsModel from "../models/documents.model";
import DocumentLoaders from "../helpers/document_loaders";
import DocumentManagement from "../helpers/document_management";
import ChatModal from "../models/chat.model";
import type {
  IDocumentCreateRequest,
  IDocumentUpdateRequest,
  IDocumentsController,
} from "../types";

class DocumentsController implements IDocumentsController {
  public async createDocument(
    req: IDocumentCreateRequest,
    res: Response
  ): Promise<void> {
    try {
      const files = req.files;
      if (!files || !files.length) {
        res.status(400).json({
          error: "Files are required",
        });
        return;
      }

      let chat: Chat;
      const body = req.body;
      const chatId = body.chatId;
      const chatModal = new ChatModal();
      const fileNames = files.map((file) => file.originalname);

      if (chatId) {
        chat = await chatModal.getChat(chatId);
        chatModal.updateChat(chatId, {
          ...chat,
          fileNames: [...chat.fileNames, ...fileNames],
        });
      } else {
        const title = body.chatName ?? "Untitled";
        chat = await chatModal.createChat({ title, fileNames });
      }

      const documentLoader = new DocumentLoaders(files);
      const documents = await documentLoader.load();

      const texts = await Promise.all(
        documents.map((document) =>
          DocumentManagement.splitText(document.pageContent)
        )
      ).then((documentText) => documentText.flat());

      const model = new DocumentsModel();

      await model.createDocument(texts, chat.id);

      res.status(201).json({ chatId: chat.id });
    } catch (err) {
      console.log("🚀 ~ DocumentsController ~ createDocument ~ err:", err);
      res.status(500).json({
        error: err,
      });
    }
  }

  public async updateDocument(
    req: IDocumentUpdateRequest,
    res: Response
  ): Promise<void> {
    try {
      const files = req.files;
      const chatId = req.params.chatId;
      if (!files || !files.length || !chatId) {
        res.status(400).json({
          error: "Files are required and chatId is required",
        });
        return;
      }

      const chatModal = new ChatModal();
      const chat = await chatModal.getChat(chatId);

      const updatedChatData: Chat = {
        ...chat,
        fileNames: [
          ...new Set([
            ...chat.fileNames,
            ...files.map((file) => file.originalname),
          ]),
        ],
      };

      await chatModal.updateChat(chatId, updatedChatData);

      const documentLoader = new DocumentLoaders(files);
      const documents = await documentLoader.load();

      const texts = await Promise.all(
        documents.map((document) =>
          DocumentManagement.splitText(document.pageContent)
        )
      ).then((documentText) => documentText.flat());

      const model = new DocumentsModel();

      await model.createDocument(texts, chat.id);

      res.status(200).json({ chatId: chat.id });
    } catch (err) {
      console.log("🚀 ~ DocumentsController ~ createDocument ~ err:", err);
      res.status(500).json({
        error: err,
      });
    }
  }
}

export default DocumentsController;
