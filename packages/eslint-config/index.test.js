import { ESLint } from "eslint";
import config from "./index";

describe(`ESLint Configuration`, () => {
  test(`should load config as valid in ESLint and apply rules correctly`, async () => {
    const eslint = new ESLint({
      baseConfig: config,
    });

    const results = await eslint.lintText(`const a = '1';`);

    const expectedFirstMsg = `'a' is assigned a value but never used.`;
    const firstMsg = results[0].messages[0].message;

    expect(firstMsg).toBe(expectedFirstMsg);

    const expectedSecondMsg = `Strings must use backtick.`;
    const secondMsg = results[0].messages[1].message;

    expect(secondMsg).toBe(expectedSecondMsg);
  });
});
