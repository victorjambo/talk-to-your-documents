import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";

import router from "./src/routes";

const app: Express = express();
const port = process.env.SERVER_PORT || 4000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api", router);
app.use("/", (req, res) => {
  res.status(200).json({ message: "Talk To Your Documents API" });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
