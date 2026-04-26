import clsx from "clsx";
import { ReactNode } from "react";
import { Sidebar } from "./sidebars";
import "./templates.css";

export type AppShellProps = {
  brand?: ReactNode;
  nav?: ReactNode;
  sidebarFooter?: ReactNode;
  topbar?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function AppShell({
  brand,
  nav,
  sidebarFooter,
  topbar,
  children,
  className,
}: AppShellProps) {
  return (
    <div className={clsx("template-page-root", className)}>
      <Sidebar brand={brand} footer={sidebarFooter}>
        {nav}
      </Sidebar>

      <main className="template-main" id="main-content" tabIndex={-1}>
        {topbar}
        {children}
      </main>
    </div>
  );
}