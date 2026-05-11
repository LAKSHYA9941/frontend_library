import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static page folders that live in /public and should be served as-is
const staticPages = ['/pikachu', '/insect', '/jacket', '/loomeshop', '/pokedex', '/scalex','/skullwire','/monkeyking']

export default defineConfig({
  plugins: [
    react(),
    {
      // Custom middleware: redirect /pagename and /pagename/ to /pagename/index.html
      // so Vite serves the static HTML instead of the React SPA fallback
      name: 'static-pages-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url.split('?')[0].replace(/\/$/, '') || '/'
          if (staticPages.includes(url)) {
            // Rewrite to the index.html inside the public subfolder
            req.url = `${url}/index.html`
          }
          next()
        })
      },
    },
  ],
})
