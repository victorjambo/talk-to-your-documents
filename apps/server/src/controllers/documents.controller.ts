import { Response } from "express";

import DocumentsModel from "../models/documents.model";
import DocumentLoaders from "../helpers/document_loaders";
import DocumentManagement from "../helpers/document_management";
import ChatModal from "../models/chat.model";
import { IDocumentQueryRequest, IDocumentCreateRequest } from "../types";

class DocumentsController {
  public async queryDocuments(
    req: IDocumentQueryRequest,
    res: Response
  ): Promise<void> {
    try {
      const query = req.body.query;
      if (!query) {
        res.status(400).json({
          error: "Query parameter is required",
        });
        return;
      }

      const model = new DocumentsModel();

      const searchResults = await model.getSimilarDocumentsFromStore(query);

      const message = await model.chatWithHistory(
        query,
        searchResults.map((doc) => doc.pageContent)
      );

      res.status(200).json({ message });
    } catch (err) {
      console.log("🚀 ~ DocumentsController ~ queryDocuments ~ err:", err);
      res.status(500).json({
        error: err,
      });
    }
  }

  public async createDocument(
    req: IDocumentCreateRequest,
    res: Response
  ): Promise<void> {
    try {
      const files = req.files;
      console.log("🚀 ~ DocumentsController ~ files:", files);
      if (!files || !files.length) {
        res.status(400).json({
          error: "Files are required",
        });
        return;
      }

      const body = req.body;
      const title = body.chatName ?? "Untitled Chat";
      const fileNames = files.map((file) => file.originalname);

      const chatModal = new ChatModal();
      const chat = await chatModal.createChat({ title, fileNames });

      const documentLoader = new DocumentLoaders(files);
      const documents = await documentLoader.load();

      const texts = await Promise.all(
        documents.map((document) =>
          DocumentManagement.splitText(document.pageContent)
        )
      ).then((documentText) => documentText.flat());

      const model = new DocumentsModel();

      await model.createDocument(texts, chat.id);

      res.status(201).json({ message: "OK" });
    } catch (err) {
      console.log("🚀 ~ DocumentsController ~ createDocument ~ err:", err);
      res.status(500).json({
        error: err,
      });
    }
  }
}

export default DocumentsController;
