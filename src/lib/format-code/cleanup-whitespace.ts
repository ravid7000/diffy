import { repeat } from "lodash";
import { MAX_BLANK_LINES } from "./constants";

const blankRun = new RegExp(`\\n{${MAX_BLANK_LINES + 2},}`, "g");

export const cleanupWhitespace = (text: string) =>
  text
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+$/gm, "")
    .replace(blankRun, repeat("\n", MAX_BLANK_LINES + 1));
