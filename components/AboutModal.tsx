"use client";

import React from "react";
import { X, CheckCircle, ShieldCheck, Zap, Sparkles, BookOpen } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-dialog-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 pr-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
            <Sparkles className="w-3 h-3" />
            About the App
          </div>
          <h3 id="about-dialog-title" className="text-xl font-bold text-slate-900 tracking-tight">
            Hinglish to Hindi Converter
          </h3>
          <p className="text-xs text-slate-500">
            A specialized linguistic converter for English and Roman Hindi to authentic Devanagari script.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          <p>
            Millions of people in India and globally type Hindi using the English Roman keyboard (commonly called <strong>Hinglish</strong>). However, existing tools either do crude phonetic transliteration (giving clumsy loanword spellings) or standard English translation that fails on Roman Hindi phrases.
          </p>

          <p>
            <strong>Hinglish to Hindi Converter</strong> bridges this gap by interpreting contextual grammar, sentence structure, and vocabulary nuances:
          </p>

          <ul className="space-y-2.5 pt-1">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Pure Hindi Vocabulary:</strong> Intelligently replaces English loanwords with standard Hindi terms (e.g. <em>office</em> → कार्यालय, <em>meeting</em> → बैठक) when pure mode is enabled.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Understands Both Hinglish & English:</strong> Seamlessly handles mixed sentences such as &ldquo;kal urgent meeting me jarur aana&rdquo;.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Privacy & Security:</strong> No text is permanently stored on external servers. All API credentials remain strictly protected on the backend.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Audio & Sharing:</strong> Integrated Hindi speech synthesis and one-click copy/download make sharing Hindi messages effortless.
              </span>
            </li>
          </ul>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
