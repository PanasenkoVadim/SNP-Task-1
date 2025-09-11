import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import prettierPlugin from "eslint-plugin-prettier"
import globals from "globals"
import babelParser from "@babel/eslint-parser"

export default [
  js.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      "prettier/prettier": [
        "error",
        {
          endOfLine: "lf"
        }
      ]
    }
  },
  eslintConfigPrettier,
  {
    rules: {
      "func-names": "off",
      camelcase: [
        "error",
        {
          ignoreDestructuring: true,
          ignoreImports: true
        }
      ],
      "consistent-return": "off"
    }
  },

  {
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  }
]
