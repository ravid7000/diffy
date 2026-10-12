import { format } from "prettier/standalone";
import { cleanupWhitespace } from "./cleanup-whitespace";
import { PARSER_CANDIDATES } from "./constants";
import type { FormatResult, ParserCandidate } from "./types";

const tryFormat = async (text: string, { parser, loadPlugins }: ParserCandidate) => {
  try {
    return await format(text, { parser, plugins: await loadPlugins() });
  } catch {
    return undefined;
  }
};

export const formatCode = async (text: string): Promise<FormatResult> => {
  for (const candidate of PARSER_CANDIDATES.filter(({ matches }) => matches(text))) {
    const formatted = await tryFormat(text, candidate);
    if (formatted !== undefined) return { text: formatted, status: "formatted" };
  }
  return { text: cleanupWhitespace(text), status: "cleaned" };
};
