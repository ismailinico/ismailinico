const { resolve } = require("node:path");
const projectTsConfig = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: "latest",
  },

  env: {
    node: true,
    browser: true,
    es6: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: projectTsConfig,
      },
    },
  },
};
