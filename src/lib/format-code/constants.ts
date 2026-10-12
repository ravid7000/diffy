import type { Plugin } from "prettier";
import type { ParserCandidate } from "./types";

const always = () => true;

const loadBabel = async (): Promise<Plugin[]> =>
  Promise.all([import("prettier/plugins/babel"), import("prettier/plugins/estree")]);

export const PARSER_CANDIDATES: ParserCandidate[] = [
  { parser: "json", matches: always, loadPlugins: loadBabel },
  {
    parser: "html",
    matches: (text) => text.trimStart().startsWith("<"),
    loadPlugins: async () => [await import("prettier/plugins/html")],
  },
  {
    parser: "yaml",
    matches: (text) => /^(---|[\w"'-]+:(\s|$))/.test(text.trimStart()) && !/[;{}()]/.test(text),
    loadPlugins: async () => [await import("prettier/plugins/yaml")],
  },
  { parser: "babel-ts", matches: always, loadPlugins: loadBabel },
  {
    parser: "css",
    matches: (text) => /^[^{}]+\{[^}]*\}/m.test(text),
    loadPlugins: async () => [await import("prettier/plugins/postcss")],
  },
];

export const MAX_BLANK_LINES = 2;
