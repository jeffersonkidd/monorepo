import { Sidebar } from "compositions";
import { useMediaQuery } from "hooks";
import { Flex, FlexItem, Section } from "layout";
import {
  Navigation,
  NavigationPill,
  TextHeading,
} from "primitives";
import { ReactNode, useState } from "react";
import "./templates.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  key: string;
}

export interface AppShellTemplateProps {
  /** Sidebar brand slot — any node, e.g. a logo or wordmark */
  brand?: ReactNode;
  /** Nav items. First item is selected by default. */
  navItems: NavItem[];
  /** Called when the user switches pages */
  onNavChange?: (key: string) => void;
  /** Main content — receives the active nav key so you can switch views */
  renderMain: (activeKey: string) => ReactNode;
  /** Right aside content — activity feed, alerts, metadata */
  renderAside?: (activeKey: string) => ReactNode;
  /** Aside heading */
  asideHeading?: string;
}

// ─── Template ─────────────────────────────────────────────────────────────────
export function AppShellTemplate({ ... }: AppShellTemplateProps) {
  const { isTabletDown } = useMediaQuery();
  // ...

  const sidebar = (
    <Sidebar brand={brand}>
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
    </Sidebar>
  );

  return (
    <div className="template-page-root">
      <Section variant="neutral" padding="600">
        <Flex container gap="600" alignSecondary="start">
          {/* ✅ always render — Sidebar handles its own collapse */}
          <FlexItem size="minor">{sidebar}</FlexItem>

          <FlexItem size="major">
            <Flex gap="600" wrap={isTabletDown} alignSecondary="start">
              <FlexItem size={isTabletDown ? "full" : "major"}>
                <main className="template-block" aria-label="App shell primary content">
                  <Flex direction="column" gap="600">
                    {/* ❌ remove this — Sidebar already renders its own trigger */}
                    {renderMain(activeKey)}
                  </Flex>
                </main>
              </FlexItem>

              {renderAside && (
                <FlexItem size={isTabletDown ? "full" : "minor"}>
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
    </div>
  );
}
