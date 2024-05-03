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
      return <link rel="stylesheet" href="/public/css/styles.78904d4c.css" />;
    return (
      <>
        <script src="/public/js/tailwind-3.4.1.js" />
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
        <script src="/public/js/htmx-1.9.10.js" defer />
        <script src="/public/js/hyperscript-0.9.12.js" defer />
        <script src="/public/js/loading-states.js" defer />
        <link rel="icon" href="/public/svg/icon.svg" type="image/svg+xml" />
        <link rel="stylesheet" href="/public/css/font.css" />
        <link rel="stylesheet" href="/public/css/global.css" />
        <link rel="stylesheet" href="/public/css/splash.css" />
        {styles()}
      </head>
      <body hx-ext="loading-states" hx-boost="true">
        <Navigation items={navItems} user={user} />
        <main>{children}</main>
      </body>
    </html>
  );
  return `<!DOCTYPE html>${el}`;
}

export default SplashLayout;
