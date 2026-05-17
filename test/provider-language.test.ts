import { describe, expect, it } from "vitest";
import { ResilientProvider } from "../src/providers/resilient.js";
import type { MemoryProvider } from "../src/types.js";

describe("provider language directive", () => {
  it("adds a Simplified Chinese output directive to text LLM calls", async () => {
    const seen: Array<{ systemPrompt: string; userPrompt: string }> = [];
    const inner: MemoryProvider = {
      name: "capture",
      compress: async (systemPrompt, userPrompt) => {
        seen.push({ systemPrompt, userPrompt });
        return "compressed";
      },
      summarize: async (systemPrompt, userPrompt) => {
        seen.push({ systemPrompt, userPrompt });
        return "summarized";
      },
    };
    const provider = new ResilientProvider(inner);

    await provider.compress("Return XML with <title>.", "raw input");
    await provider.summarize("Return JSON with keys.", "raw input");

    expect(seen).toHaveLength(2);
    for (const call of seen) {
      expect(call.systemPrompt).toContain("简体中文");
      expect(call.systemPrompt).toContain("保留");
      expect(call.userPrompt).toBe("raw input");
    }
  });

  it("decorates image description prompts when the wrapped provider supports them", async () => {
    let seenPrompt = "";
    const inner: MemoryProvider = {
      name: "vision",
      compress: async () => "",
      summarize: async () => "",
      describeImage: async (_imageData, _mimeType, prompt) => {
        seenPrompt = prompt;
        return "described";
      },
    };
    const provider = new ResilientProvider(inner);

    await provider.describeImage?.("base64", "image/png", "Describe this image.");

    expect(seenPrompt).toContain("简体中文");
    expect(seenPrompt).toContain("保留");
  });
});
