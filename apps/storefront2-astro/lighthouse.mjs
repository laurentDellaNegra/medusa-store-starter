#!/usr/bin/env node

/**
 * Build, preview, run Lighthouse, generate report, then stop.
 *
 * Usage:
 *   node lighthouse.mjs              # audit all pages (mobile)
 *   node lighthouse.mjs --desktop    # audit all pages (desktop)
 *   node lighthouse.mjs /shop        # audit a single page
 */

import { execSync, spawn } from "node:child_process";
import { readFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PREVIEW_PORT = 4321;
const BASE = `http://localhost:${PREVIEW_PORT}`;
const REPORT_DIR = resolve(__dirname, "lighthouse-reports");
const PAGES = ["/", "/shop", "/product?id=1", "/cart"];

// Parse args
const args = process.argv.slice(2);
const desktop = args.includes("--desktop");
const filteredArgs = args.filter((a) => !a.startsWith("--"));
const pages = filteredArgs.length > 0 ? filteredArgs : PAGES;
const preset = desktop ? "desktop" : "perf";

// 1. Build
console.log("\n🔨 Building...\n");
execSync("npx astro build", { cwd: __dirname, stdio: "inherit" });

// 2. Start preview server
console.log("\n🚀 Starting preview server...\n");
const preview = spawn("npx", ["astro", "preview", "--port", String(PREVIEW_PORT)], {
  cwd: __dirname,
  stdio: "pipe",
});

// Wait for server to be ready
await new Promise((resolve, reject) => {
  const timeout = setTimeout(() => reject(new Error("Preview server timed out")), 15000);
  const check = setInterval(async () => {
    try {
      const res = await fetch(BASE);
      if (res.ok) {
        clearInterval(check);
        clearTimeout(timeout);
        resolve();
      }
    } catch {}
  }, 300);
});

console.log(`✅ Preview server ready at ${BASE}\n`);

// 3. Run Lighthouse on each page
mkdirSync(REPORT_DIR, { recursive: true });

const scores = [];

for (const page of pages) {
  const url = page.startsWith("http") ? page : `${BASE}${page}`;
  const slug = page.replace(/[/?=&]/g, "_").replace(/^_/, "") || "home";
  const outPath = resolve(REPORT_DIR, slug);

  console.log(`\n🔍 Auditing ${url} (${desktop ? "desktop" : "mobile"})...\n`);

  try {
    execSync(
      [
        "npx lighthouse",
        JSON.stringify(url),
        `--output=json --output=html`,
        `--output-path=${JSON.stringify(outPath)}`,
        `--chrome-flags="--headless=new --no-sandbox"`,
        desktop ? "--preset=desktop" : "",
        "--quiet",
      ]
        .filter(Boolean)
        .join(" "),
      { cwd: __dirname, stdio: "inherit", timeout: 120_000 }
    );

    // Parse scores from JSON report
    const json = JSON.parse(readFileSync(`${outPath}.report.json`, "utf8"));
    const pageScores = {};
    for (const [key, cat] of Object.entries(json.categories)) {
      pageScores[key] = Math.round(cat.score * 100);
    }
    scores.push({ page, scores: pageScores });

    // Print failed audits
    const failed = Object.values(json.audits).filter(
      (a) => a.score !== null && a.score < 1 && a.scoreDisplayMode !== "informative"
    );
    if (failed.length > 0) {
      console.log(`\n   ❌ Failed audits for ${page}:`);
      for (const a of failed) {
        const cat = Object.entries(json.categories)
          .find(([, c]) => c.auditRefs.some((r) => r.id === a.id))
          ?.[0] || "";
        console.log(`      [${cat}] ${a.title} (score: ${a.score})`);
        if (a.description) {
          const short = a.description.split(".")[0];
          console.log(`             ${short}`);
        }
      }
    }
  } catch (e) {
    console.error(`   ⚠️  Lighthouse failed for ${url}: ${e.message}`);
  }
}

// 4. Stop preview server
preview.kill("SIGTERM");

// 5. Print summary
console.log("\n" + "═".repeat(65));
console.log(" LIGHTHOUSE SCORES SUMMARY");
console.log("═".repeat(65));

const categories = ["performance", "accessibility", "best-practices", "seo"];
const header =
  "Page".padEnd(20) + categories.map((c) => c.slice(0, 12).padStart(14)).join("");
console.log(header);
console.log("─".repeat(65));

for (const { page, scores: s } of scores) {
  const label = (page.length > 18 ? page.slice(0, 18) + "…" : page).padEnd(20);
  const vals = categories
    .map((c) => {
      const v = s[c] ?? "-";
      const str = String(v).padStart(14);
      return v === 100 ? `\x1b[32m${str}\x1b[0m` : v >= 90 ? `\x1b[33m${str}\x1b[0m` : `\x1b[31m${str}\x1b[0m`;
    })
    .join("");
  console.log(label + vals);
}

console.log("─".repeat(65));
console.log(`\n📄 Reports saved to: ${REPORT_DIR}/`);
console.log("   Open any .report.html file in a browser for full details.\n");

process.exit(0);
