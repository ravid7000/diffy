import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, lazyPlugins } from "vite-plus";
import { playwright } from "vite-plus/test/browser-playwright";

export default defineConfig({
  fmt: {},
  lint: {
    plugins: ["react", "typescript", "oxc"],
    rules: {
      "react/rules-of-hooks": "error",
      "react/only-export-components": ["warn", { allowConstantExport: true }],
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    overrides: [
      { files: ["src/components/ui/**"], rules: { "react/only-export-components": "off" } },
    ],
    options: { typeAware: true, typeCheck: true },
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
  },
  test: {
    setupFiles: ["src/test/setup.ts"],
    projects: [
      {
        extends: true,
        test: { name: "unit", environment: "jsdom", include: ["src/**/*.test.ts"] },
      },
      {
        extends: true,
        test: {
          name: "browser",
          include: ["src/**/*.test.tsx"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "./src") } },
  plugins: lazyPlugins(() => [react(), tailwindcss()]),
});
