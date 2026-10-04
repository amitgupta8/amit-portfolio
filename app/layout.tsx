import "../app/globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { CommandPalette } from "@/components/CommandPalette";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CursorGlow } from "@/components/CursorGlow";
import { ChartFloatingButton } from "@/components/ChartFloatingButton";

export const metadata: Metadata = {
  title: "Amit.dev | AI • MERN • Full Stack Developer",
  description:
    "Recruiter-focused portfolio of Amit — AI, MERN and Full Stack Developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <ScrollProgress />
          <ScrollToTop />
          <CursorGlow />

          <Navbar />

          {children}

          <Footer />

          <CommandPalette />

          {/* Floating AI Portfolio Button */}
          <ChartFloatingButton />

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
            }}
          />
        </Providers>
      </body>
    </html>
  );
}