import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LifeBookMom Brain",
  description: "생활백서맘 통합 운영본부",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
