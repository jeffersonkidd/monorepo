// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: [
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],

  addons: ["@storybook/addon-links", "@storybook/addon-docs"],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  docs: {},

  viteFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        compositions: path.resolve(__dirname, "../src/ui/compositions"),
        hooks: path.resolve(__dirname, "../src/ui/hooks"),
        icons: path.resolve(__dirname, "../src/ui/icons"),
        images: path.resolve(__dirname, "../src/ui/images"),
        layout: path.resolve(__dirname, "../src/ui/layout"),
        primitives: path.resolve(__dirname, "../src/ui/primitives"),
        providers: path.resolve(__dirname, "../src/ui/providers"),
        templates: path.resolve(__dirname, "../src/ui/templates"),
        utils: path.resolve(__dirname, "../src/ui/utils"),
      };
    }

    return config;
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      include: [
        "./**/*.ts",
        "./**/*.tsx",
        "../src/**/*.ts",
        "../src/**/*.tsx",
      ],
    },
  },
};
export default config;
