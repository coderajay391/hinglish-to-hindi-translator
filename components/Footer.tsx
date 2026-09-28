import React from "react";
import { Languages, Heart } from "lucide-react";

interface FooterProps {
  onOpenAbout?: () => void;
}

export function Footer({ onOpenAbout }: FooterProps) {
  const popularKeywords = [
    "Hinglish to Hindi translation",
    "English to Shuddh Hindi",
    "Roman Hindi typing to Devanagari",
    "Office jana hai in Hindi",
    "Aap kaise ho in Hindi",
    "Kal meeting hai Hindi translation",
  ];

  return (
    <footer className="w-full border-t border-slate-200/80 bg-white py-12 mt-16 text-slate-500 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Languages className="w-4 h-4" />
              </div>
              <span>Hinglish to Hindi Converter</span>
            </div>
            <p className="text-slate-500 max-w-sm text-xs leading-relaxed">
              Convert English and Hinglish text into natural Hindi instantly with our free, smart linguistic converter.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-600">
            <a href="#converter-section" className="hover:text-indigo-600 transition-colors">
              Converter
            </a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">
              How it Works
            </a>
            <button
              onClick={onOpenAbout}
              className="hover:text-indigo-600 transition-colors"
            >
              About
            </button>
            <a href="#examples-section" className="hover:text-indigo-600 transition-colors">
              Examples
            </a>
          </div>
        </div>

        {/* Popular Tags / SEO Keywords */}
        <div className="pt-6 border-t border-slate-100">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Popular Searches
          </p>
          <div className="flex flex-wrap gap-2">
            {popularKeywords.map((kw, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 border border-slate-200/60"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© {new Date().getFullYear()} Hinglish to Hindi Converter. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted for pure, fluent Devanagari communication
          </p>
        </div>
      </div>
    </footer>
  );
}
