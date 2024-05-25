import { Router, Request, Response } from "express";
import multer from "multer";

import DocumentsController from "../controllers/documents.controller";
import ChatsController from "../controllers/chats.controller";
import type { IDocumentCreateRequest, IDocumentUpdateRequest } from "../types";
import ConversationsController from "../controllers/conversations.controller";

const documentsRouter = (): Router => {
  const documentsController = new DocumentsController();
  const router = Router();
  const upload = multer();

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

const conversationsRouter = (): Router => {
  const conversationsController = new ConversationsController();
  const router = Router();

  router.post("/", conversationsController.query); // search with query
  router.get("/:chatId", conversationsController.getConversations);

  return router;
};

const router: Router = Router();

router.use("/documents", documentsRouter());
router.use("/chats", chatsRouter());
router.use("/conversations", conversationsRouter());

export default router;
