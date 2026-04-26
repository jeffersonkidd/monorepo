/**
 * AppShell.tsx
 *
 * Correct app-shell template wired to <Sidebar>.
 * Drop your routes / page content into <AppShell> and swap the
 * placeholder brand / nav / footer slots for your real primitives.
 *
 * Layout anatomy
 * ─────────────────────────────────────────────────────────
 *  ┌──────────┬────────────────────────────────────────────┐
 *  │          │  <header>  topbar                          │
 *  │ Sidebar  ├────────────────────────────────────────────┤
 *  │  (rail)  │                                            │
 *  │          │  <main>  page content                      │
 *  │          │                                            │
 *  └──────────┴────────────────────────────────────────────┘
 *
 *  On mobile the sidebar collapses; the trigger button it renders
 *  is hoisted into the topbar via the `mobileTrigger` ref/slot pattern.
 */

import clsx from "clsx";
import { ReactNode } from "react";
import { Sidebar } from "./sidebars";
import "./app-shell.css";

// ─── Slot types ──────────────────────────────────────────────────────────────

export type AppShellProps = {
  /** Logo / wordmark area rendered at the top of the sidebar rail. */
  brand?: ReactNode;
  /**
   * Primary navigation. Wrap <NavItem> / <Navigation> in column direction.
   * Passed straight through as Sidebar children.
   */
  nav?: ReactNode;
  /** Utility items pinned to the sidebar bottom (settings, avatar, etc.). */
  sidebarFooter?: ReactNode;
  /** Content rendered inside the top bar (search, actions, breadcrumb…). */
  topbar?: ReactNode;
  /** Page content — swap for <Outlet /> when using React Router / TanStack. */
  children?: ReactNode;
  className?: string;
};

// ─── Shell ───────────────────────────────────────────────────────────────────

export function AppShell({
  brand,
  nav,
  sidebarFooter,
  topbar,
  children,
  className,
}: AppShellProps) {
  return (
    <div className={clsx("app-shell", className)}>
      {/*
       * Sidebar
       * – renders as a sticky <aside> on desktop
       * – collapses to a DialogModal drawer on mobile and injects
       *   its own trigger button (the trigger floats in the topbar
       *   via CSS absolute positioning; see app-shell.css)
       */}
      <Sidebar
        brand={brand}
        footer={sidebarFooter}
        triggerLabel="Open navigation"
      >
        {nav}
      </Sidebar>

      {/* Right-hand column: topbar + scrollable content */}
      <div className="app-shell-body">
        <header className="app-shell-topbar">
          {/*
           * On mobile the sidebar-trigger button is rendered by <Sidebar>
           * and positioned with CSS into this topbar region.
           * Reserve the left slot for it; your topbar content follows.
           */}
          <div className="app-shell-topbar-start" aria-hidden />
          <div className="app-shell-topbar-content">{topbar}</div>
        </header>

        <main className="app-shell-main" id="main-content" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
