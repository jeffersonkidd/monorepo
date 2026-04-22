import { Footer, Header, Hero, Panel } from "compositions";
import { useMediaQuery } from "hooks";
import { placeholder } from "images";
import { Flex, FlexItem, Section } from "layout";
import {
  Accordion,
  AccordionItem,
  Button,
  ButtonGroup,
  Form,
  Image,
  Input,
  Navigation,
  NavigationPill,
  Text,
  TextContentHeading,
  TextHeading,
  TextPrice,
  TextSubheading,
  TextTitleHero,
  TextTitlePage,
} from "primitives";
import { useState } from "react";
import "./templates.css";

const FEATURES = [
  {
    heading: "Design and code in sync",
    body: "Figma Code Connect keeps component docs next to the source of truth — no drift, no guesswork.",
  },
  {
    heading: "Composable product patterns",
    body: "Lay out any screen with Section, Flex, and FlexItem — responsive by default, no breakpoint spaghetti.",
  },
  {
    heading: "Built-in responsive behaviour",
    body: "Every primitive ships with sensible mobile defaults. useMediaQuery handles the rest.",
  },
] as const;

const FAQ_ITEMS = [
  {
    title: "Can I use this with an existing codebase?",
    body: "Yes. The primitives are plain React components. Drop them in alongside your existing UI layer and migrate gradually.",
  },
  {
    title: "Is theming supported?",
    body: "Fully. Swap the brand colour ramp in theme.css and every semantic token updates automatically.",
  },
  {
    title: "Does it work with Next.js or Remix?",
    body: "Yes to both. There are no framework-specific assumptions baked in.",
  },
  {
    title: "What about accessibility?",
    body: "Interactive primitives are built on React Aria, giving you full keyboard and screen-reader support out of the box.",
  },
];

