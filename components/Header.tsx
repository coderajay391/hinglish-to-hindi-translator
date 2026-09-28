"use client";

import React, { useState } from "react";
import { Languages, HelpCircle, Info, Home, Sparkles, Menu, X } from "lucide-react";

interface HeaderProps {
  onOpenAbout?: () => void;
}

export function Header({ onOpenAbout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Languages className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900">
                  Hinglish <span className="text-indigo-600">→</span> Hindi
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200/60">
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  Devanagari
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Type in English or Hinglish and convert it into natural Hindi.
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium text-slate-600">
            <button
              onClick={() => scrollToSection("converter-section")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <Home className="w-4 h-4 text-slate-400" />
              Home
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              How it Works
            </button>
            <button
              onClick={onOpenAbout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <Info className="w-4 h-4 text-slate-400" />
              About
            </button>

            <div className="h-5 w-px bg-slate-200 mx-2" />

            <a
              href="#examples-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("examples-section");
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
            >
              Try Examples
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 space-y-1 shadow-lg">
          <p className="text-xs text-slate-500 pb-2 border-b border-slate-100">
            Type in English or Hinglish and convert it into natural Hindi.
          </p>
          <button
            onClick={() => scrollToSection("converter-section")}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 text-left"
          >
            <Home className="w-4 h-4 text-slate-400" />
            Home
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 text-left"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            How it Works
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAbout?.();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 text-left"
          >
            <Info className="w-4 h-4 text-slate-400" />
            About
          </button>
        </div>
      )}
    </header>
  );
}
