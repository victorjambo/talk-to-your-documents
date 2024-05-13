import { Request, Response } from "express";

import DocumentsModel from "../models/documents.model";
import DocumentLoaders from "../helpers/document_loaders";
import DocumentManagement from "../helpers/document_management";

class DocumentsController {
  private documentsModel: DocumentsModel;

  constructor() {
    this.documentsModel = new DocumentsModel();
  }

  public async queryDocuments(req: Request, res: Response): Promise<void> {
    try {
      const query = req.params.query;
      if (!query) {
        res.status(400).json({
          error: "Query parameter is required",
        });
        return;
      }

      const searchResults =
        await this.documentsModel.getSimilarDocumentsFromStore(query);

      const message = await this.documentsModel.chatWithHistory(
        query,
        searchResults.map((doc) => doc.pageContent)
      );

      res.status(200).json({ message });
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }
  }

  public async createDocument(req: Request, res: Response): Promise<void> {
    try {
      const files = req.files;
      if (!files || !files.length) {
        res.status(400).json({
          error: "Files are required",
        });
        return;
      }

      const documentLoader = new DocumentLoaders(
        files as Express.Multer.File[]
      );
      const documents = await documentLoader.load();

      const texts = await Promise.all(
        documents.map((document) =>
          DocumentManagement.splitText(document.pageContent)
        )
      ).then((documentText) => documentText.flat());

      
      const model = new DocumentsModel();
      
      await model.createDocument(texts);

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
