import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Frontend Tops",
  description:
    "Frontend Tops is a list of the top frontend repositories on GitHub.",
  applicationName: "Frontend Tops",
  authors: [
    {
      name: "Danny Chen",
      url: "https://github.com/Dannyisadog/",
    },
  ],
  generator: "Next.js",
  keywords: ["frontend", "react", "vue", "angular", "javascript", "typescript"],
  openGraph: {
    type: "website",
    url: "https://frontendtops.dannyisadog.com",
    title: "Frontend Tops",
    description:
      "Frontend Tops is a list of the top frontend repositories on GitHub.",
    siteName: "Frontend Tops",
    images: [
      {
        url: "https://frontendtops.dannyisadog.com/favicon.ico",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
