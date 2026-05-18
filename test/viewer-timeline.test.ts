import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const viewerHtml = readFileSync(join(process.cwd(), "src/viewer/index.html"), "utf8");

describe("viewer timeline filters", () => {
  it("defaults to hiding hook noise while preserving a user-visible toggle", () => {
    expect(viewerHtml).toContain("showHookNoise: false");
    expect(viewerHtml).toContain("isTimelineNoiseObservation");
    expect(viewerHtml).toContain("isTimelineNoiseSession");
    expect(viewerHtml).toContain("tl-show-hook-noise");
    expect(viewerHtml).toContain("Show hook noise");
  });

  it("documents hidden hook noise in the rendered timeline counts", () => {
    expect(viewerHtml).toContain("hook noise hidden");
    expect(viewerHtml).toContain("visibleCount");
    expect(viewerHtml).toContain("hiddenNoiseCount");
  });
});
