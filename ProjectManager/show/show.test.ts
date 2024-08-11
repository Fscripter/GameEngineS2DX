import { describe, expect, test } from "@jest/globals";
import { showDir } from "./main";

describe("Show Dir Module", () => {
  test("Print the dir", () => {
    expect(showDir("newfiles")).toMatchObject({});
  });
});
