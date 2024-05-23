import { Router, Request, Response } from "express";
import multer from "multer";

import DocumentsController from "../controllers/documents.controller";
import ChatsController from "../controllers/chats.controller";
import { IDocumentCreateRequest, IDocumentUpdateRequest } from "src/types";

const documentsRouter = (): Router => {
  const documentsController = new DocumentsController();
  const router = Router();
  const upload = multer();

  router.post("/", documentsController.queryDocuments); // search with query
  router.put(
    "/:chatId",
    upload.array("documents", 12),
    (req: Request, res: Response) =>
      documentsController.updateDocument(req as IDocumentUpdateRequest, res)
  ); // Add documents to a chat
  router.post(
    "/create",
    upload.array("documents", 12),
    (req: Request, res: Response) =>
      documentsController.createDocument(req as IDocumentCreateRequest, res)
  ); // create embeddings and vectors

  return router;
};

const chatsRouter = (): Router => {
  const documentsController = new ChatsController();
  const router = Router();

  router.post("/", documentsController.createChat);
  router.get("/", documentsController.getChats);
  router.get("/:chatId", documentsController.getChat);

  return router;
};

const router: Router = Router();

router.use("/documents", documentsRouter());
router.use("/chats", chatsRouter());

export default router;
