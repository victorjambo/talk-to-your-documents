import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

import router from "./src/routes";

const app: Express = express();
const port = process.env.SERVER_PORT || 4000;

dotenv.config();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api", router);
app.use("/health", (req: Request, res: Response) => {
  res.status(200).send("OK");
});
app.use("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Talk To Your Documents API" });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
