import { Footer, Header } from "compositions";
import { Section } from "layout";
import {
  Button,
  ButtonGroup,
  Text,
  TextHeading,
  TextSmall,
  TextTitlePage,
} from "primitives";
import { useState } from "react";
import { AppShellTemplate } from "./AppShellTemplate";
import { AuthTemplate } from "./AuthTemplate";
import { BlankTemplate } from "./BlankTemplate";
import { MarketingTemplate } from "./MarketingTemplate";
import "./templates.css";

const templateOptions = [
  {
    id: "blank",
    label: "Blank",
    description:
      "Bare page scaffolding — vertical column with main, plus optional Header/Footer slots.",
  },
  {
    id: "app-shell",
    label: "App Shell",
    description: "Workspace layout with navigation, main content, and utility space.",
  },
  {
    id: "auth",
    label: "Auth",
    description: "Sign-in flow with a form panel and supporting trust content.",
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Launch page structure with hero, features, pricing, FAQ, and CTA.",
  },
] as const;

type TemplateOptionId = (typeof templateOptions)[number]["id"];

export function Templates() {
  const [activeTemplate, setActiveTemplate] =
    useState<TemplateOptionId>("blank");

  return (
    <div className="template-showcase-page">
      <Section padding="800" variant="neutral">
        <div className="template-showcase-intro">
          <TextTitlePage>Template demos</TextTitlePage>
          <Text>
            Preview the template layer with a switchable showcase. Each demo
            uses the reusable template components directly, so this page doubles
            as a living smoke test.
          </Text>
          <ButtonGroup align="start">
            {templateOptions.map((option) => (
              <Button
                key={option.id}
                variant={activeTemplate === option.id ? "primary" : "neutral"}
                onPress={() => setActiveTemplate(option.id)}
              >
                {option.label}
              </Button>
            ))}
          </ButtonGroup>
          <div className="template-showcase-meta">
            <TextSmall>
              {templateOptions.find((o) => o.id === activeTemplate)?.description}
            </TextSmall>
          </div>
        </div>
      </Section>

      <div className="template-showcase-preview">
        {activeTemplate === "blank" && (
          <BlankTemplate header={<Header />} footer={<Footer />}>
            <Section padding="1200">
              <TextHeading>Blank template</TextHeading>
              <Text>
                The minimum scaffolding: a full-height column with a
                flex-filling <code>&lt;main&gt;</code>. Drop in your own
                sections, or omit the Header/Footer entirely for a true
                empty canvas.
              </Text>
            </Section>
          </BlankTemplate>
        )}
        {activeTemplate === "auth" && <AuthTemplate />}
        {activeTemplate === "marketing" && <MarketingTemplate />}
        {activeTemplate === "app-shell" && <AppShellTemplate />}
      </div>
    </div>
  );
}
