import antfu from "@antfu/eslint-config";

export default antfu(
  {
    type: "app",
    astro: true,
    svelte: true,
    react: {
      files: ["**/*.tsx", "**/*.jsx"],
    },
    typescript: true,
    unocss: true,
    yaml: {
      overrides: {
        "yaml/indent": ["error", 2],
      },
    },
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
    gitignore: true,
    ignores: [".pnpm-store/**"],
  },
  {
    files: ["**/*.tsx", "**/*.jsx"],
    rules: {
      "react/no-implicit-key": "off",
      "react/no-array-index-key": "off",
    },
  },
  {
    rules: {
      "svelte/max-attributes-per-line": [
        "error",
        {
          singleline: 2,
          multiline: 1,
        },
      ],
      "ts/no-redeclare": "off",
      "ts/consistent-type-definitions": ["error", "type"],
      "no-console": ["warn"],
      "antfu/no-top-level-await": ["off"],
      "node/prefer-global/process": ["off"],
      "node/no-process-env": ["error"],
      "perfectionist/sort-imports": [
        "error",
        {
          tsconfigRootDir: ".",
        },
      ],
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: ["\\.md$", "\\.yml$", "\\.json$"],
        },
      ],
    },
  },
);
