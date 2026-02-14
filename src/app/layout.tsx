import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ENFP Developer Portfolio",
  description: "열정적인 개발자의 포트폴리오",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
