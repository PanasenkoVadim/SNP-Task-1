// eslint.config.js
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";
import babelParser from "@babel/eslint-parser";

export default [
  // Базовые рекомендуемые правила ESLint
  js.configs.recommended,
  
  // Настройки для Prettier
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      "prettier/prettier": [
        "error",
        {
          endOfLine: "lf",
        },
      ],
    },
  },
  
  // Отключение правил, конфликтующих с Prettier
  eslintConfigPrettier,
  
  // Ваши кастомные правила
  {
    rules: {
      "func-names": "off",
      "camelcase": [
        "error",
        {
          ignoreDestructuring: true,
          ignoreImports: true,
        },
      ],
      "consistent-return": "off",
    },
  },
  
  // Настройки языка и парсера
  {
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 2022, // Вместо 8, рекомендуется использовать актуальную версию
      sourceType: "module",
      globals: {
        ...globals.browser, // Добавляет браузерные глобальные переменные
        ...globals.node, // Добавляет Node.js глобальные переменные
      },
    },
  },
];