import { afterEach, describe, expect, it, vi } from "vite-plus/test";
import { downloadText } from "./download-text";

describe("downloadText", () => {
  afterEach(() => vi.restoreAllMocks());

  it("downloads text through a temporary object url", () => {
    URL.createObjectURL = vi.fn(() => "blob:x");
    const revoke = vi.fn();
    URL.revokeObjectURL = revoke;
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => undefined);
    downloadText("hello", "a.txt");
    expect(click).toHaveBeenCalledOnce();
    expect(revoke).toHaveBeenCalledWith("blob:x");
  });
});
