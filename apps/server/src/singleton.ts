import { PrismaClient } from ".prisma";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import prisma from "./helpers/client";

jest.mock("./helpers/client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
