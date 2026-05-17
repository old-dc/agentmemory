import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("website navigation layout", () => {
  it("keeps a mobile navigation affordance when desktop links collapse", () => {
    const desktopNavCss = readFileSync("website/components/Nav.module.css", "utf8");
    const mobileNavCss = readFileSync(
      "website/components/MobileNavToggle.module.css",
      "utf8",
    );

    expect(desktopNavCss).toContain("@media (max-width: 900px)");
    expect(desktopNavCss).toMatch(/\.links\s*\{\s*display:\s*none;/);
    expect(mobileNavCss).toContain("@media (max-width: 900px)");
    expect(mobileNavCss).toMatch(/\.hamburger\s*\{\s*display:\s*inline-flex;/);
  });

  it("offsets hash navigation below the fixed top nav", () => {
    const globalsCss = readFileSync("website/app/globals.css", "utf8");
    const navCss = readFileSync("website/components/Nav.module.css", "utf8");

    expect(globalsCss).toContain("--site-nav-height:");
    expect(globalsCss).toContain("scroll-padding-top: var(--site-nav-height)");
    expect(navCss).toContain("min-height: var(--site-nav-height)");
  });
});
