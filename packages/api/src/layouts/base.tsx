import Navigation, { NavigationItem } from "@/components/navigation";
import { STUser } from "@skintracker/types/src";

export interface BaseLayoutProps {
  children: JSX.Element | JSX.Element[];
  title: string;
  user?: STUser;
}

export function BaseLayout({ children, title, user }: BaseLayoutProps) {
  const navItems: NavigationItem[] = [];
  if (Bun.env.NODE_ENV !== "production") {
    navItems.push({
      name: "Developer",
      route: "/developer",
    });
  }
  const styles = () => {
    if (Bun.env.NODE_ENV === "production")
      return (
        <>
          <link rel="stylesheet" href="/public/css/styles.css" />
          <link rel="stylesheet" href="/public/css/global.css" />
        </>
      );
    return (
      <>
        <script src="/public/js/tailwind.js" />
        <link rel="stylesheet" href="/public/css/global.dev.css" />
      </>
    );
  };
  const el = (
    <html lang="en">
      <head>
        <title safe>Skintracker | {title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charset="UTF-8" />
        <script src="/public/js/htmx.js" />
        <script src="/public/js/hyperscript.js" />
        <script src="/public/js/loading-states.js" />
        <link rel="stylesheet" href="/public/font/font.css" />
        {styles()}
      </head>
      <body class="font-sans font-normal" hx-ext="loading-states">
        <Navigation items={navItems} user={user} />
        <main class="py-2 px-8">{children}</main>
      </body>
    </html>
  );
  return `<!DOCTYPE html>${el}`;
}

export default BaseLayout;
