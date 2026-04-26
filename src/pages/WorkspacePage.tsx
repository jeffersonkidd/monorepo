
import { AppShell } from "templates";
import { Navigation, NavItem } from "primitives";

 export function AppPage() {
    return (
      <AppShell
        brand={<p>Brand</p>}
        nav={
          <Navigation direction="column">
            <NavItem href="/"        icon={<IconHome />}     label="Home"     />
            <NavItem href="/projects" icon={<IconFolder />}  label="Projects" />
            <NavItem href="/docs"    icon={<IconBook />}     label="Docs"     />
          </Navigation>
        }
        sidebarFooter={
          <Navigation direction="column">
            <NavItem href="/settings" icon={<IconSettings />} label="Settings" />
            <UserAvatar />
          </Navigation>
        }
        topbar={
          <>
            <SearchBar />
            <NotificationBell />
          </>
        }
      >
        <Outlet />   // ← React Router / TanStack Router outlet
      </AppShell>
    );
  }