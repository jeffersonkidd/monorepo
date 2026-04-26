import { Flex } from "layout";
import { Text, TextHeading, TextSmall } from "primitives";
import { useState } from "react";
import { AppShellTemplate, NavItem } from "./AppShellTemplate";

export function OverviewPage() {
  const [activePage, setActivePage] = useState<NavItem>("Overview");

  const main = (
    <Flex direction="column" gap="600">
      <Flex direction="column" gap="200">
        <TextHeading>{activePage}</TextHeading>
        <Text>
          Use this region for dashboard cards, data tables, workflows,
          and product-specific views.
        </Text>
      </Flex>
      <Flex direction="column" gap="300">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="template-skeleton-row" />
        ))}
      </Flex>
    </Flex>
  );

  const aside = (
    <Flex direction="column" gap="400">
      <TextHeading>Activity</TextHeading>
      <TextSmall>
        Add contextual activity, alerts, assignees, and pinned links here.
      </TextSmall>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="template-skeleton-row" />
      ))}
    </Flex>
  );

  return (
    <AppShellTemplate
      activePage={activePage}
      onNavigate={setActivePage}
      main={main}
      aside={aside}
    />
  );
}
