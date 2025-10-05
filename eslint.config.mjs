// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import testingLibrary from "eslint-plugin-testing-library";
import jestDom from "eslint-plugin-jest-dom";

export default [
  // JavaScript recommended rules
  js.configs.recommended,

  // TypeScript recommended (note: this is an array in typescript-eslint v7)
  ...tseslint.configs.recommended,

  // React flat config
  pluginReact.configs.flat.recommended,

  // Project-wide settings (files/globals/etc.)
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: { version: "detect" },
    },
    plugins: {
      "jsx-a11y": jsxA11y,
      "testing-library": testingLibrary,
      "jest-dom": jestDom,
    },
    rules: {
      // Project-specific a11y nudges
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/no-autofocus": "error",
      "jsx-a11y/no-noninteractive-tabindex": "error",
      "jsx-a11y/aria-proptypes": "error",
    },
  },
  // Test-specific overrides
  {
    files: ["**/__tests__/**/*.{ts,tsx}", "tests/**/*.{ts,tsx}"],
    plugins: {
      "testing-library": testingLibrary,
      "jest-dom": jestDom,
    },
    rules: {
      "testing-library/no-node-access": "off",
    },
  },
];

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
//   { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
//   tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ]);
