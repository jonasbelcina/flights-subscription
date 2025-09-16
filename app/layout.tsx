import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cheap Flights Winnipeg",
  description: "Hand-picked cheap flight deals from Winnipeg with instant alerts.",
  metadataBase: new URL("https://cheap-flights-winnipeg.vercel.app"),
  openGraph: {
    title: "Cheap Flights Winnipeg",
    description: "Hand-picked cheap flight deals from Winnipeg with instant alerts.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cheap Flights Winnipeg",
    description: "Hand-picked cheap flight deals from Winnipeg with instant alerts.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}


