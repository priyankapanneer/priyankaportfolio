import type { Metadata } from "next";
import { Inter, Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Background } from "@/components/Background";
import { ContentProvider } from "@/context/ContentContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Priyanka Panneerselvam | Full Stack Innovator",
  description: "Official Portfolio of Priyanka Panneerselvam - Building digital experiences with code and creativity.",
  icons: {
    icon: "/icon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${outfit.variable} antialiased transition-colors duration-300 font-sans`}
        onContextMenu={e => e.preventDefault()}
      >
        <ContentProvider>
          <Background />
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          {children}
        </ContentProvider>
      </body>
    </html>
  );
}
