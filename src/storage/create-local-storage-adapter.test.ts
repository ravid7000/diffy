import { afterEach, describe, expect, it, vi } from "vite-plus/test";
import { STORAGE_PREFIX } from "./constants";
import { createLocalStorageAdapter } from "./create-local-storage-adapter";

describe("createLocalStorageAdapter", () => {
  const adapter = createLocalStorageAdapter();

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("round trips values under the prefix", () => {
    expect(adapter.save("k", { a: 1 })).toBe(true);
    expect(localStorage.getItem(`${STORAGE_PREFIX}k`)).toBe('{"a":1}');
    expect(adapter.load("k")).toEqual({ a: 1 });
  });

  it("returns null for missing or corrupt values", () => {
    localStorage.setItem(`${STORAGE_PREFIX}bad`, "{");
    expect(adapter.load("missing")).toBeNull();
    expect(adapter.load("bad")).toBeNull();
  });

  it("reports failure when the browser rejects the write", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("full", "QuotaExceededError");
    });
    expect(adapter.save("k", "v")).toBe(false);
  });

  it("clears only its own keys", () => {
    localStorage.setItem("other", "keep");
    adapter.save("k", "v");
    adapter.clear();
    expect(localStorage.getItem("other")).toBe("keep");
    expect(adapter.load("k")).toBeNull();
  });

  it("reports emptiness of its own keys only", () => {
    localStorage.setItem("other", "keep");
    expect(adapter.isEmpty()).toBe(true);
    adapter.save("k", "v");
    expect(adapter.isEmpty()).toBe(false);
  });
});
