import { BlankTemplate } from "templates";
import { Header, Footer } from "compositions";
import { TextHeading, Text } from "primitives";
import { Flex,Section } from "layout";
import { WelcomeHero } from "examples/WelcomeHero";

export function BlankPage() {
  return (
    <BlankTemplate
      header={<Header />}
      footer={<Footer />}
      id="dashboard-page"
      mainProps={{ "aria-label": "Dashboard content" }}
    >
      <WelcomeHero />
    </BlankTemplate>
  );
}