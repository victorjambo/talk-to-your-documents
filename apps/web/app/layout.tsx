import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talk to your documents",
  description: "AI Knowledge Base",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className="container mx-auto">{children}</body>
    </html>
  );
}
