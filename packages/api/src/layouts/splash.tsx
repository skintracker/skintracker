import Navigation, { NavigationItem } from "@/components/navigation";
import { STUser } from "@skintracker/types/src";

export interface SplashLayoutProps {
  children: JSX.Element | JSX.Element[];
  title: string;
  user?: STUser;
}

export function SplashLayout({ children, title, user }: SplashLayoutProps) {
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
          <link rel="stylesheet" href="/public/css/styles.e2ceca52.css" />
          <link rel="stylesheet" href="/public/css/global.css" />
          <link rel="stylesheet" href="/public/css/splash.css" />
        </>
      );
    return (
      <>
        <script src="/public/js/tailwind-3.4.1.js" />
        <link rel="stylesheet" href="/public/css/global.dev.css" />
        <link rel="stylesheet" href="/public/css/splash.css" />
      </>
    );
  };
  const el = (
    <html lang="en">
      <head>
        <title safe>Skintracker | {title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charset="UTF-8" />
        <script src="/public/js/htmx-1.9.10.js" defer />
        <script src="/public/js/hyperscript-0.9.12.js" defer />
        <script src="/public/js/loading-states.js" />
        <link rel="stylesheet" href="/public/font/font.css" />
        {styles()}
      </head>
      <body class="font-sans font-normal" hx-ext="loading-states">
        <Navigation items={navItems} user={user} />
        <main>{children}</main>
      </body>
    </html>
  );
  return `<!DOCTYPE html>${el}`;
}

export default SplashLayout;
