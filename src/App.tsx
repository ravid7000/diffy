import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { DEFAULT_STRATEGY, type MergeStrategy } from "@/diff-engine";
import { useCompareSession } from "@/hooks/use-compare-session";
import { usePersistedState } from "@/hooks/use-persisted-state";
import { useTheme } from "@/hooks/use-theme";
import { DiffScreen } from "@/screens/diff-screen";
import { InputScreen } from "@/screens/input-screen";
import { STORAGE_KEYS, storage } from "@/storage";

export const App = () => {
  const { theme, toggleTheme } = useTheme();
  const [strategy, setStrategy] = usePersistedState<MergeStrategy>(
    STORAGE_KEYS.strategy,
    DEFAULT_STRATEGY,
  );
  const session = useCompareSession();

  const clearCache = () => {
    storage.clear();
    session.reset();
    toast.success("Cache cleared");
  };

  const compare = () => {
    if (!session.compare()) toast.warning("Files are too large to cache in browser storage");
  };

  const chrome = {
    theme,
    onToggleTheme: toggleTheme,
    onClearCache: clearCache,
    strategy,
    onStrategyChange: setStrategy,
  };

  return (
    <>
      {session.compared ? (
        <DiffScreen
          key={`${session.compared.id}-${strategy}`}
          {...chrome}
          session={session.compared}
          onEdit={session.edit}
        />
      ) : (
        <InputScreen
          {...chrome}
          draft={session.draft}
          onDraftChange={session.updateDraft}
          onCompare={compare}
        />
      )}
      <Toaster theme={theme} position="bottom-center" />
    </>
  );
};