export function MarketingTemplate() {
  const { isMobile, isDesktop } = useMediaQuery();
  const sectionPadding = isMobile ? "800" : "1600";
  const flexGap = isMobile ? "600" : "1200";
  const [pricingInterval, setPricingInterval] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const annualRatio = pricingInterval === "monthly" ? 1 : 11;
  const intervalLabel = pricingInterval === "monthly" ? "month" : "year";

  return (
    <div className="template-page-root">
      <Header />

      {/* Hero */}
      <Hero variant="brand" flexProps={{ gap: "400" }}>
        <TextTitleHero>Ship design systems faster</TextTitleHero>
        <TextSubheading>
          Hero, social proof, feature highlights, pricing, and CTA — all the
          sections a launch page needs, composed from SDS primitives.
        </TextSubheading>
        <ButtonGroup>
          <Button>Start free trial</Button>
          <Button variant="neutral">See the docs</Button>
        </ButtonGroup>
      </Hero>

      {/* Social proof strip */}
      <Section padding="800">
        <Flex container alignPrimary="center">
          <Text>
            Trusted by design teams at{" "}
            <strong>Acme</strong>, <strong>Globex</strong>,{" "}
            <strong>Initech</strong>, and <strong>Umbrella Corp</strong>.
          </Text>
        </Flex>
      </Section>

      {/* Feature highlights */}
      <Section variant="neutral" padding={sectionPadding}>
        <Flex container direction="column" gap={flexGap}>
          <Flex alignPrimary="center">
            <TextContentHeading
              align="center"
              heading="Everything in one layer"
              subheading="Tokens, primitives, compositions, and templates — each depending only on the layer below it."
            />
          </Flex>
          <Flex type="third" wrap gap="600">
            {FEATURES.map((f) => (
              <div key={f.heading} className="template-block">
                <Flex direction="column" gap="300">
                  <TextHeading>{f.heading}</TextHeading>
                  <Text>{f.body}</Text>
                </Flex>
              </div>
            ))}
          </Flex>
        </Flex>
      </Section>

      {/* Split content */}
      <Section padding={sectionPadding}>
        <Panel type="half" gap={flexGap} alignSecondary="center">
          <Image
            src={placeholder}
            alt="Diagram showing the SDS layer architecture"
            aspectRatio="4-3"
            size="medium"
          />
          <FlexItem size="half">
            <Flex direction="column" gap="600">
              <TextContentHeading
                heading="Built for real products"
                subheading="Not just a Storybook demo"
              />
              <Text>
                Every composition in SDS traces back to a production pattern.
                The Header, Footer, Forms, and these Templates are all live
                references — not hypotheticals.
              </Text>
              <Button variant="subtle">Read the case study</Button>
            </Flex>
          </FlexItem>
        </Panel>
      </Section>

      {/* Pricing */}
      <Section variant="neutral" padding={sectionPadding}>
        <Flex container direction="column" gap={flexGap} alignSecondary="stretch">
          <Flex alignPrimary="center">
            <TextContentHeading
              align="center"
              heading="Simple, transparent pricing"
              subheading="No hidden fees. Cancel anytime."
            />
          </Flex>
          <FlexItem>
            <Flex alignPrimary="center">
              <Navigation direction="row">
                <NavigationPill
                  isSelected={pricingInterval === "monthly"}
                  onPress={() => setPricingInterval("monthly")}
                >
                  Monthly
                </NavigationPill>
                <NavigationPill
                  isSelected={pricingInterval === "yearly"}
                  onPress={() => setPricingInterval("yearly")}
                >
                  Yearly
                </NavigationPill>
              </Navigation>
            </Flex>
          </FlexItem>
          <Flex type="third" wrap gap="600">
            {[
              { heading: "Free", price: 0, features: ["5 components", "Community support", "1 project"] },
              { heading: "Pro", price: 49, features: ["Unlimited components", "Priority support", "Unlimited projects"], brand: true },
              { heading: "Enterprise", price: 149, features: ["Custom tokens", "Dedicated support", "SSO + audit logs"] },
            ].map((tier) => (
              <div
                key={tier.heading}
                className={tier.brand ? "template-block template-block--brand" : "template-block"}
              >
                <Flex direction="column" gap="600">
                  <Flex direction="column" gap="200">
                    <TextHeading>{tier.heading}</TextHeading>
                    <TextPrice
                      currency="$"
                      price={(tier.price * annualRatio).toString()}
                      label={`/ ${intervalLabel}`}
                    />
                  </Flex>
                  <Flex direction="column" gap="200">
                    {tier.features.map((f) => (
                      <Text key={f}>{f}</Text>
                    ))}
                  </Flex>
                  <Button variant={tier.brand ? "primary" : "neutral"}>
                    Get started
                  </Button>
                </Flex>
              </div>
            ))}
          </Flex>
        </Flex>
      </Section>

      {/* FAQ */}
      <Section padding={sectionPadding}>
        <Flex container direction="column" gap={flexGap} alignSecondary="center">
          <TextContentHeading
            align="center"
            heading="Frequently asked questions"
            subheading="Can't find your answer? Reach out."
          />
          <FlexItem>
            <Flex container type="third" alignPrimary="center">
              <FlexItem size={isDesktop ? "major" : "full"}>
                <Accordion>
                  {FAQ_ITEMS.map((item) => (
                    <AccordionItem key={item.title} title={item.title}>
                      {item.body}
                    </AccordionItem>
                  ))}
                </Accordion>
              </FlexItem>
            </Flex>
          </FlexItem>
        </Flex>
      </Section>

      {/* Newsletter CTA */}
      <Section variant="brand" padding={sectionPadding}>
        <Flex
          container
          direction="column"
          alignPrimary="center"
          alignSecondary="center"
          gap="600"
          type="third"
        >
          <TextContentHeading
            align="center"
            heading="Stay in the loop"
            subheading="Get release notes and design tips straight to your inbox."
          />
          <Form singleLine>
            <Input aria-label="Email address" placeholder="you@example.com" />
            <Button variant="neutral">Subscribe</Button>
          </Form>
        </Flex>
      </Section>

      {/* Bottom CTA band */}
      <Section padding={sectionPadding}>
        <Flex
          container
          direction="column"
          alignPrimary="center"
          alignSecondary="center"
          gap="600"
        >
          <TextTitlePage>Ready to ship faster?</TextTitlePage>
          <Text>
            Use this CTA band for conversion moments after introducing product
            value.
          </Text>
          <ButtonGroup>
            <Button>Start free trial</Button>
            <Button variant="neutral">Talk to sales</Button>
          </ButtonGroup>
        </Flex>
      </Section>

      <Footer />
    </div>
  );
}
