import { isEmpty } from "lodash";
import { LINE_BREAK } from "./constants";

export const splitLines = (text: string): string[] => (isEmpty(text) ? [] : text.split(LINE_BREAK));
