import { describe, expect, it } from "vite-plus/test";
import { formatCode } from "./format-code";

describe("formatCode", () => {
  it.each([
    ["json", '{"a":1,"b":[1,2]}', '{ "a": 1, "b": [1, 2] }\n'],
    ["typescript", "const a:number=1", "const a: number = 1;\n"],
    ["css", "a{color:red}", "a {\n  color: red;\n}\n"],
    ["html", "<div><p>hi</p></div>", "<div><p>hi</p></div>\n"],
    ["yaml", "a:   1\nb:    2", "a: 1\nb: 2\n"],
  ])("formats %s", async (_, input, expected) => {
    expect(await formatCode(input)).toEqual({ text: expected, status: "formatted" });
  });

  it("cleans whitespace when no parser succeeds", async () => {
    expect(await formatCode("hello world  \r\n\n\n\n\nbye {")).toEqual({
      text: "hello world\n\n\nbye {",
      status: "cleaned",
    });
  });

  it("returns empty input as formatted", async () => {
    expect(await formatCode("")).toEqual({ text: "", status: "formatted" });
  });
});
