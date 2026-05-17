import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const viewerHtml = readFileSync(join(process.cwd(), "src/viewer/index.html"), "utf8");

function cssRule(selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = viewerHtml.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  expect(match, `${selector} rule should exist`).not.toBeNull();
  return match?.[1] ?? "";
}

describe("viewer layout", () => {
  it("keeps top chrome from shrinking over navigation targets", () => {
    expect(cssRule(".app-header")).toContain("flex: 0 0 auto");
    expect(cssRule(".tab-bar")).toContain("flex: 0 0 auto");
    expect(cssRule(".flag-banners")).toContain("flex: 0 0 auto");
  });

  it("reserves enough vertical hit area for tab buttons", () => {
    expect(cssRule(".tab-bar")).toContain("min-height: 42px");
    expect(cssRule(".tab-bar button")).toContain("min-height: 42px");
    expect(cssRule(".tab-bar button")).toContain("display: flex");
    expect(cssRule(".tab-bar button")).toContain("align-items: center");
  });
});
