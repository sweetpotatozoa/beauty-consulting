import type { Metadata } from "next";
import { Noto_Serif_TC } from "next/font/google";
import "./globals.css";

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  subsets: ["chinese-traditional"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "戀愛顏值測試 - K-Beauty AI 컨설팅",
  description: "AI 기반 K-Beauty 스타일링 분석 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${notoSerifTC.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
