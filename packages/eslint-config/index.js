import js from "@eslint/js";
import globals from "globals";
import { resolve } from "path";

const projectTsConfig = resolve(process.cwd(), `.`, `tsconfig.json`);

/** @type {import("eslint").Linter.Config} */
export default [
  js.configs.recommended,
  {
    name: `Nico Ismaili's ESLint Configuration`,
    rules: {
      quotes: [`error`, `backtick`],
    },
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
        ...globals.browser,
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: projectTsConfig,
        },
      },
    },
  },
];
