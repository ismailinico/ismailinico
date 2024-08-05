import js from "@eslint/js";
import { resolve } from "path";

const projectTsConfig = resolve(process.cwd(), ".", "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        MyGlobal: true,
      },
    },
    env: {
      node: true,
      browser: true,
      es6: true,
    },
    parserOptions: {
      ecmaVersion: "latest",
    },
    rules: {
      quotes: ["error", "backtick"],
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
