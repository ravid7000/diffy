import { describe, expect, it } from "vite-plus/test";
import {
  buildBlocks,
  buildInlineSegments,
  buildMergedText,
  buildRows,
  CONFLICT_END,
  CONFLICT_SEPARATOR,
  CONFLICT_START,
  countChanges,
  createResolutions,
} from ".";

const source = "a\nb\nc\nd";
const destination = "a\nB\nc\nd\ne";

describe("buildBlocks", () => {
  it("groups adjacent removals and additions into one change block", () => {
    expect(buildBlocks(source, destination)).toEqual([
      { kind: "equal", lines: ["a"] },
      { kind: "change", id: 0, source: ["b"], destination: ["B"] },
      { kind: "equal", lines: ["c", "d"] },
      { kind: "change", id: 1, source: [], destination: ["e"] },
    ]);
  });

  it("returns no blocks for two empty inputs", () => {
    expect(buildBlocks("", "")).toEqual([]);
  });

  it("treats CRLF and LF as identical", () => {
    expect(buildBlocks("a\r\nb", "a\nb")).toEqual([{ kind: "equal", lines: ["a", "b"] }]);
  });

  it("marks everything added when source is empty", () => {
    expect(buildBlocks("", "x")).toEqual([
      { kind: "change", id: 0, source: [], destination: ["x"] },
    ]);
  });
});

describe("buildRows", () => {
  it("pads the shorter side and keeps line numbers per side", () => {
    const rows = buildRows(buildBlocks("a\nb", "a\nx\ny"));
    expect(
      rows.map(({ type, isBlockStart, source, destination }) => [
        type,
        isBlockStart,
        source,
        destination,
      ]),
    ).toEqual([
      ["equal", false, { lineNumber: 1, text: "a" }, { lineNumber: 1, text: "a" }],
      ["modified", true, { lineNumber: 2, text: "b" }, { lineNumber: 2, text: "x" }],
      ["modified", false, null, { lineNumber: 3, text: "y" }],
    ]);
  });

  it("produces unique keys", () => {
    const rows = buildRows(buildBlocks(source, destination));
    expect(new Set(rows.map((row) => row.key)).size).toBe(rows.length);
  });
});

describe("buildInlineSegments", () => {
  it("flags changed words on each side", () => {
    expect(buildInlineSegments("let a = 1", "let b = 1")).toEqual({
      source: [
        { value: "let ", changed: false },
        { value: "a", changed: true },
        { value: " = 1", changed: false },
      ],
      destination: [
        { value: "let ", changed: false },
        { value: "b", changed: true },
        { value: " = 1", changed: false },
      ],
    });
  });

  it("highlights whitespace only changes", () => {
    const { destination: segments } = buildInlineSegments("a b", "a  b");
    expect(segments.some((segment) => segment.changed)).toBe(true);
  });
});

describe("createResolutions", () => {
  const blocks = buildBlocks(source, destination);

  it.each([
    ["source", "source"],
    ["destination", "destination"],
    ["unresolved", null],
  ] as const)("applies the %s strategy to every change", (strategy, expected) => {
    expect(createResolutions(blocks, strategy)).toEqual({ 0: expected, 1: expected });
  });
});

describe("buildMergedText", () => {
  const blocks = buildBlocks(source, destination);

  it("takes each side as resolved", () => {
    expect(buildMergedText(blocks, { 0: "destination", 1: "source" })).toBe("a\nB\nc\nd");
    expect(buildMergedText(blocks, { 0: "source", 1: "destination" })).toBe("a\nb\nc\nd\ne");
  });

  it("writes conflict markers for unresolved changes", () => {
    expect(buildMergedText(blocks, { 0: null, 1: "source" })).toBe(
      ["a", CONFLICT_START, "b", CONFLICT_SEPARATOR, "B", CONFLICT_END, "c", "d"].join("\n"),
    );
  });

  it("preserves a trailing newline", () => {
    const withNewline = buildBlocks("a\n", "b\n");
    expect(buildMergedText(withNewline, { 0: "destination" })).toBe("b\n");
  });
});

describe("countChanges", () => {
  it("counts change types and resolved changes", () => {
    const blocks = buildBlocks("a\nb\nc", "x\nc\nd");
    expect(countChanges(blocks, { 0: "source", 1: null })).toEqual({
      added: 1,
      removed: 0,
      modified: 1,
      resolved: 1,
      total: 2,
    });
  });
});
