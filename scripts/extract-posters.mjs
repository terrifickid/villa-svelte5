// Extracts the first frame of each hero video into static/posters/<name>.jpg
// so the player can paint something instantly, before the video has loaded.
//
// Usage: npm run posters
// Add a new video: drop it in static/ and append its basename below.

import { execFileSync } from "node:child_process";
import { mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpeg from "ffmpeg-static";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const inputDir = join(root, "static");
const outputDir = join(inputDir, "posters");

// Basenames (without extension) of the videos in static/.
const videos = ["v1", "v2", "v3"];

// Posters are shown while a video loads, so keep them lean.
const WIDTH = 1280;
const QUALITY = 7; // ffmpeg -q:v scale, 2 = best, 31 = worst

mkdirSync(outputDir, { recursive: true });

for (const name of videos) {
  const input = join(inputDir, `${name}.mp4`);
  const output = join(outputDir, `${name}.jpg`);

  if (!existsSync(input)) {
    console.warn(`skip ${name}: ${input} not found`);
    continue;
  }

  console.log(`extracting ${name}.jpg`);
  execFileSync(
    ffmpeg,
    [
      "-y",
      "-ss",
      "0",
      "-i",
      input,
      "-frames:v",
      "1",
      "-vf",
      `scale=${WIDTH}:-2`,
      "-q:v",
      String(QUALITY),
      "-update",
      "1",
      output,
    ],
    { stdio: "inherit" },
  );
}

console.log(`done -> ${outputDir}`);
