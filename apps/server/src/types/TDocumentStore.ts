import {
  PrismaSqlFilter,
  PrismaVectorStore,
} from "@langchain/community/vectorstores/prisma";
import { Document } from ".prisma";

export type TDocumentStore = PrismaVectorStore<
  Document,
  "Document",
  { [K in keyof Document]?: true },
  PrismaSqlFilter<Document>
>;
