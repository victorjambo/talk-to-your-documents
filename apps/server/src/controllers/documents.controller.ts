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
import { hashCode } from "../helpers/hashCode";
import { JsonArray } from "@prisma/client/runtime/library";

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

      const filesMeta = files.map((file) => ({
        name: file.originalname,
        size: file.size,
        type: file.mimetype,
        hash: hashCode(`${file.originalname}-${file.size}-${file.mimetype}`),
      })) as JsonArray;

      if (chatId) {
        chat = await chatModal.getChat(chatId);
        filesMeta.concat(chat.filesMeta);
        chatModal.updateChat(chatId, {
          ...chat,
          filesMeta,
        });
      } else {
        const title = body.chatName ?? "Untitled";
        chat = await chatModal.createChat({ title, filesMeta });
      }

      const documentLoader = new DocumentLoaders(files);
      const documents = await documentLoader.load();

      const documentTexts = await Promise.all(
        documents.map(async (docs) => {
          const document = await Promise.all(
            docs.document.map((document) =>
              DocumentManagement.splitText(document.pageContent)
            )
          ).then((documentText) => documentText.flat());

          return {
            hash: docs.hash,
            document: document,
          };
        })
      );

      const model = new DocumentsModel();

      await model.createDocument(documentTexts, chat.id);

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

      const filesMeta = files.map((file) => ({
        name: file.originalname,
        size: file.size,
        type: file.mimetype,
        hash: hashCode(`${file.originalname}-${file.size}-${file.mimetype}`),
      })) as JsonArray;
      filesMeta.concat(chat.filesMeta);

      const updatedChatData: Chat = {
        ...chat,
        filesMeta,
      };

      await chatModal.updateChat(chatId, updatedChatData);

      const documentLoader = new DocumentLoaders(files);
      const documents = await documentLoader.load();

      const documentTexts = await Promise.all(
        documents.map(async (docs) => {
          const document = await Promise.all(
            docs.document.map((document) =>
              DocumentManagement.splitText(document.pageContent)
            )
          ).then((documentText) => documentText.flat());

          return {
            hash: docs.hash,
            document: document,
          };
        })
      );

      const model = new DocumentsModel();

      await model.createDocument(documentTexts, chat.id);

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
