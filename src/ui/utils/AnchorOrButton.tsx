import React, {
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
} from "react";
import {
  Button as RACButton,
  Link as RACLink,
  type ButtonProps as RACButtonProps,
} from "react-aria-components";

export type AnchorOrButtonSharedProps = {
  children?: React.ReactNode;
};

export type AnchorOrButtonProps =
  | (RACButtonProps & AnchorOrButtonSharedProps)
  | (ComponentPropsWithoutRef<typeof RACLink> & AnchorOrButtonSharedProps);

function isAnchorProps(
  props: AnchorOrButtonProps,
): props is ComponentPropsWithoutRef<typeof RACLink> & AnchorOrButtonSharedProps {
  return "href" in props && props.href !== undefined;
}

export const AnchorOrButton = forwardRef(function AnchorOrButton(
  props: AnchorOrButtonProps,
  ref: ForwardedRef<HTMLElement>,
) {
  return isAnchorProps(props) ? (
    <RACLink
      {...(props as ComponentPropsWithoutRef<typeof RACLink>)}
      className={props.className}
      ref={ref as React.ForwardedRef<HTMLAnchorElement>}
    >
      {props.children}
    </RACLink>
  ) : (
    <RACButton
      {...(props as RACButtonProps)}
      className={props.className}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
    >
      {props.children}
    </RACButton>
  );
});
