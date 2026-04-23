import clsx from "clsx";
import { useMediaQuery } from "hooks";
import { IconMenu, IconX } from "icons";
import { Dialog, DialogModal, IconButton } from "primitives";
import { ReactNode, useState } from "react";
import "./sidebars.css";

export type SidebarProps = {
  brand?: ReactNode;
  children?: ReactNode;
  className?: string;
  footer?: ReactNode;
  triggerLabel?: string;
};

/**
 * App-shell rail. Renders a sticky `<aside>` on desktop and collapses to a
 * left-anchored drawer (with its own trigger) below the tablet breakpoint.
 *
 * Pass a column-direction `<Navigation>` as children. `brand` and `footer`
 * are optional slots for top labelling and bottom utility content.
 */
export function Sidebar({
  brand,
  children,
  className,
  footer,
  triggerLabel = "Open navigation",
}: SidebarProps) {
  const { isTabletDown } = useMediaQuery();
  const [open, setOpen] = useState(false);

  if (isTabletDown) {
    return (
      <>
        <IconButton
          className={clsx(className, "sidebar-trigger")}
          variant="subtle"
          aria-label={triggerLabel}
          onPress={() => setOpen(true)}
        >
          <IconMenu />
        </IconButton>
        <DialogModal isOpen={open} onOpenChange={setOpen} isDismissable>
          <Dialog className="sidebar-drawer">
            <IconButton
              className="sidebar-drawer-close"
              variant="subtle"
              aria-label="Close navigation"
              onPress={() => setOpen(false)}
            >
              <IconX />
            </IconButton>
            <SidebarContents brand={brand} footer={footer}>
              {children}
            </SidebarContents>
          </Dialog>
        </DialogModal>
      </>
    );
  }

  return (
    <aside className={clsx(className, "sidebar")} aria-label="Sidebar">
      <SidebarContents brand={brand} footer={footer}>
        {children}
      </SidebarContents>
    </aside>
  );
}

type SidebarContentsProps = {
  brand?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
};

function SidebarContents({ brand, children, footer }: SidebarContentsProps) {
  return (
    <>
      {brand && <div className="sidebar-brand">{brand}</div>}
      <div className="sidebar-content">{children}</div>
      {footer && <div className="sidebar-footer">{footer}</div>}
    </>
  );
}
