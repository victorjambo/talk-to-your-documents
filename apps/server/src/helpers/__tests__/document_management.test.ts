import { describe, expect, test } from "@jest/globals";
import DocumentManagement from "../document_management";

describe("DocumentManagement", () => {
  test("splitText", async () => {
    const doc = "Hello World";
    const text = await DocumentManagement.splitText(doc);
    expect(text).toHaveLength(1);
    expect(text[0]).toBe(doc);
  });
});
