"use client";

import React, { useRef, useEffect } from "react";
import {
  ClipboardPaste,
  Trash2,
  CornerDownLeft,
  Loader2,
  Sparkles,
  ArrowRight,
  BookA,
} from "lucide-react";
import type { TranslationStyle } from "@/lib/translator";

interface InputBoxProps {
  value: string;
  onChange: (val: string) => void;
  onConvert: () => void;
  onClear: () => void;
  isLoading: boolean;
  styleMode: TranslationStyle;
  onChangeStyleMode: (mode: TranslationStyle) => void;
  dynamicHindiPreview?: string;
  isDynamicTypingEnabled: boolean;
  onToggleDynamicTyping: (enabled: boolean) => void;
  disabled?: boolean;
}

const MAX_CHAR_LIMIT = 5000;

export function InputBox({
  value,
  onChange,
  onConvert,
  onClear,
  isLoading,
  styleMode,
  onChangeStyleMode,
  dynamicHindiPreview,
  isDynamicTypingEnabled,
  onToggleDynamicTyping,
  disabled = false,
}: InputBoxProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const nextHeight = Math.max(250, el.scrollHeight);
    el.style.height = `${nextHeight}px`;
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Cmd+Enter or Ctrl+Enter to trigger conversion
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (!isLoading && value.trim()) {
        onConvert();
      }
    }
  };

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          onChange(text);
          if (textareaRef.current) {
            textareaRef.current.focus();
          }
        }
      } else {
        // Fallback focus to allow user normal paste
        textareaRef.current?.focus();
      }
    } catch {
      textareaRef.current?.focus();
    }
  };

  const charCount = value.length;
  const isNearLimit = charCount > 4500;
  const isOverLimit = charCount > MAX_CHAR_LIMIT;

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200/90 shadow-sm transition-all focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
      {/* Box Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5 border-b border-slate-100 bg-slate-50/60 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <h2 className="text-sm font-semibold text-slate-800 tracking-tight">
            Enter English / Hinglish
          </h2>
        </div>

        {/* Action icons (Paste & Clear) */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePaste}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-white rounded-md border border-transparent hover:border-slate-200 transition-colors"
            title="Paste text from clipboard"
          >
            <ClipboardPaste className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Paste</span>
          </button>

          {value && (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
              title="Clear input"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Vocabulary Style & Dynamic Live Typing Bar */}
      <div className="px-5 py-2.5 border-b border-slate-100 bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 flex items-center gap-1 font-medium">
            <BookA className="w-3.5 h-3.5 text-indigo-500" />
            Vocabulary:
          </span>
          <div className="inline-flex p-0.5 rounded-lg bg-slate-100 border border-slate-200/80">
            <button
              type="button"
              onClick={() => onChangeStyleMode("pure")}
              className={`px-2 py-0.5 rounded-md text-xs font-medium transition-all ${
                styleMode === "pure"
                  ? "bg-white text-indigo-700 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Translates to standard vocabulary (e.g. कार्यालय, बैठक, बाज़ार)"
            >
              Pure Hindi (मानक)
            </button>
            <button
              type="button"
              onClick={() => onChangeStyleMode("conversational")}
              className={`px-2 py-0.5 rounded-md text-xs font-medium transition-all ${
                styleMode === "conversational"
                  ? "bg-white text-indigo-700 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Translates to everyday spoken vocabulary (e.g. ऑफिस, मीटिंग)"
            >
              Conversational (बोलचाल)
            </button>
          </div>
        </div>

        {/* Dynamic Typing Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleDynamicTyping(!isDynamicTypingEnabled)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
              isDynamicTypingEnabled
                ? "bg-indigo-50/80 text-indigo-700 border-indigo-200 shadow-2xs font-semibold"
                : "bg-slate-50 text-slate-500 border-slate-200 hover:text-slate-700"
            }`}
            title="Automatically updates live Hindi Devanagari translation while you type"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isDynamicTypingEnabled ? "bg-indigo-600 animate-pulse" : "bg-slate-300"
              }`}
            />
            <span>Live Typing: {isDynamicTypingEnabled ? "ON" : "OFF"}</span>
          </button>
        </div>
      </div>

      {/* Textarea Area */}
      <div className="relative flex-1 p-5 flex flex-col">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isLoading}
          placeholder="Type something like: mujhe kal market jana hai..."
          rows={6}
          className="w-full flex-1 min-h-[200px] bg-transparent resize-none border-0 p-0 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0 text-base sm:text-lg leading-relaxed custom-scrollbar"
          aria-label="Enter English or Hinglish text"
        />

        {/* Dynamic Live Hindi Typing Ribbon */}
        {isDynamicTypingEnabled && value.trim() && dynamicHindiPreview && (
          <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 animate-fade-in flex flex-col gap-1">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-semibold text-indigo-600 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                Live Devanagari Dynamic Typing
              </span>
              <span>Types dynamically with each keystroke</span>
            </div>
            <p className="font-devanagari text-slate-800 text-base sm:text-lg leading-relaxed select-text">
              {dynamicHindiPreview}
            </p>
          </div>
        )}
      </div>

      {/* Box Footer with Character Counter & Convert Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-5 py-3.5 border-t border-slate-100 bg-slate-50/40 rounded-b-2xl">
        <div className="flex items-center justify-between sm:justify-start gap-3">
          <span
            className={`text-xs font-medium tabular-nums ${
              isOverLimit
                ? "text-rose-600 font-semibold"
                : isNearLimit
                ? "text-amber-600"
                : "text-slate-400"
            }`}
          >
            {charCount.toLocaleString()} / {MAX_CHAR_LIMIT.toLocaleString()} characters
          </span>

          <span className="hidden lg:inline-flex items-center gap-1 text-[11px] text-slate-400">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded shadow-xs text-slate-500">
              ⌘
            </kbd>
            +
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded shadow-xs text-slate-500">
              Enter
            </kbd>
            to convert
          </span>
        </div>

        <button
          type="button"
          onClick={onConvert}
          disabled={isLoading || !value.trim() || isOverLimit}
          className="relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Converting...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Convert to Hindi</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
