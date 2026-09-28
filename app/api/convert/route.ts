import { NextRequest, NextResponse } from "next/server";
import { convertToHindi } from "@/lib/translator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { text, style } = body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        { error: "Please enter some text first." },
        { status: 400 }
      );
    }

    if (text.length > 5000) {
      return NextResponse.json(
        { error: "Input text exceeds the maximum limit of 5,000 characters." },
        { status: 400 }
      );
    }

    const { result } = await convertToHindi({
      text,
      style: style === "conversational" ? "conversational" : "pure",
    });

    return NextResponse.json({
      result,
    });
  } catch (error: unknown) {
    console.error("API /api/convert error:", error);
    let errorMessage = "Something went wrong. Please try again.";

    if (error instanceof Error && error.message) {
      errorMessage = error.message;
      if (errorMessage.includes("RESOURCE_EXHAUSTED") || errorMessage.includes("429")) {
        errorMessage = "Rate limit reached. Please wait a few seconds and try again.";
      } else if (errorMessage.includes("API key")) {
        errorMessage = "Translation service configuration issue. Please try again shortly.";
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
