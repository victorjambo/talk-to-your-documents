import { describe, expect, test } from "@jest/globals";
import { hashCode } from "../hashCode";

describe("hashCode", () => {
  test("Hash code is generated", async () => {
    const hash = hashCode("test");

    const int32 = parseInt(hash);

    // The hash code is a 32-bit signed integer.
    expect(int32).not.toBeNaN();
  });
});
