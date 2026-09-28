import React from "react";
import {
  BrainCircuit,
  Languages,
  CheckCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Volume2,
} from "lucide-react";

export function HowItWorks() {
  const comparisonItems = [
    {
      input: "mujhe kal office jana hai",
      literalTransliteration: "मुझे कल ऑफिस जाना है",
      pureHindi: "मुझे कल कार्यालय जाना है",
      note: "Standard Hindi vocabulary (कार्यालय) selected over loanword.",
    },
    {
      input: "aaj urgent meeting hai",
      literalTransliteration: "आज अर्जेंट मीटिंग है",
      pureHindi: "आज आवश्यक बैठक है",
      note: "Urgent → आवश्यक, Meeting → बैठक for pristine formal Hindi.",
    },
    {
      input: "today weather bahut acha hai",
      literalTransliteration: "टुडे वेदर बहुत अच्छा है",
      pureHindi: "आज मौसम बहुत अच्छा है",
      note: "Blended Hinglish/English smoothly parsed into standard Hindi syntax.",
    },
    {
      input: "aap kaise ho",
      literalTransliteration: "आप कैसे हो",
      pureHindi: "आप कैसे हैं",
      note: "Grammatical honorific correction ('हैं' instead of colloquial 'हो').",
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-12 border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
            <Sparkles className="w-3.5 h-3.5" />
            Linguistic Technology
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            How Hinglish to Hindi Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Unlike basic phonetic converters that blindly swap Latin letters for Devanagari letters,
            our engine understands context, grammar, and formal Hindi vocabulary.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="font-semibold text-slate-900 text-base">
              Phonetic & Roman Parsing
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Detects phonetic variations and informal SMS spellings (like &ldquo;kya kr rha h&rdquo;, &ldquo;kal aana&rdquo;, or &ldquo;weather acha hai&rdquo;) across English and Roman Hindi.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="font-semibold text-slate-900 text-base">
              Semantic Context Analysis
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Identifies the sentence intent, honorifics, tense, and gender markers rather than performing word-by-word substitution.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="font-semibold text-slate-900 text-base">
              Pure Devanagari Synthesis
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Synthesizes fluent Hindi in authentic Devanagari script, prioritizing standardized vocabulary (मानक हिन्दी) with proper punctuation.
            </p>
          </div>
        </div>

        {/* Comparative Demonstration Table */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Standard Transliteration vs. Our Pure Hindi Converter
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              See why contextual Hindi conversion delivers more elegant, professional results.
            </p>
          </div>

          <div className="divide-y divide-slate-100 overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-6">Input (English / Hinglish)</th>
                  <th className="py-3 px-6 text-slate-400">Basic Transliteration</th>
                  <th className="py-3 px-6 text-indigo-700 bg-indigo-50/40">
                    Our Pure Hindi Output (शुद्ध हिन्दी)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-mono text-slate-800 font-medium">
                      {item.input}
                    </td>
                    <td className="py-4 px-6 text-slate-400 font-devanagari line-through decoration-slate-300">
                      {item.literalTransliteration}
                    </td>
                    <td className="py-4 px-6 bg-indigo-50/20 font-devanagari font-semibold text-indigo-950">
                      <div>{item.pureHindi}</div>
                      <div className="text-[11px] font-sans font-normal text-slate-500 mt-0.5">
                        {item.note}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
