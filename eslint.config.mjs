// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

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
    // your overrides/rules here
    rules: {},
  },
];

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
//   { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
//   tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ]);