import trim from "lodash/trim.js";

export const normalizeBasePath = (basePath: string) => {
  const segment = trim(basePath, "/");
  return segment ? `/${segment}/` : "/";
};
