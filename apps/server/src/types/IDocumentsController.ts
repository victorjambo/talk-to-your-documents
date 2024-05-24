import { Response } from "express";

import { IDocumentCreateRequest } from "./IDocumentCreateRequest";
import { IDocumentUpdateRequest } from "./IDocumentUpdateRequest";

export interface IDocumentsController {
  createDocument(req: IDocumentCreateRequest, res: Response): Promise<void>;

  updateDocument(req: IDocumentUpdateRequest, res: Response): Promise<void>;
}
