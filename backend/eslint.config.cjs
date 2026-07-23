const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,

  {
    files: ["**/*.js"],
    ignores: ["tests/**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",

      globals: {
        ...globals.node,
      },
    },

    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },

  // Jest test-files
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",

      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },

  {
    ignores: ["node_modules/", "coverage/"],
  },
];
