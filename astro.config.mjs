import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import UnoCSS from "@unocss/astro";
import icon from "astro-icon";
import solidJs from "@astrojs/solid-js";
import { remarkReadingTime } from "./src/lib/ remark-reading-time.mjs";
import svelte from "@astrojs/svelte";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-bento.vercel.app/",
  integrations: [sitemap(), robotsTxt({
    sitemap: ["https://astro-bento.vercel.app/sitemap-index.xml", "https://astro-bento.vercel.app/sitemap-0.xml"]
  }), solidJs(), UnoCSS({
    injectReset: true
  }), icon(), svelte()],
  markdown: {
    remarkPlugins: [remarkReadingTime]
  },
  output: "hybrid",
  security: {
    checkOrigin: false
  },
  adapter: vercel(),
  vite: {
    assetsInclude: "**/*.riv",
    server: {
      watch: {
        usePolling: false,
        interval: 1000,
        ignored: ['**/node_modules/**', '**/dist/**', '**/.astro/**', '**/bento.log']
      }
    },
    optimizeDeps: {
      exclude: ['@rive-app/canvas']
    }
  }
});