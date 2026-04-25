import { Footer, Header } from "compositions";
import { AppShellTemplate } from "templates";
import { Flex, Section } from "layout";
import { Text, TextHeading, TextSmall, TextStrong } from "primitives";

const NAV_ITEMS = [
  { label: "Overview", key: "overview" },
  { label: "Projects", key: "projects" },
  { label: "Activity", key: "activity" },
  { label: "Settings", key: "settings" },
];

function MainContent({ activeKey }: { activeKey: string }) {
  switch (activeKey) {
    case "overview":
      return (
        <Flex direction="column" gap="200">
          <TextHeading>Overview</TextHeading>
          <Text>High-level summary of your workspace.</Text>
        </Flex>
      );
    case "projects":
      return (
        <Flex direction="column" gap="200">
          <TextHeading>Projects</TextHeading>
          <Text>All active and archived projects.</Text>
        </Flex>
      );
    case "activity":
      return (
        <Flex direction="column" gap="200">
          <TextHeading>Activity</TextHeading>
          <Text>Recent actions across your workspace.</Text>
        </Flex>
      );
    case "settings":
      return (
        <Flex direction="column" gap="200">
          <TextHeading>Settings</TextHeading>
          <Text>Manage your account and preferences.</Text>
        </Flex>
      );
    default:
      return null;
  }
}

function AsideContent({ activeKey }: { activeKey: string }) {
  return (
    <Flex direction="column" gap="200">
      <TextSmall>Showing context for: {activeKey}</TextSmall>
    </Flex>
  );
}

export function WorkspacePage() {
  return (
    <>
      <Header />
      <AppShellTemplate
        brand={<TextStrong>Workspace</TextStrong>}
        navItems={NAV_ITEMS}
        renderMain={(key) => <MainContent activeKey={key} />}
        renderAside={(key) => <AsideContent activeKey={key} />}
        onNavChange={(key) => console.log("navigated to", key)}
      />
      <Footer />
    </>
  );
}
