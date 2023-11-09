import Navigation, { NavigationItem } from "@/components/navigation";

export interface BaseLayoutProps {
  children: JSX.Element | JSX.Element[];
  title: string;
}

export function BaseLayout({ children, title }: BaseLayoutProps) {
  const navItems: NavigationItem[] = [];
  if (Bun.env.NODE_ENV !== "production") {
    navItems.push({
      name: "Developer",
      route: "/developer",
    });
  }
  const styles = () => {
    if (Bun.env.NODE_ENV === "production")
      return <link rel="stylesheet" href="/public/css/styles.css" />;
    return (
      <>
        <script src="/public/js/tailwind.js" />
        <style>
          {`
					.font-sans {
						font-family: "Basier Square", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important;
					}
					.font-mono {
						font-family: "Basier Square Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
					}
				`}
        </style>
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
        <link rel="stylesheet" href="/public/font/font.css" />
        {styles()}
      </head>
      <body class="font-sans font-normal">
        <Navigation items={navItems} />
        <main class="py-2 px-8">{children}</main>
      </body>
    </html>
  );
  return `<!DOCTYPE html>${el}`;
}

export default BaseLayout;
