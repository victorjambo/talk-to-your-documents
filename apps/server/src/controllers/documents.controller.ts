import { Request, Response } from "express";
import DocumentsModel from "../models/documents.model";

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

      const searchResults = await this.documentsModel.getSimilarDocumentsFromStore(query);

      const message = await this.documentsModel.chatWithHistory(query, searchResults.map((doc) => doc.pageContent));

      res.status(200).json({ message });
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }
  }

  public async createDocument(req: Request, res: Response): Promise<void> {
    try {
      const document = req.body.document;
      
      const data = await this.documentsModel.createDocument(['']);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }
  }
}

export default DocumentsController;
