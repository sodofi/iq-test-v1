import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const frameMetadata = {
  version: "next",
  imageUrl: "https://iq-test-v1.vercel.app/image.png",
  button: {
    title: "Start IQ Test",
    action: {
      type: "launch_frame",
      name: "IQ Test",
      url: "https://iq-test-v1.vercel.app",
      splashImageUrl: "https://iq-test-v1.vercel.app/icon.png",
      splashBackgroundColor: "#4F46E5"
    }
  }
};

export const metadata: Metadata = {
  title: "IQ Test - Powered by Farcaster",
  description: "Test your IQ and get instant results",
  other: {
    "fc:frame": JSON.stringify(frameMetadata),
    "og:image": "https://iq-test-v1.vercel.app/image.png",
    "og:title": "IQ Test",
    "og:description": "Test your IQ and get instant results with CELO payment"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
