import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/shared/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aetheria.app"),
  title: {
    default: "Aetheria — Intelligent Digital Experiences",
    template: "%s | Aetheria",
  },
  description: "Premium digital solutions powered by intelligence. Transform your vision into reality with Aetheria's cutting-edge platform.",
  openGraph: {
    title: "Aetheria — Intelligent Digital Experiences",
    description: "Premium digital solutions powered by intelligence.",
    type: "website",
    locale: "en_US",
    siteName: "Aetheria",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aetheria — Intelligent Digital Experiences",
    description: "Premium digital solutions powered by intelligence.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" suppressHydrationWarning className="dark">
        <body className={`${fontSans.variable} font-sans antialiased bg-[#0a0a0f] text-white`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
  );
}
