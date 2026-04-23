import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footer, Header } from "compositions";
import { Section } from "layout";
import { Text, TextHeading } from "primitives";
import {
  AppShellTemplate,
  AuthTemplate,
  BlankTemplate,
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

export const StoryBlankTemplate: StoryObj<typeof BlankTemplate> = {
  name: "Blank",
  parameters: { layout: "fullscreen" },
  render: () => (
    <BlankTemplate header={<Header />} footer={<Footer />}>
      <Section padding="1200">
        <TextHeading>Blank template</TextHeading>
        <Text>
          Bare scaffolding — pass your own sections as children. Omit
          the header/footer slots for a fully empty canvas.
        </Text>
      </Section>
    </BlankTemplate>
  ),
};

export const StoryBlankTemplateEmpty: StoryObj<typeof BlankTemplate> = {
  name: "Blank (no chrome)",
  parameters: { layout: "fullscreen" },
  render: () => (
    <BlankTemplate>
      <Section padding="1200">
        <TextHeading>Empty canvas</TextHeading>
        <Text>No header, no footer — just the column scaffolding.</Text>
      </Section>
    </BlankTemplate>
  ),
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
