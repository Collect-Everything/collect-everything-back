import { describe, test, expect } from "vitest";
import { generateRandomString } from "./string";

describe("string utils", () => {
  describe("generateRandomString", () => {
    test("should return a random string of the given length", () => {
      const result = generateRandomString(10);

      expect(result.length).toBe(10);
    });
  });
});
