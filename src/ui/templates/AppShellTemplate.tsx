import { Footer, Header, Sidebar } from "compositions";
import { useMediaQuery } from "hooks";
import { Flex, FlexItem, Section } from "layout";
import {
  Navigation,
  NavigationPill,
  Text,
  TextHeading,
  TextSmall,
  TextStrong,
} from "primitives";
import { useState } from "react";
import "./templates.css";

const NAV_ITEMS = ["Overview", "Projects", "Activity", "Settings"] as const;
type NavItem = (typeof NAV_ITEMS)[number];

export function AppShellTemplate() {
  const [activePage, setActivePage] = useState<NavItem>("Overview");
  const { isTabletDown } = useMediaQuery();

  const sidebar = (
    <Sidebar brand={<TextStrong>Workspace</TextStrong>}>
      <Navigation direction="column">
        {NAV_ITEMS.map((item) => (
          <NavigationPill
            key={item}
            isSelected={activePage === item}
            onPress={() => setActivePage(item)}
          >
            {item}
          </NavigationPill>
        ))}
      </Navigation>
    </Sidebar>
  );

  return (
    <div className="template-page-root">
      <Header />

      <Section variant="neutral" padding="600">
        <Flex container gap="600" alignSecondary="start">
          {!isTabletDown && <FlexItem size="minor">{sidebar}</FlexItem>}

          <FlexItem size="major">
            <Flex gap="400" wrap={isTabletDown} alignSecondary="start">
              <FlexItem size={isTabletDown ? "full" : "major"}>
                <main
                  className="template-block"
                  aria-label="App shell primary content"
                >
                  <Flex direction="column" gap="600">
                    {isTabletDown && sidebar}
                    <Flex direction="column" gap="200">
                      <TextHeading>{activePage}</TextHeading>
                      <Text>
                        Use this region for dashboard cards, data tables,
                        workflows, and product-specific views.
                      </Text>
                    </Flex>
                    <Flex direction="column" gap="300">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="template-skeleton-row" />
                      ))}
                    </Flex>
                  </Flex>
                </main>
              </FlexItem>

              <FlexItem size={isTabletDown ? "full" : "minor"}>
                <aside className="template-block">
                  <Flex direction="column" gap="400">
                    <TextHeading>Activity</TextHeading>
                    <TextSmall>
                      Add contextual activity, alerts, assignees, and pinned
                      links here.
                    </TextSmall>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="template-skeleton-row" />
                    ))}
                  </Flex>
                </aside>
              </FlexItem>
            </Flex>
          </FlexItem>
        </Flex>
      </Section>

      <Footer />
    </div>
  );
}
