// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import testingLibrary from "eslint-plugin-testing-library";
import jestDom from "eslint-plugin-jest-dom";

export default [
  // Ignore generated and vendor directories
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/out/**",
      "**/dist/**",
      "**/coverage/**",
      "**/.turbo/**",
      "next-env.d.ts",
      "babel.configl.js",
    ],
  },
  // JavaScript recommended rules
  js.configs.recommended,

  // TypeScript recommended (note: this is an array in typescript-eslint v7)
  ...tseslint.configs.recommended,

  // React flat config
  pluginReact.configs.flat.recommended,

  // Project-wide settings (files/globals/etc.)
  {
    files: [
      "src/**/*.{js,mjs,cjs,ts,jsx,tsx}",
      "tests/**/*.{js,mjs,cjs,ts,jsx,tsx}",
      "__tests__/**/*.{js,mjs,cjs,ts,jsx,tsx}",
    ],
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
      // React modern JSX transform
      "react/react-in-jsx-scope": "off",
      // Allow Next.js style jsx prop usage, custom props in UI lib
      "react/no-unknown-property": "off",
      // Allow quotes/apostrophes in content
      "react/no-unescaped-entities": "off",
      // TS ergonomics: soften strictness where noise is high
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
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
      // Tests often use inline components/mocks
      "react/display-name": "off",
      // Loosen typings for test scaffolding
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "jsx-a11y/anchor-is-valid": "off",
    },
  },
  // Node config files overrides
  {
    files: [
      "*.config.{js,cjs,mjs,ts}",
      "*.rc.{js,cjs,mjs}",
      "jest.*.{js,ts}",
      ".lighthouserc.js",
      "next.config.js",
      "postcss.config.js",
      "tailwind.config.ts",
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-undef": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
//   { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
//   tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ]);
