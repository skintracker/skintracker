export interface BaseLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Skintracker</title>
        <script src="/public/js/htmx.js" />
        <script src="/public/js/tailwind.js" />
      </head>
      <body>{children}</body>
    </html>
  );
}
