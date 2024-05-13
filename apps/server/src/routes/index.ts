import { Router } from "express";
import multer from "multer";

import DocumentsController from "../controllers/documents.controller";

const documentsRouter = (): Router => {
  const documentsController = new DocumentsController();
  const router = Router();
  const upload = multer();

  router.get("/", documentsController.queryDocuments); // search with query
  router.post("/create", upload.array('documents', 12), documentsController.createDocument); // create embeddings and vectors

  return router;
};

const router: Router = Router();

router.use("/documents", documentsRouter());

export default router;
