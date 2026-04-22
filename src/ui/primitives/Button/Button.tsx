import { clsx } from "clsx";
import React, { ComponentPropsWithoutRef } from "react";
import {
  Button as RACButton,
  Link as RACLink,
  type ButtonProps as RACButtonProps,
} from "react-aria-components";
import "./button.css";

type ButtonCommonProps = {
  type?: ComponentPropsWithoutRef<"button">["type"];
  size?: "small" | "medium";
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

type ButtonLinkProps = Omit<
  ComponentPropsWithoutRef<typeof RACLink>,
  "children" | "style" | "className" | "render"
> & ButtonCommonProps;

type ButtonNativeProps = Omit<
  RACButtonProps,
  "children" | "style" | "className" | "render"
> & ButtonCommonProps;

export type ButtonProps =
  | (ButtonLinkProps & {
      variant?: "primary" | "neutral" | "subtle";
    })
  | (ButtonNativeProps & {
      variant?: "primary" | "neutral" | "subtle";
    });
export const Button = React.forwardRef<HTMLElement, ButtonProps>(function Button(
  { className, size = "medium", variant = "primary", ...props }: ButtonProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const classNames = clsx(
    className,
    "button",
    `button-size-${size}`,
    `button-variant-${variant}`,
  );

  return isAnchorProps(props) ? (
    <RACLink
      {...(props as ComponentPropsWithoutRef<typeof RACLink>)}
      className={classNames}
      ref={ref as React.ForwardedRef<HTMLAnchorElement>}
    >
      {props.children}
    </RACLink>
  ) : (
    <RACButton
      {...(props as RACButtonProps)}
      className={classNames}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
    >
      {props.children}
    </RACButton>
  );
});

export type ButtonDangerProps =
  | (ButtonLinkProps & {
      variant?: "danger-primary" | "danger-subtle";
    })
  | (ButtonNativeProps & {
      variant?: "danger-primary" | "danger-subtle";
    });
/**
 * Only used for destructive actions
 */
export const ButtonDanger = React.forwardRef<HTMLElement, ButtonDangerProps>(function Button(
  {
    className,
    size = "medium",
    variant = "danger-primary",
    ...props
  }: ButtonDangerProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const classNames = clsx(
    className,
    "button",
    `button-size-${size}`,
    `button-variant-${variant}`,
  );

  return isAnchorProps(props) ? (
    <RACLink
      {...(props as ComponentPropsWithoutRef<typeof RACLink>)}
      className={classNames}
      ref={ref as React.ForwardedRef<HTMLAnchorElement>}
    >
      {props.children}
    </RACLink>
  ) : (
    <RACButton
      {...(props as RACButtonProps)}
      className={classNames}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
    >
      {props.children}
    </RACButton>
  );
});

function isAnchorProps(
  props: ButtonProps | ButtonDangerProps,
): props is ButtonLinkProps {
  return "href" in props && props.href !== undefined;
}

export type ButtonGroupProps = React.ComponentPropsWithoutRef<"div"> & {
  align?: "start" | "end" | "center" | "justify" | "stack";
};
export const ButtonGroup = ({
  align = "start",
  className,
  ...props
}: ButtonGroupProps) => {
  const classNames = clsx(
    className,
    "button-group",
    `button-group-align-${align}`,
  );
  return <div className={classNames} {...props} />;
};
