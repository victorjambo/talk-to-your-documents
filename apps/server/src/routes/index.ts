import { Router } from "express";

import DatabaseManagement from "../helpers/database";

const sanityRouter = (): Router => {
  const router = Router();
  router.get("/", async (req, res) => {
    const db = new DatabaseManagement();

    const prompt = "What is the capital of Kenya?";

    const result = await db.getSimilarDocumentsFromStore(prompt);
    console.log("🚀 ~ router.get ~ result:", result);

    res.status(200).json({ status: "OK" });
  });
  return router;
};

const router: Router = Router();

router.use("/sanity", sanityRouter());

export default router;
