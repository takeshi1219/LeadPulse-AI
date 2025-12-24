import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "LeadPulse AI - AI-Powered B2B Sales Intelligence",
    template: "%s | LeadPulse AI",
  },
  description:
    "Transform your sales pipeline with AI-powered lead generation, intelligent scoring, and actionable insights. LeadPulse AI helps B2B teams close more deals faster.",
  keywords: [
    "B2B sales",
    "lead generation",
    "AI sales",
    "sales intelligence",
    "lead scoring",
    "CRM",
  ],
  authors: [{ name: "LeadPulse AI" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://leadpulse.ai",
    siteName: "LeadPulse AI",
    title: "LeadPulse AI - AI-Powered B2B Sales Intelligence",
    description:
      "Transform your sales pipeline with AI-powered lead generation, intelligent scoring, and actionable insights.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LeadPulse AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadPulse AI - AI-Powered B2B Sales Intelligence",
    description:
      "Transform your sales pipeline with AI-powered lead generation.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
