import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'

/**
 * Hosts without rewrite rules (e.g. GitHub Pages) answer unknown paths with 404.html.
 * Making it a copy of index.html lets the router handle deep links such as /about on refresh.
 */
function spaFallback(): Plugin {
  let outDir = 'dist'
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

/**
 * The home hero photo is a CSS background, so the browser only discovers it after the app's JS has run.
 * On the home page, start fetching it straight from index.html instead.
 */
function preloadHeroPhoto(): Plugin {
  let base = '/'
  return {
    name: 'preload-hero-photo',
    apply: 'build',
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml(html, ctx) {
      const asset = Object.values(ctx.bundle ?? {}).find(
        (file) => file.type === 'asset' && file.originalFileNames.some((name) => name.endsWith('hero-field-command.jpg')),
      )
      if (!asset) return html
      const href = JSON.stringify(base + asset.fileName)
      return html.replace(
        '</title>',
        `</title>
    <script>if(location.pathname==='/'){var l=document.createElement('link');l.rel='preload';l.as='image';l.href=${href};l.fetchPriority='high';document.head.appendChild(l)}</script>`,
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaFallback(), preloadHeroPhoto()],
  // Explicit floor for older Safari / Chromium; no legacy polyfill bundle is added.
  build: { target: ['es2020', 'safari14'] },
})
