"use client";

import React from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";

interface ExamplePromptsProps {
  onSelectExample: (text: string) => void;
}

interface ExampleItem {
  text: string;
  tag: "Hinglish" | "English" | "Mixed";
  previewHindi?: string;
}

const EXAMPLES: ExampleItem[] = [
  {
    text: "mujhe kal office jana hai",
    tag: "Hinglish",
    previewHindi: "मुझे कल कार्यालय जाना है",
  },
  {
    text: "aap kaise ho",
    tag: "Hinglish",
    previewHindi: "आप कैसे हैं",
  },
  {
    text: "kal mausam kaisa rahega",
    tag: "Hinglish",
    previewHindi: "कल मौसम कैसा रहेगा",
  },
  {
    text: "I want to learn Hindi",
    tag: "English",
    previewHindi: "मैं हिन्दी सीखना चाहता हूँ",
  },
  {
    text: "today weather bahut acha hai",
    tag: "Mixed",
    previewHindi: "आज मौसम बहुत अच्छा है",
  },
  {
    text: "mera naam Ajay hai",
    tag: "Hinglish",
    previewHindi: "मेरा नाम अजय है",
  },
  {
    text: "Where are you going?",
    tag: "English",
    previewHindi: "आप कहाँ जा रहे हैं?",
  },
  {
    text: "mujhe ghar jana hai",
    tag: "Hinglish",
    previewHindi: "मुझे घर जाना है",
  },
];

export function ExamplePrompts({ onSelectExample }: ExamplePromptsProps) {
  return (
    <div id="examples-section" className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Quick Examples — Click to try
          </h3>
        </div>
        <span className="text-xs text-slate-400">
          Try Hinglish, English, or Mixed sentences
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectExample(item.text)}
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-indigo-50/70 text-slate-700 hover:text-indigo-700 border border-slate-200/90 hover:border-indigo-300 transition-all shadow-xs hover:shadow-sm text-left"
            title={`Preview: ${item.previewHindi}`}
          >
            <span
              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                item.tag === "Hinglish"
                  ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                  : item.tag === "English"
                  ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                  : "bg-purple-50 text-purple-700 border border-purple-200/60"
              }`}
            >
              {item.tag}
            </span>
            <span className="truncate max-w-[200px] sm:max-w-[280px]">
              {item.text}
            </span>
            <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover:text-indigo-500 transition-colors shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}
