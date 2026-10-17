import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

// Emits dist/sw.js with the list of built files to precache, so the whole app works offline
// after the first visit. The version is a hash of the file list, so every new build updates it.
function serviceWorker(adsenseClientId) {
  return {
    name: "icse-explorer-sw",
    apply: "build",
    generateBundle(_, bundle) {
      if (/^ca-pub-\d+$/.test(adsenseClientId)) {
        this.emitFile({
          type: "asset",
          fileName: "ads.txt",
          source: `google.com, ${adsenseClientId.replace("ca-", "")}, DIRECT, f08c47fec0942fa0\n`,
        });
      }

      const files = Object.keys(bundle).filter((f) => !f.endsWith(".map"));
      const pub = fileURLToPath(new URL("./public", import.meta.url));
      const walk = (d) => readdirSync(d).flatMap((f) => {
        const fullPath = join(d, f);
        return statSync(fullPath).isDirectory() ? walk(fullPath) : [relative(pub, fullPath)];
      });
      const statics = walk(pub);
      const precache = ["./", "./index.html", ...[...files, ...statics].map((f) => "./" + f)];
      const version = createHash("sha256").update(precache.join("|") + Object.values(bundle).map((c) => c.code || "").join("")).digest("hex").slice(0, 10);
      const source = readFileSync(fileURLToPath(new URL("./pwa/sw-template.js", import.meta.url)), "utf8")
        .replace("__VERSION__", version)
        .replace("__PRECACHE__", JSON.stringify([...new Set(precache)], null, 2));
      this.emitFile({ type: "asset", fileName: "sw.js", source });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    base: "./",
    plugins: [react(), serviceWorker((env.VITE_ADSENSE_CLIENT_ID || "").trim())],
  };
});
