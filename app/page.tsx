"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Converter } from "@/components/Converter";
import { HowItWorks } from "@/components/HowItWorks";
import { AboutModal } from "@/components/AboutModal";
import { Footer } from "@/components/Footer";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

export default function HomePage() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is Hinglish, and how does this converter handle it?",
      a: "Hinglish is Hindi written using the Roman alphabet (e.g., 'mujhe kal office jana hai'). Unlike basic phonetic tools that mechanically substitute characters, our engine understands the full semantic meaning and transforms it into proper Hindi grammar in Devanagari script (मुझे कल कार्यालय जाना है).",
    },
    {
      q: "Can I enter standard English sentences?",
      a: "Yes! The system automatically detects whether your input is English ('I am going to the market'), Hinglish ('mujhe market jana hai'), or a combination ('today weather bahut acha hai'), translating all of them accurately into natural Hindi.",
    },
    {
      q: "What is the difference between 'Pure Hindi' and 'Conversational' modes?",
      a: "'Pure Hindi' (मानक हिन्दी) prioritizes authentic Hindi vocabulary over English loanwords (e.g. converting 'office' into 'कार्यालय' and 'meeting' into 'बैठक'). 'Conversational' mode maintains common everyday colloquial terms in Devanagari (जैसे 'ऑफिस' या 'मीटिंग').",
    },
    {
      q: "Are brand names and proper nouns preserved?",
      a: "Yes. Names of people (e.g., Ajay → अजय), companies (Google, Apple), and technical terms are preserved or appropriately transliterated rather than awkwardly converted.",
    },
    {
      q: "Is there any cost or character limit?",
      a: "The converter is completely free to use. You can convert up to 5,000 characters per request, which is suitable for paragraphs, emails, and full messages.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Header */}
      <Header onOpenAbout={() => setIsAboutOpen(true)} />

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 space-y-12">
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50/80 text-indigo-700 border border-indigo-200/60 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Fast, Natural & Pure Devanagari Translation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Convert English & Hinglish into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800">
              Natural Hindi
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Type however you speak—in Roman Hindi, English, or mixed slang. Get authentic,
            grammatically polished Hindi in authentic Devanagari script.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Pure Hindi Vocabulary
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Standard Devanagari Font
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              One-click Copy & Audio
            </span>
          </div>
        </section>

        {/* Centerpiece Converter Section */}
        <section>
          <Converter />
        </section>

        {/* How It Works Section */}
        <HowItWorks />

        {/* FAQ Section */}
        <section className="w-full py-8 border-t border-slate-200/80">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600">
                <HelpCircle className="w-4 h-4" />
                Frequently Asked Questions
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Everything you need to know
              </h2>
            </div>

            <div className="space-y-3 pt-2">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-200/80 bg-white rounded-2xl overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-semibold text-slate-900 hover:text-indigo-600 focus:outline-none transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
                          isOpen ? "rotate-180 text-indigo-600" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onOpenAbout={() => setIsAboutOpen(true)} />

      {/* About Modal */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
}
