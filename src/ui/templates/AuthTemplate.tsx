import clsx from "clsx";
import { Footer, FormBox, Header } from "compositions";
import { useMediaQuery } from "hooks";
import { Flex, FlexItem, Section } from "layout";
import {
  Button,
  ButtonGroup,
  CheckboxField,
  FieldGroup,
  InputField,
  Text,
  TextHeading,
  TextLink,
  TextListItem,
  TextLinkList,
  TextSmall,
  TextTitlePage,
} from "primitives";
import { type FormEvent } from "react";
import "./templates.css";

export function AuthTemplate() {
  const { isTabletDown } = useMediaQuery();

  return (
    <div className="template-page-root">
      <Header />

      <Section variant="neutral" padding={isTabletDown ? "800" : "1200"}>
        <Flex
          container
          type="half"
          gap="800"
          wrap={isTabletDown}
          alignSecondary={isTabletDown ? "start" : "stretch"}
        >
          {/* Sign-in panel */}
          <FlexItem>
            <div className="template-block">
              <Flex direction="column" gap="600">
                <Flex direction="column" gap="200">
                  <TextTitlePage>Welcome back</TextTitlePage>
                  <Text>
                    Sign in to continue to your team workspace and pick up where
                    you left off.
                  </Text>
                </Flex>

                <FormBox
                  onSubmit={(event: FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const data = Object.fromEntries(
                      new FormData(event.currentTarget),
                    );
                    console.log("Auth form data", data);
                  }}
                >
                  <FieldGroup>
                    <InputField name="email" type="email" label="Email" />
                    <InputField
                      name="password"
                      type="password"
                      label="Password"
                    />
                    <CheckboxField name="remember">Remember me</CheckboxField>
                  </FieldGroup>
                  <ButtonGroup align="justify">
                    <Button type="submit">Sign in</Button>
                  </ButtonGroup>
                </FormBox>

                <TextSmall>
                  Don&apos;t have an account?{" "}
                  <TextLink href="#">Create one</TextLink>
                  {" · "}
                  <TextLink href="#">Forgot password?</TextLink>
                </TextSmall>
              </Flex>
            </div>
          </FlexItem>

          {/* Trust / benefits panel */}
          <FlexItem>
            <div className={clsx("template-block", "auth-benefits")}>
              <Flex direction="column" gap="600">
                <TextHeading>Why teams use Monofly SDS</TextHeading>
                <TextLinkList>
                  <TextListItem>
                    Fast design-to-code handoff with shared primitives.
                  </TextListItem>
                  <TextListItem>
                    Responsive defaults for production-ready interfaces.
                  </TextListItem>
                  <TextListItem>
                    Composable patterns that scale across products.
                  </TextListItem>
                  <TextListItem>
                    Token-driven theming — change brand colour in one place.
                  </TextListItem>
                </TextLinkList>
              </Flex>
            </div>
          </FlexItem>
        </Flex>
      </Section>

      <Footer />
    </div>
  );
}
