"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Download,
  Trash2,
  Volume2,
  VolumeX,
  Share2,
  Languages,
} from "lucide-react";

interface OutputBoxProps {
  value: string;
  onClear: () => void;
  isLoading: boolean;
  sourceText?: string;
  isLiveTranslating?: boolean;
}

export function OutputBox({
  value,
  onClear,
  isLoading,
  sourceText,
  isLiveTranslating = false,
}: OutputBoxProps) {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = value;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!value) return;
    const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `hindi-translation-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSpeak = () => {
    if (!value || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(value);
    utterance.lang = "hi-IN";
    utterance.rate = 0.9; // natural cadence for Hindi

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleShare = async () => {
    if (!value) return;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Hindi Translation",
          text: value,
        });
      } catch {
        // User dismissed share dialog
      }
    } else {
      // WhatsApp share fallback
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(value)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const charCount = value ? value.length : 0;
  const wordCount = value ? value.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200/90 shadow-sm transition-all">
      {/* Box Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5 border-b border-slate-100 bg-slate-50/60 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <h2 className="text-sm font-semibold text-slate-800 tracking-tight flex items-center gap-1.5">
            Hindi Result
            <span className="text-[11px] font-normal text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
              देवनागरी
            </span>
            {isLiveTranslating && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                Live
              </span>
            )}
          </h2>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          {value && (
            <>
              {/* Text-to-speech */}
              <button
                type="button"
                onClick={handleSpeak}
                className={`p-1.5 rounded-md transition-colors ${
                  isSpeaking
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                }`}
                title={isSpeaking ? "Stop listening" : "Listen to Hindi pronunciation"}
              >
                {isSpeaking ? (
                  <VolumeX className="w-4 h-4 text-indigo-600" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              {/* Share */}
              <button
                type="button"
                onClick={handleShare}
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                title="Share translated text"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {/* Download */}
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                title="Download as .txt file"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </button>

              {/* Clear */}
              <button
                type="button"
                onClick={onClear}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                title="Clear output"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Output Content Area */}
      <div className="relative flex-1 p-5 min-h-[250px] flex flex-col justify-start">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12 text-center space-y-4">
            <div className="relative flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
              <Languages className="w-5 h-5 text-indigo-600 absolute" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-700">
                Converting to natural Hindi...
              </p>
              <p className="text-xs text-slate-400">
                Linguistic analysis and standard Devanagari synthesis
              </p>
            </div>
          </div>
        ) : value ? (
          <div className="flex-1 flex flex-col">
            <div
              tabIndex={0}
              className="font-devanagari text-slate-900 text-lg sm:text-xl font-normal leading-relaxed whitespace-pre-wrap select-text focus:outline-none focus:ring-1 focus:ring-indigo-300 rounded-lg p-1"
            >
              {value}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4 select-none">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-400 mb-3">
              <Languages className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-500">
              Your Hindi translation will appear here.
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Type or paste English or Hinglish on the left, then click &ldquo;Convert to Hindi&rdquo;.
            </p>
          </div>
        )}
      </div>

      {/* Box Footer with Copy button */}
      <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 bg-slate-50/40 rounded-b-2xl">
        <div className="flex items-center gap-3">
          {value ? (
            <span className="text-xs font-medium text-slate-500 tabular-nums">
              {charCount} characters · {wordCount} words
            </span>
          ) : (
            <span className="text-xs text-slate-400">
              Ready for conversion
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          disabled={!value || isLoading}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            copied
              ? "bg-emerald-600 text-white shadow-sm"
              : "bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
          }`}
          title="Copy Hindi text to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-200" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
