import type { Plugin } from "prettier";

export interface ParserCandidate {
  parser: string;
  matches: (text: string) => boolean;
  loadPlugins: () => Promise<Plugin[]>;
}

export type FormatResult = { text: string; status: "formatted" | "cleaned" };
