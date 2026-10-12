import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import { buildBlocks } from "@/diff-engine";
import { useMergeState } from "./use-merge-state";

const blocks = buildBlocks("a\nb", "a\nB");

describe("useMergeState", () => {
  it("starts from the chosen strategy", () => {
    const { result } = renderHook(() => useMergeState(blocks, "destination"));
    expect(result.current.mergedText).toBe("a\nB");
  });

  it("switches side and toggles back to unresolved", () => {
    const { result } = renderHook(() => useMergeState(blocks, "source"));
    act(() => result.current.resolve(0, "destination"));
    expect(result.current.mergedText).toBe("a\nB");
    act(() => result.current.resolve(0, "destination"));
    expect(result.current.resolutions[0]).toBeNull();
  });

  it("locks on manual edit and unlocks on reset", () => {
    const { result } = renderHook(() => useMergeState(blocks, "source"));
    act(() => result.current.editText("custom"));
    expect(result.current).toMatchObject({ mergedText: "custom", isLocked: true });
    act(() => result.current.resetEdits());
    expect(result.current).toMatchObject({ mergedText: "a\nb", isLocked: false });
  });
});
