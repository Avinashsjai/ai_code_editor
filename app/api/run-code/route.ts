import { type NextRequest, NextResponse } from "next/server";
import vm from "vm";

interface RunCodeRequest {
  code: string;
  language: string;
}

const ALLOWED_LANGUAGES = ["javascript", "typescript", "js", "ts"];

export async function POST(request: NextRequest) {
  try {
    const body: RunCodeRequest = await request.json();
    const { code, language } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Invalid input: code is required" },
        { status: 400 }
      );
    }

    const lang = language?.toLowerCase() ?? "javascript";
    if (!ALLOWED_LANGUAGES.includes(lang)) {
      return NextResponse.json(
        { error: `Language ${language} is not supported. Use JavaScript or TypeScript.` },
        { status: 400 }
      );
    }

    const logs: string[] = [];
    const consoleCapture = {
      log: (...args: unknown[]) => {
        logs.push(args.map(String).join(" "));
      },
      error: (...args: unknown[]) => {
        logs.push("Error: " + args.map(String).join(" "));
      },
      warn: (...args: unknown[]) => {
        logs.push("Warn: " + args.map(String).join(" "));
      },
    };

    const sandbox = {
      console: consoleCapture,
      setTimeout,
      setInterval,
      clearTimeout,
      clearInterval,
      Math,
      JSON,
      Array,
      Object,
      String,
      Number,
      Boolean,
      Date,
      RegExp,
      Error,
      Map,
      Set,
      Promise,
      Symbol,
      BigInt,
    };

    const wrappedCode = `
      (function() {
        try {
          const __result = (function() {
            ${code}
          })();
          return { success: true };
        } catch (e) {
          return { success: false, error: e.message, stack: e.stack };
        }
      })()
    `;

    const script = new vm.Script(wrappedCode);
    const context = vm.createContext(sandbox);

    try {
      const result = script.runInContext(context, {
        timeout: 5000,
      });

      if (result && typeof result === "object" && "error" in result) {
        return NextResponse.json({
          success: false,
          output: logs.join("\n"),
          error: result.error,
          stack: result.stack,
        });
      }

      return NextResponse.json({
        success: true,
        output: logs.join("\n") || "(no output)",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return NextResponse.json({
        success: false,
        output: logs.join("\n"),
        error: message,
      });
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Internal server error", message },
      { status: 500 }
    );
  }
}
