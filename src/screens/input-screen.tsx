import { every, isEmpty } from "lodash";
import { AppFooter } from "@/components/footer/app-footer";
import { InputPanels } from "@/components/input/input-panels";
import { AppHeader } from "@/components/layout/app-header";
import { AppShell } from "@/components/layout/app-shell";
import type { InputScreenProps } from "./types";

export const InputScreen = ({
  draft,
  onDraftChange,
  onCompare,
  strategy,
  onStrategyChange,
  ...chrome
}: InputScreenProps) => (
  <AppShell
    header={
      <AppHeader
        {...chrome}
        primaryLabel="Compare"
        isPrimaryDisabled={every(draft, isEmpty)}
        onPrimary={onCompare}
      />
    }
    footer={<AppFooter counts={null} strategy={strategy} onStrategyChange={onStrategyChange} />}
  >
    <InputPanels draft={draft} onChange={onDraftChange} />
  </AppShell>
);
