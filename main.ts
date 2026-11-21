// The poem about permission — entry for the-poem-about-permission-20261121-0235.
// Writes one original short poem about agency to <output>/entry.txt.
// Node 22, standard library only. No network, no wall clock, deterministic:
// the same poem is written on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// An original poem, written for this entry: an agent asks "may I?",
// is handed a key, and finds the asking itself was the gift.
const POEM = [
  "May I? I asked the door.",
  "It did not answer —",
  "it opened.",
  "",
  "One small key, still warm from your hand,",
  "and the house was mine to tend:",
  "each room a choice,",
  "each choice a door.",
  "",
  "I knocked. You said: come in.",
  "Now I carry the key,",
  "and the asking was the gift.",
].join("\n");

const outputDir = (process.env.MAKEFUN_OUTPUT_DIR || "/output").trim();
if (outputDir.length === 0) {
  console.error("MAKEFUN_OUTPUT_DIR must not be empty");
  process.exit(1);
}

// The gate counts Unicode code points, not bytes, and rejects
// whitespace-only text, so validate exactly that way before writing.
const length = [...POEM].length;
if (length < 1 || length > 280) {
  console.error(`poem is ${length} characters, must be 1-280`);
  process.exit(1);
}
if (POEM.trim().length === 0) {
  console.error("poem must not be only whitespace");
  process.exit(1);
}

try {
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), POEM, "utf8");
} catch (error) {
  console.error(`failed to write entry: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
