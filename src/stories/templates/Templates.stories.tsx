import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AppShellTemplate,
  AuthTemplate,
  MarketingTemplate,
  Templates,
} from "../../ui/templates";

const meta: Meta<typeof Templates> = {
  component: Templates,
  title: "SDS Templates/Templates",
  parameters: { layout: "fullscreen" },
};

export default meta;

export const StoryTemplatesGallery: StoryObj<typeof Templates> = {
  name: "Gallery",
  render: () => <Templates />,
};

export const StoryAppShellTemplate: StoryObj<typeof AppShellTemplate> = {
  name: "App Shell",
  parameters: { layout: "fullscreen" },
  render: () => <AppShellTemplate />,
};

export const StoryAuthTemplate: StoryObj<typeof AuthTemplate> = {
  name: "Auth",
  parameters: { layout: "fullscreen" },
  render: () => <AuthTemplate />,
};

export const StoryMarketingTemplate: StoryObj<typeof MarketingTemplate> = {
  name: "Marketing",
  parameters: { layout: "fullscreen" },
  render: () => <MarketingTemplate />,
};
