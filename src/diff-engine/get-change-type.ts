import { isEmpty } from "lodash";
import type { ChangeBlock, ChangeType } from "./types";

export const getChangeType = ({ source, destination }: ChangeBlock): ChangeType => {
  if (isEmpty(source)) return "added";
  if (isEmpty(destination)) return "removed";
  return "modified";
};
