import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";
import { dirname } from "path";
import tsEslint from "typescript-eslint";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(
  { ignores: ["node_modules/", "dist/"] },
  js.configs.recommended,
  tsEslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-irregular-whitespace": "off",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-empty-function": "warn",
      // ESLint 10 で eslint:recommended に追加された新ルール（段階的に対応）
      "no-unassigned-vars": "warn",
      "no-useless-assignment": "warn",
      "preserve-caught-error": "warn",
    },
  }
);
