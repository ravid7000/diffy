import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vite-plus/test";
import { STORAGE_KEYS, storage } from "@/storage";
import { useCompareSession } from "./use-compare-session";

describe("useCompareSession", () => {
  afterEach(() => localStorage.clear());

  it("restores the stored session as draft", () => {
    storage.save(STORAGE_KEYS.session, { source: "s", destination: "d" });
    const { result } = renderHook(() => useCompareSession());
    expect(result.current.draft).toEqual({ source: "s", destination: "d" });
  });

  it("persists the draft on compare and returns to edit", () => {
    const { result } = renderHook(() => useCompareSession());
    act(() => result.current.updateDraft("source", "x"));
    act(() => void result.current.compare());
    expect(result.current.compared).toMatchObject({ source: "x", destination: "" });
    expect(storage.load(STORAGE_KEYS.session)).toEqual({ source: "x", destination: "" });
    act(() => result.current.edit());
    expect(result.current.compared).toBeNull();
  });

  it("resets to an empty session", () => {
    const { result } = renderHook(() => useCompareSession());
    act(() => result.current.updateDraft("destination", "y"));
    act(() => result.current.reset());
    expect(result.current.draft).toEqual({ source: "", destination: "" });
  });
});
