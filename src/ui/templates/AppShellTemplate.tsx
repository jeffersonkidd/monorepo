// AppShellTemplate.tsx
import { Sidebar } from "compositions";
import { useMediaQuery } from "hooks";
import { Flex, FlexItem, Section } from "layout";
import { Navigation, NavigationPill, TextHeading } from "primitives";
import { ReactNode, useState } from "react";
import "./templates.css";

export interface NavItem {
  label: string;
  key: string;
}

export interface AppShellTemplateProps {
  brand?: ReactNode;
  navItems: NavItem[];
  onNavChange?: (key: string) => void;
  renderMain: (activeKey: string) => ReactNode;
  renderAside?: (activeKey: string) => ReactNode;
  asideHeading?: string;
}

export function AppShellTemplate({
  brand,
  navItems,
  onNavChange,
  renderMain,
  renderAside,
  asideHeading = "Activity",
}: AppShellTemplateProps) {
  const [activeKey, setActiveKey] = useState(navItems[0]?.key ?? "");
  const { isTabletDown } = useMediaQuery();

  const handleNavChange = (key: string) => {
    setActiveKey(key);
    onNavChange?.(key);
  };

  const nav = (
    <Navigation direction="column">
      {navItems.map((item) => (
        <NavigationPill
          key={item.key}
          isSelected={activeKey === item.key}
          onPress={() => handleNavChange(item.key)}
        >
          {item.label}
        </NavigationPill>
      ))}
    </Navigation>
  );

  return (
    <Section variant="neutral" padding="600">

      {/* Mobile: trigger renders inline above content */}
      {isTabletDown && (
        <Sidebar brand={brand}>{nav}</Sidebar>
      )}

      <Flex container gap="600" alignSecondary="start">

        {/* Desktop: sidebar in the flex row */}
        {!isTabletDown && (
          <FlexItem size="minor">
            <Sidebar brand={brand}>{nav}</Sidebar>
          </FlexItem>
        )}

        <FlexItem size="major">
          <Flex gap="600" alignSecondary="start">

            <FlexItem size="major">
              <main
                className="template-block"
                aria-label="App shell primary content"
              >
                <Flex direction="column" gap="600">
                  {renderMain(activeKey)}
                </Flex>
              </main>
            </FlexItem>

            {renderAside && (
              <FlexItem size="minor">
                <aside className="template-block">
                  <Flex direction="column" gap="400">
                    <TextHeading>{asideHeading}</TextHeading>
                    {renderAside(activeKey)}
                  </Flex>
                </aside>
              </FlexItem>
            )}

          </Flex>
        </FlexItem>

      </Flex>
    </Section>
  );
}
