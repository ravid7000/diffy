import { act, renderHook } from "@testing-library/react";
import type { DragEvent } from "react";
import { describe, expect, it, vi } from "vite-plus/test";
import { useFileDrop } from "./use-file-drop";

const dropEvent = (files: File[]) =>
  ({ preventDefault: vi.fn(), dataTransfer: { files } }) as unknown as DragEvent;

describe("useFileDrop", () => {
  it("reads the first dropped file as text", async () => {
    const onText = vi.fn();
    const { result } = renderHook(() => useFileDrop(onText, vi.fn()));
    act(() => result.current.dragProps.onDragOver(dropEvent([])));
    expect(result.current.isDragging).toBe(true);
    await act(async () =>
      result.current.dragProps.onDrop(dropEvent([new File(["hello"], "a.txt")])),
    );
    expect(onText).toHaveBeenCalledWith("hello");
    expect(result.current.isDragging).toBe(false);
  });

  it("ignores drops without files", () => {
    const onText = vi.fn();
    const { result } = renderHook(() => useFileDrop(onText, vi.fn()));
    act(() => result.current.dragProps.onDrop(dropEvent([])));
    expect(onText).not.toHaveBeenCalled();
  });
});
