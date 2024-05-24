import { Response } from "express";

import { IDocumentCreateRequest } from "./IDocumentCreateRequest";
import { IDocumentQueryRequest } from "./IDocumentQueryRequest";
import { IDocumentUpdateRequest } from "./IDocumentUpdateRequest";

export interface IDocumentsController {
  queryDocuments(req: IDocumentQueryRequest, res: Response): Promise<void>;

  createDocument(req: IDocumentCreateRequest, res: Response): Promise<void>;

  updateDocument(req: IDocumentUpdateRequest, res: Response): Promise<void>;
}
