import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import LoginPopup from "@/components/LoginPopup";

const inter = Inter({ subsets: ["latin"] });

// ✅ Move metadata to a server component (correct approach)
export const metadata: Metadata = {
  title: "AI-Powered Personal Branding Assistant",
  description: "Build and manage your personal brand with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col ">
            <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center">
                <div className="mr-4 flex">
                  <Link className="mr-6 flex items-center space-x-2" href="/">
                    <span className="font-bold text-xl">NexRise</span>
                  </Link>
                  <nav className="flex items-center space-x-6 text-sm font-medium">
                    <Link
                      href="/features"
                      className="transition-colors hover:text-primary"
                    >
                      Features
                    </Link>
                    <Link
                      href="/roadmap"
                      className="transition-colors hover:text-primary"
                    >
                      Roadmap
                    </Link>

                    <Link
                      href="/ai_content_generator"
                      className="transition-colors hover:text-primary"
                    >
                      AI Content Generator
                    </Link>
                    <Link
                      href="/pricing"
                      className="transition-colors hover:text-primary"
                    >
                      Pricing
                    </Link>
                  </nav>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                  {/* ✅ Import the separate login popup */}
                  <LoginPopup />
                </div>
              </div>
            </header>
            <main className="flex-1 bg-background">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
