import { lazy, Suspense, useMemo } from "react";
import { DiffView } from "@/components/diff-view/diff-view";
import { AppFooter } from "@/components/footer/app-footer";
import { AppHeader } from "@/components/layout/app-header";
import { AppShell } from "@/components/layout/app-shell";
import { buildBlocks, buildRows, countChanges } from "@/diff-engine";
import { useMergeState } from "@/hooks/use-merge-state";
import type { DiffScreenProps } from "./types";

const FinalBufferPane = lazy(() => import("@/components/final-buffer/final-buffer-pane"));

export const DiffScreen = ({
  session,
  onEdit,
  strategy,
  onStrategyChange,
  theme,
  ...chrome
}: DiffScreenProps) => {
  const blocks = useMemo(() => buildBlocks(session.source, session.destination), [session]);
  const rows = useMemo(() => buildRows(blocks), [blocks]);
  const merge = useMergeState(blocks, strategy);
  const counts = useMemo(
    () => countChanges(blocks, merge.resolutions),
    [blocks, merge.resolutions],
  );

  return (
    <AppShell
      header={<AppHeader {...chrome} theme={theme} primaryLabel="Edit files" onPrimary={onEdit} />}
      footer={<AppFooter counts={counts} strategy={strategy} onStrategyChange={onStrategyChange} />}
    >
      <div className="grid h-full grid-cols-[2fr_1fr] divide-x">
        <DiffView
          rows={rows}
          resolutions={merge.resolutions}
          isLocked={merge.isLocked}
          onResolve={merge.resolve}
        />
        <Suspense
          fallback={<div className="p-4 text-sm text-muted-foreground">Loading editor...</div>}
        >
          <FinalBufferPane
            value={merge.mergedText}
            theme={theme}
            isLocked={merge.isLocked}
            onChange={merge.editText}
            onResetEdits={merge.resetEdits}
          />
        </Suspense>
      </div>
    </AppShell>
  );
};
