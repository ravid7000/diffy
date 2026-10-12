import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vite-plus/test";
import { FileTextArea } from "./file-text-area";

describe("FileTextArea", () => {
  it("emits typed text", async () => {
    const onChange = vi.fn();
    render(<FileTextArea label="Source" value="" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText("Source"), "x");
    expect(onChange).toHaveBeenCalledWith("x");
  });

  it("loads an uploaded file", async () => {
    const onChange = vi.fn();
    render(<FileTextArea label="Source" value="" onChange={onChange} />);
    await userEvent.upload(
      screen.getByLabelText("Upload Source file"),
      new File(["from file"], "a.txt"),
    );
    await vi.waitFor(() => expect(onChange).toHaveBeenCalledWith("from file"));
  });

  it("loads a dropped file", async () => {
    const onChange = vi.fn();
    render(<FileTextArea label="Source" value="" onChange={onChange} />);
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File(["dropped"], "b.txt"));
    act(() => {
      screen
        .getByLabelText("Source")
        .dispatchEvent(new DragEvent("drop", { dataTransfer, bubbles: true }));
    });
    await vi.waitFor(() => expect(onChange).toHaveBeenCalledWith("dropped"));
  });
});
