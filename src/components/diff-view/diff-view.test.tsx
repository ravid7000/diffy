import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vite-plus/test";
import { buildBlocks, buildRows } from "@/diff-engine";
import { DiffView } from "./diff-view";

const rows = buildRows(buildBlocks("same\nold value", "same\nnew value"));

describe("DiffView", () => {
  it("renders both sides with inline highlights", () => {
    render(
      <DiffView rows={rows} resolutions={{ 0: "source" }} isLocked={false} onResolve={vi.fn()} />,
    );
    expect(screen.getAllByText("same")).toHaveLength(2);
    expect(screen.getByText("old").className).toContain("bg-red-500/30");
    expect(screen.getByText("new").className).toContain("bg-green-500/30");
  });

  it("resolves a hunk to the clicked side", async () => {
    const onResolve = vi.fn();
    render(
      <DiffView rows={rows} resolutions={{ 0: "source" }} isLocked={false} onResolve={onResolve} />,
    );
    expect(screen.getByLabelText("Keep source").getAttribute("aria-pressed")).toBe("true");
    await userEvent.click(screen.getByLabelText("Keep destination"));
    expect(onResolve).toHaveBeenCalledWith(0, "destination");
  });

  it("disables hunk actions when locked", () => {
    render(<DiffView rows={rows} resolutions={{ 0: null }} isLocked onResolve={vi.fn()} />);
    expect(screen.getByLabelText<HTMLButtonElement>("Keep source").disabled).toBe(true);
    expect(screen.getByLabelText<HTMLButtonElement>("Keep destination").disabled).toBe(true);
  });
});
