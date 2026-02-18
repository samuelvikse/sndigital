import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SN Digital",
  description: "SN Digital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="stylesheet" href="https://use.typekit.net/pen3frs.css" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
