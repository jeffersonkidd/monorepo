// WorkspacePage.tsx
import { Footer, Header } from "compositions";
import { Text, TextHeading, TextSmall, TextStrong } from "primitives";
import { AppShellTemplate } from "templates";

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
        <>
          <TextHeading>Overview</TextHeading>
          <Text>High-level summary of your workspace.</Text>
        </>
      );
    case "projects":
      return (
        <>
          <TextHeading>Projects</TextHeading>
          <Text>All active and archived projects.</Text>
        </>
      );
    case "activity":
      return (
        <>
          <TextHeading>Activity</TextHeading>
          <Text>Recent actions across your workspace.</Text>
        </>
      );
    case "settings":
      return (
        <>
          <TextHeading>Settings</TextHeading>
          <Text>Manage your account and preferences.</Text>
        </>
      );
    default:
      return null;
  }
}

function AsideContent({ activeKey }: { activeKey: string }) {
  return <TextSmall>Showing context for: {activeKey}</TextSmall>;
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
