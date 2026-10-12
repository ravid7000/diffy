import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vite-plus/test";
import { FormatButton } from "./format-button";

describe("FormatButton", () => {
  it("emits formatted text", async () => {
    const onChange = vi.fn();
    render(<FormatButton label="Source" value='{"a":1}' onChange={onChange} />);
    await userEvent.click(screen.getByLabelText("Format Source"));
    await vi.waitFor(() => expect(onChange).toHaveBeenCalledWith('{ "a": 1 }\n'));
  });

  it("is disabled when empty", () => {
    render(<FormatButton label="Source" value="" onChange={vi.fn()} />);
    expect(screen.getByLabelText("Format Source")).toHaveProperty("disabled", true);
  });
});
