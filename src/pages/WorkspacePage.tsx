
import { AppShell } from "templates";
import { Navigation, NavItem, Logo } from "primitives";

 export function WorkspacePage() {
   return (
     <AppShell
       brand={<Logo />}
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
        <HomePage />
      </AppShell>
    );
  }