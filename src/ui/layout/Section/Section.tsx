import clsx from "clsx";
import { Image } from "primitives";
import { ComponentPropsWithoutRef } from "react";
import "./section.css";

export type SectionProps = ComponentPropsWithoutRef<
  "section" | "header" | "footer"
> & {
  elementType?: "section" | "header" | "footer";
  padding?: "400" | "600" | "800" | "1200" | "1600" | "4000";
  paddingTop?: "400" | "600" | "800" | "1200" | "1600" | "4000";
  paddingBottom?: "400" | "600" | "800" | "1200" | "1600" | "4000";
} & (
    | {
        variant?: "brand" | "neutral" | "stroke" | "subtle";
        src?: undefined;
      }
    | {
        variant: "image";
        /**
         * An image src
         */
        src: string;
      }
  );
export function Section({
  children,
  className,
  elementType = "section",
  padding = "600",
  paddingBottom,
  paddingTop,
  ...props
}: SectionProps) {
  const classNames = clsx(
    className,
    "section",
    `section-variant-${props.variant}`,
    `section-padding-top-${paddingTop || padding}`,
    `section-padding-bottom-${paddingBottom || padding}`,
  );
  const image =
    props.variant === "image" ? (
      <Image
        alt="Background image"
        role="presentation"
        src={props.src}
        size="fill"
        aspectRatio="fill"
        className="section-image"
      />
    ) : null;
  switch (elementType) {
    case "section":
      return (
        <section className={classNames} {...props}>
          {image} {children}
        </section>
      );
    case "header":
      return (
        <header className={classNames} {...props}>
          {image} {children}
        </header>
      );
    case "footer":
      return (
        <footer className={classNames} {...props}>
          {image} {children}
        </footer>
      );
  }
}
