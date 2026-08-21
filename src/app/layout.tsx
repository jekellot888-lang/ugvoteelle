import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const displaySerif = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://voteelle.ug"),
  title: "Vote Elle Uganda | Team Elle",
  description:
    "Back Trivia Elle Muhoza, Miss Uganda at Miss World. Vote on 1VOTE, then bring more supporters into Team Elle.",
  openGraph: {
    title: "Vote Elle Uganda",
    description:
      "Uganda is at Miss World. Back Trivia Elle Muhoza and bring more supporters into Team Elle.",
    url: "https://voteelle.ug",
    siteName: "Vote Elle Uganda",
    images: ["/images/elle-official-portrait-placeholder.svg"],
    locale: "en_UG",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${displaySerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
