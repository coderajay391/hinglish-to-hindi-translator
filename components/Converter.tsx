"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ArrowLeftRight, RotateCcw, AlertCircle, CheckCircle2, History, X, Zap } from "lucide-react";
import { InputBox } from "./InputBox";
import { OutputBox } from "./OutputBox";
import { ExamplePrompts } from "./ExamplePrompts";
import { dynamicTransliterate } from "@/lib/transliterate";
import type { TranslationStyle } from "@/lib/translator";

interface HistoryItem {
  id: string;
  sourceText: string;
  hindiText: string;
  style: TranslationStyle;
  timestamp: number;
}

const emptyHistory: HistoryItem[] = [];

function subscribeHistory(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getHistorySnapshot(): string {
  if (typeof window === "undefined") return "[]";
  return localStorage.getItem("hinglish_to_hindi_history") || "[]";
}

function getServerHistorySnapshot(): string {
  return "[]";
}

export function Converter() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [styleMode, setStyleMode] = useState<TranslationStyle>("pure");
  const [isDynamicTypingEnabled, setIsDynamicTypingEnabled] = useState(true);
  const [dynamicHindiPreview, setDynamicHindiPreview] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  // Synchronize localStorage with SSR snapshot to guarantee zero hydration mismatch
  const historyRaw = React.useSyncExternalStore(
    subscribeHistory,
    getHistorySnapshot,
    getServerHistorySnapshot
  );

  const history: HistoryItem[] = React.useMemo(() => {
    try {
      return JSON.parse(historyRaw);
    } catch {
      return emptyHistory;
    }
  }, [historyRaw]);

  const saveToHistory = useCallback((source: string, result: string, style: TranslationStyle) => {
    try {
      const stored = localStorage.getItem("hinglish_to_hindi_history");
      const currentList: HistoryItem[] = stored ? JSON.parse(stored) : [];
      const newItem: HistoryItem = {
        id: Math.random().toString(36).substring(2, 9),
        sourceText: source,
        hindiText: result,
        style,
        timestamp: Date.now(),
      };
      const updated = [newItem, ...currentList.filter((h) => h.sourceText !== source)].slice(0, 10);
      localStorage.setItem("hinglish_to_hindi_history", JSON.stringify(updated));
      // Dispatch storage event so useSyncExternalStore in current window updates
      window.dispatchEvent(new Event("storage"));
    } catch {
      // Ignore
    }
  }, []);

  const handleConvert = useCallback(
    async (textOverride?: string, isLiveCall: boolean = false) => {
      const textToConvert = (textOverride !== undefined ? textOverride : inputText).trim();

      if (!textToConvert) {
        if (!isLiveCall) setErrorMsg("Please enter some text first.");
        return;
      }

      if (textToConvert.length > 5000) {
        if (!isLiveCall) setErrorMsg("Input is too long. Please keep it under 5,000 characters.");
        return;
      }

      if (!isLiveCall) {
        setErrorMsg(null);
        setIsLoading(true);
      }

      try {
        const response = await fetch("/api/convert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: textToConvert,
            style: styleMode,
          }),
        });

        const data = await response.json();

        if (!response.ok || data.error) {
          throw new Error(data.error || "Something went wrong. Please try again.");
        }

        setOutputText(data.result);
        setDynamicHindiPreview(data.result);
        saveToHistory(textToConvert, data.result, styleMode);
      } catch (err: unknown) {
        if (!isLiveCall) {
          const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
          setErrorMsg(msg);
        }
      } finally {
        if (!isLiveCall) {
          setIsLoading(false);
        }
      }
    },
    [inputText, styleMode, saveToHistory]
  );

  // Dynamic Live Typing Effect:
  // 1. Immediately updates the instant phonetic transliteration ribbon as keys are typed.
  // 2. Debounces a full semantic AI update once the user pauses typing.
  const handleInputChange = (newText: string) => {
    setInputText(newText);
    setErrorMsg(null);

    if (!newText.trim()) {
      setDynamicHindiPreview("");
      setOutputText("");
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      return;
    }

    if (isDynamicTypingEnabled) {
      // 1. Instant client-side transliteration
      const instantHindi = dynamicTransliterate(newText);
      setDynamicHindiPreview(instantHindi);

      // If output box is empty or was previously populated by live typing, update preview in output box too
      if (!outputText || outputText === dynamicHindiPreview) {
        setOutputText(instantHindi);
      }

      // 2. Debounced refined semantic conversion via AI
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        handleConvert(newText, true);
      }, 750);
    }
  };

  const handleClearAll = () => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    setInputText("");
    setOutputText("");
    setDynamicHindiPreview("");
    setErrorMsg(null);
  };

  const handleSwap = () => {
    if (!outputText) return;
    const oldInput = inputText;
    const oldOutput = outputText;
    setInputText(oldOutput);
    setOutputText(oldInput);
    setDynamicHindiPreview("");
    setErrorMsg(null);
  };

  const handleSelectExample = (text: string) => {
    setInputText(text);
    setErrorMsg(null);
    const instantHindi = dynamicTransliterate(text);
    setDynamicHindiPreview(instantHindi);
    setOutputText(instantHindi);
    handleConvert(text);
  };

  const clearHistory = () => {
    try {
      localStorage.removeItem("hinglish_to_hindi_history");
      window.dispatchEvent(new Event("storage"));
    } catch {
      // Ignore
    }
  };

  return (
    <div id="converter-section" className="w-full space-y-6">
      {/* Notifications / Error Banner */}
      {errorMsg && (
        <div
          role="alert"
          className="flex items-center justify-between p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm animate-fade-in shadow-xs"
        >
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span className="font-medium">{errorMsg}</span>
          </div>
          <button
            onClick={() => setErrorMsg(null)}
            className="p-1 rounded-md text-rose-500 hover:bg-rose-100 transition-colors"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Converter Card */}
      <div className="relative bg-white/70 backdrop-blur-xs rounded-3xl p-3 sm:p-5 border border-slate-200/90 shadow-xl shadow-slate-200/50">
        {/* Top Control Bar: Clear All, Swap, and History Toggle */}
        <div className="flex items-center justify-between pb-3 px-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              Smart Hinglish Engine
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* History Button */}
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border transition-colors ${
                showHistory
                  ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                  : "bg-white text-slate-600 hover:text-slate-900 border-slate-200"
              }`}
              title="View recent conversions"
            >
              <History className="w-3.5 h-3.5" />
              <span>History ({history.length})</span>
            </button>

            {/* Clear All */}
            {(inputText || outputText) && (
              <button
                type="button"
                onClick={handleClearAll}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200 transition-colors"
                title="Clear both input and output"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* History Drawer if toggled */}
        {showHistory && (
          <div className="mb-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-indigo-600" />
                Recent Conversions
              </h4>
              <div className="flex items-center gap-2">
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-xs text-rose-600 hover:underline"
                  >
                    Clear history
                  </button>
                )}
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-1 rounded text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {history.length === 0 ? (
              <p className="text-xs text-slate-400 py-2">No past conversions saved yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setInputText(item.sourceText);
                      setOutputText(item.hindiText);
                      setShowHistory(false);
                    }}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 cursor-pointer transition-all text-xs space-y-1 group"
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="truncate max-w-[150px]">{item.sourceText}</span>
                      <span className="uppercase font-semibold text-indigo-600">{item.style}</span>
                    </div>
                    <p className="font-devanagari text-slate-900 font-medium truncate group-hover:text-indigo-900">
                      {item.hindiText}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Two-Column Grid for Input and Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 relative items-stretch">
          {/* Left Column: Input */}
          <div className="h-full">
            <InputBox
              value={inputText}
              onChange={handleInputChange}
              onConvert={() => handleConvert()}
              onClear={handleClearAll}
              isLoading={isLoading}
              styleMode={styleMode}
              onChangeStyleMode={setStyleMode}
              dynamicHindiPreview={dynamicHindiPreview}
              isDynamicTypingEnabled={isDynamicTypingEnabled}
              onToggleDynamicTyping={setIsDynamicTypingEnabled}
            />
          </div>

          {/* Center Swap Action Button (Desktop absolute floating or inline) */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <button
              type="button"
              onClick={handleSwap}
              disabled={!outputText}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md text-slate-600 hover:text-indigo-600 hover:border-indigo-300 hover:scale-110 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center transition-all"
              title="Swap input and output text"
              aria-label="Swap input and output"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Output */}
          <div className="h-full">
            <OutputBox
              value={outputText}
              onClear={handleClearAll}
              isLoading={isLoading}
              sourceText={inputText}
              isLiveTranslating={isDynamicTypingEnabled && !!inputText.trim()}
            />
          </div>
        </div>
      </div>

      {/* Example Prompts row */}
      <div className="pt-2">
        <ExamplePrompts onSelectExample={handleSelectExample} />
      </div>
    </div>
  );
}
