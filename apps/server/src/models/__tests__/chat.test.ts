import { describe, expect, test } from "@jest/globals";
import { prismaMock } from "../../singleton";
import { JsonValue } from "@prisma/client/runtime/library";
import ChatModel from "../chat.model";

describe("Sanity Check", () => {
  test("Expect this to pass", () => {
    expect(true).toBe(true);
  });

  test("should create new chat ", async () => {
    const chat = {
      id: "cm0o67y020000s11d627scp7f",
      title: "New Chat",
      filesMeta: {} as JsonValue,
      createdAt: new Date(),
    };

    prismaMock.chat.create.mockResolvedValue(chat);

    const chatModel = new ChatModel();

    await expect(chatModel.createChat({ title: chat.title })).resolves.toEqual(chat);
  });
});
