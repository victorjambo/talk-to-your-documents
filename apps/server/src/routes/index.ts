import { Router } from "express";

const sanityRouter = (): Router => {
  const router = Router();
  router.get("/", (req, res) => {
    res.status(200).json({ status: "OK" });
  });
  return router;
};

const router: Router = Router();

router.use("/sanity", sanityRouter());

export default router;
