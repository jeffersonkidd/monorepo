import { Card } from "compositions";
import {
  IconArrowRight,
  IconBook,
  IconGithub,
  IconInstagram,
  IconLinkedin,
  IconYoutube,
} from "icons";
import { useMediaQuery } from "hooks";
import { Flex, FlexItem, Section } from "layout";
import {
  Button,
  ButtonGroup,
  Image,
  Tag,
  TagButton,
  Text,
  TextStrong,
  TextContentTitle,
  TextContentHeading,
  TextHeading,
  TextSmall,
  TextTitlePage,
} from "primitives";

const featuredLinks = [
  {
    title: "Book a brand shoot",
    description: "Creative direction, wardrobe notes, and next-week openings.",
    href: "#book-a-brand-shoot",
  },
  {
    title: "Shop my creator toolkit",
    description: "Cameras, lighting, presets, and the gear I use every day.",
    href: "#shop-my-creator-toolkit",
  },
  {
    title: "Watch the weekly studio vlog",
    description: "Behind the scenes, launches, and what is working right now.",
    href: "#watch-the-weekly-studio-vlog",
  },
  {
    title: "Download the free launch checklist",
    description: "A simple planning template for your next drop or campaign.",
    href: "#download-the-free-launch-checklist",
  },
];

const socialLinks = [
  { label: "Instagram", href: "#instagram", icon: <IconInstagram /> },
  { label: "YouTube", href: "#youtube", icon: <IconYoutube /> },
  { label: "LinkedIn", href: "#linkedin", icon: <IconLinkedin /> },
  { label: "GitHub", href: "#github", icon: <IconGithub /> },
];

const quickStats = [
  { label: "Subscribers", value: "42k" },
  { label: "Weekly reach", value: "180k" },
  { label: "Brand partners", value: "28" },
];

export function Demo() {
  const { isMobile } = useMediaQuery();
  const sectionPadding = isMobile ? "600" : "1600";
  const pageGap = isMobile ? "800" : "1200";

  return (
    <Section padding={sectionPadding} variant="neutral">
      <Flex
        direction="column"
        gap="800"
        alignPrimary="center"
        alignSecondary="center"
        type="third"
        style={{ minWidth: 0, maxWidth: "48rem" }}
        container
        wrap
      >
        {/* Profile */}
        <Flex
          direction="column"
          gap={pageGap}
          alignPrimary="stretch"
          alignSecondary="center"
          container
          
    
        >
          <Card
            align="start"
            direction="vertical"
            variant="stroke"
            padding="600"
          >
            <Flex
              direction="column"
              alignSecondary="center"
              gap="800"
            >
              <Image
                src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
                alt="Profile Picture of Ava Monroe"
                size="medium"
                style={{ borderRadius: "100%" }}
              />

              <Flex
                direction="column"
                gap="600"
                alignPrimary="center"
                alignSecondary="center"
                style={{ minWidth: 0 }}
              >
                <Tag scheme="positive" variant="primary">
                  <IconBook />New course live
                </Tag>

                <TextContentTitle
                  align="center"
                  title="Ava Monroe"
                  subtitle="Creative strategist sharing launch notes, studio workflows, and simple systems for independent brands."
                />
              </Flex>
            </Flex>

            {/* Stats */}
            <Flex direction={isMobile ? "column" : "row"} gap="600" type="third" alignPrimary="center" alignSecondary="center" container wrap>
              {quickStats.map((stat) => (
                <FlexItem key={stat.label} size="fill" >
                  <Card direction="vertical" variant="stroke" align="start" padding="600"   >
                    <Flex
                      direction="column"
                      gap="100"
                      alignPrimary="center"
                      alignSecondary="center"
                      container
                    
                    >
                      <TextSmall >{stat.label}</TextSmall>
                      <TextHeading   >{stat.value}</TextHeading>
                    </Flex>
                  </Card>
                </FlexItem>
              ))}
            </Flex>
          </Card>
        </Flex>

        {/* Featured Links */}
        <Flex
          direction="column"
          gap={pageGap}
          alignSecondary="stretch"
          style={{ maxWidth: "48rem", minWidth: 0, width: "100%" }}
        >
          <Card variant="stroke" padding="800" direction="vertical" style={{ minWidth: 0 }}>
            <Flex
              direction="column"
              gap="600"
              alignSecondary="stretch"
              type="auto"
              wrap
              container
              style={{ minWidth: 0 }}
            >
              <TextContentHeading
                heading="Featured links"
                subheading="Your favorite stuff in one place"
                align="start"
              />

              <ButtonGroup
                align="stack"
                style={{ gap: "var(--sds-size-space-300)" }} // ✅ fixed
              >
                {featuredLinks.map((link) => (
                  <Button
                    key={link.title}
                    href={link.href}
                    variant="neutral"
                    style={{ minWidth: 0 }}
                  >
                    <Flex
                      direction="column"
                      alignPrimary="start"
                      alignSecondary="stretch"
                      wrap
                      container
                      style={{ minWidth: 0, flex: 1 }}
                    >
                      <TextStrong>{link.title}</TextStrong>
                      <TextSmall>{link.description}</TextSmall>
                    </Flex>

                    <Flex style={{ flexShrink: 0 }}>
                      <IconArrowRight size="32" />
                    </Flex>
                  </Button>
                ))}
              </ButtonGroup>
            </Flex>
          </Card>
        </Flex>

        {/* Email CTA */}
        <Flex
          type="third"
          direction="column"
          gap={pageGap}
          alignSecondary="stretch"
          container
          wrap
        >
          <Card variant="brand" direction="vertical" padding="800" style={{ minWidth: 0 }}>
            <Flex
              direction="column"
              type="auto"
              alignPrimary="center"
              alignSecondary={"stretch"}
              gap="200"
              style={{ minWidth: 0, width: "100%" }}
            >
              <FlexItem size="full">
                <TextTitlePage >Join the studio memo</TextTitlePage>
              </FlexItem>
              <FlexItem size="full">
                <Text >One practical email every Friday with new templates, campaign notes, and upcoming drops.</Text>
              </FlexItem>
            </Flex>

            <Button
              href="#join-the-studio-memo"
              variant="neutral"
              size="medium"
              style={{ alignSelf: "flex-start" }}
            >
              Subscribe
            </Button>
          </Card>
        </Flex>

        {/* Social */}
        <Flex direction="column" gap="300" alignPrimary="center" alignSecondary="center">
          <ButtonGroup align="center" style={{width:"100%"}}>
            {socialLinks.map((link) => (
              <TagButton key={link.label} href={link.href}>
                <Flex gap="100" alignSecondary="center">
                  {link.icon}
                  <span>{link.label}</span>
                </Flex>
              </TagButton>
            ))}
          </ButtonGroup>

          <TextSmall>hello@avamonroe.studio</TextSmall>
        </Flex>
      </Flex>
    </Section>
  );
}