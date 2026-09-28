import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hindi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hinglish to Hindi Converter – Convert English & Hinglish to Hindi",
  description:
    "Convert English and Hinglish text into natural Hindi instantly with our free Hinglish to Hindi converter. Powered by intelligent linguistic parsing and standard Devanagari vocabulary.",
  keywords: [
    "Hinglish to Hindi",
    "English to Hindi converter",
    "Roman Hindi to Devanagari",
    "Hinglish translator",
    "Hindi typing online",
    "shuddh hindi converter",
  ],
  authors: [{ name: "Hinglish to Hindi Converter" }],
  openGraph: {
    title: "Hinglish to Hindi Converter – Convert English & Hinglish to Hindi",
    description:
      "Convert English and Hinglish text into natural Hindi instantly with our free Hinglish to Hindi converter.",
    type: "website",
    locale: "en_US",
    siteName: "Hinglish to Hindi Converter",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hinglish to Hindi Converter – Convert English & Hinglish to Hindi",
    description:
      "Convert English and Hinglish text into natural Hindi instantly with our free Hinglish to Hindi converter.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Hinglish to Hindi Converter",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "description":
      "Convert English and Hinglish text into natural Hindi instantly with our free Hinglish to Hindi converter.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "featureList": [
      "Hinglish to pure Hindi conversion",
      "Devanagari script rendering",
      "One-click copy and text download",
      "Voice pronunciation support",
      "Vocabulary style customization (Pure vs Conversational)",
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${notoDevanagari.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
        {children}
      </body>
    </html>
  );
}
