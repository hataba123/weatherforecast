import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const headingFont = Space_Grotesk({
  variable: "--font-head",
  subsets: ["latin"],
});

const codeFont = IBM_Plex_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "WeatherForecast - Dự báo Thời tiết Real-time",
    template: "%s | WeatherForecast",
  },
  description: "Ứng dụng dự báo thời tiết thời gian thực mượt mà, chính xác và đầy đủ các chỉ số khí quyển.",
  applicationName: "WeatherForecast",
  keywords: ["weather", "forecast", "dự báo thời tiết", "thời tiết việt nam"],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "WeatherForecast",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0284c7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${bodyFont.variable} ${headingFont.variable} ${codeFont.variable} h-full antialiased`}
    >
      <body className="min-h-full selection:bg-sky-400/30 selection:text-white">{children}</body>
    </html>
  );
}
