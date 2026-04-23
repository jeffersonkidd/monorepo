import clsx from "clsx";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import "./templates.css";

export type BlankTemplateProps = ComponentPropsWithoutRef<"div"> & {
  header?: ReactNode;
  footer?: ReactNode;
  mainProps?: ComponentPropsWithoutRef<"main">;
};

export function BlankTemplate({
  children,
  className,
  footer,
  header,
  mainProps,
  ...props
}: BlankTemplateProps) {
  const { className: mainClassName, ...restMainProps } = mainProps ?? {};
  return (
    <div className={clsx(className, "template-page-root")} {...props}>
      {header}
      <main
        className={clsx(mainClassName, "template-main")}
        {...restMainProps}
      >
        {children}
      </main>
      {footer}
    </div>
  );
}
