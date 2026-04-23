import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sidebar } from "compositions";
import {
  IconActivity,
  IconCompass,
  IconHome,
  IconSettings,
  IconUser,
} from "icons";
import { Flex, FlexItem, Section } from "layout";
import {
  Avatar,
  AvatarBlock,
  Navigation,
  NavigationButton,
  NavigationPill,
  Text,
  TextHeading,
  TextStrong,
} from "primitives";
import { useState } from "react";

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: "SDS Compositions/Sidebars",
  parameters: { layout: "fullscreen" },
};
export default meta;

const NAV_ITEMS = ["Overview", "Projects", "Activity", "Settings"] as const;
type NavItem = (typeof NAV_ITEMS)[number];

export const StorySidebar: StoryObj<typeof Sidebar> = {
  name: "Sidebar",
  render: () => {
    const SidebarDemo = () => {
      const [active, setActive] = useState<NavItem>("Overview");
      return (
        <Section variant="neutral" padding="800">
          <Flex container gap="600" alignSecondary="start">
            <FlexItem size="minor">
              <Sidebar brand={<TextStrong>Workspace</TextStrong>}>
                <Navigation direction="column">
                  {NAV_ITEMS.map((item) => (
                    <NavigationPill
                      key={item}
                      isSelected={active === item}
                      onPress={() => setActive(item)}
                    >
                      {item}
                    </NavigationPill>
                  ))}
                </Navigation>
              </Sidebar>
            </FlexItem>
            <FlexItem size="major">
              <Flex direction="column" gap="400">
                <TextHeading>{active}</TextHeading>
                <Text>
                  Sidebar with a column-direction Navigation and a brand label.
                  Sticks below the tablet breakpoint, where it collapses into a
                  left-anchored drawer.
                </Text>
              </Flex>
            </FlexItem>
          </Flex>
        </Section>
      );
    };
    return <SidebarDemo />;
  },
};

export const StorySidebarWithIcons: StoryObj<typeof Sidebar> = {
  name: "Sidebar — Icon Navigation",
  render: () => {
    const items = [
      { id: "overview", label: "Overview", icon: <IconHome /> },
      { id: "explore", label: "Explore", icon: <IconCompass /> },
      { id: "activity", label: "Activity", icon: <IconActivity /> },
      { id: "settings", label: "Settings", icon: <IconSettings /> },
    ] as const;
    type Id = (typeof items)[number]["id"];
    const SidebarDemo = () => {
      const [active, setActive] = useState<Id>("overview");
      return (
        <Section variant="neutral" padding="800">
          <Flex container gap="600" alignSecondary="start">
            <FlexItem size="minor">
              <Sidebar
                brand={<TextStrong>Acme Co.</TextStrong>}
                footer={
                  <AvatarBlock
                    title="Charlie Brown"
                    description="View profile"
                  >
                    <Avatar initials="C" />
                  </AvatarBlock>
                }
              >
                <Navigation direction="column">
                  {items.map((item) => (
                    <NavigationButton
                      key={item.id}
                      direction="row"
                      icon={item.icon}
                      isSelected={active === item.id}
                      onPress={() => setActive(item.id)}
                    >
                      {item.label}
                    </NavigationButton>
                  ))}
                </Navigation>
              </Sidebar>
            </FlexItem>
            <FlexItem size="major">
              <Flex direction="column" gap="400">
                <TextHeading>Icon-led sidebar</TextHeading>
                <Text>
                  Uses <code>NavigationButton</code> for icon + label rows and
                  fills the <code>footer</code> slot with an{" "}
                  <code>AvatarBlock</code>.
                </Text>
              </Flex>
            </FlexItem>
          </Flex>
        </Section>
      );
    };
    return <SidebarDemo />;
  },
};

export const StorySidebarMinimal: StoryObj<typeof Sidebar> = {
  name: "Sidebar — Minimal",
  render: () => {
    const SidebarDemo = () => {
      const [active, setActive] = useState("Files");
      return (
        <Section variant="neutral" padding="800">
          <Flex container gap="600" alignSecondary="start">
            <FlexItem size="minor">
              <Sidebar>
                <Navigation direction="column">
                  {["Files", "Shared", "Trash"].map((item) => (
                    <NavigationButton
                      key={item}
                      direction="row"
                      icon={<IconUser />}
                      isSelected={active === item}
                      onPress={() => setActive(item)}
                    >
                      {item}
                    </NavigationButton>
                  ))}
                </Navigation>
              </Sidebar>
            </FlexItem>
            <FlexItem size="major">
              <Flex direction="column" gap="400">
                <TextHeading>{active}</TextHeading>
                <Text>No brand or footer slot — just navigation.</Text>
              </Flex>
            </FlexItem>
          </Flex>
        </Section>
      );
    };
    return <SidebarDemo />;
  },
};
