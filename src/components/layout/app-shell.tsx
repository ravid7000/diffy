import type { AppShellProps } from "./types";

export const AppShell = ({ header, footer, children }: AppShellProps) => (
  <div className="flex h-dvh flex-col bg-background text-foreground">
    {header}
    <main className="min-h-0 flex-1">{children}</main>
    {footer}
  </div>
);
