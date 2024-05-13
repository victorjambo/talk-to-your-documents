import { Router } from "express";

import DocumentsController from "../controllers/documents.controller";

const documentsRouter = (): Router => {
  const documentsController = new DocumentsController();
  const router = Router();

  router.get("/", documentsController.queryDocuments); // search with query
  router.post("/create", documentsController.createDocument); // create embeddings and vectors

  return router;
};

const router: Router = Router();

router.use("/documents", documentsRouter());

export default router;
