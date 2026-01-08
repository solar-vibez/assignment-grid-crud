import { http, HttpHandler, passthrough } from 'msw'
import { setupWorker } from 'msw/browser'

/**
 * Dynamically sets up mock handlers for API requests during development.
 * This simulates backend responses without needing a live server.
 */
const handlers = ['/node_modules/*', '/src/*'].map((pattern) =>
  http.get(pattern, passthrough),
)

const modules = import.meta.glob('./**/*.mock.ts', {
  eager: true,
  import: 'handlers',
})

for (const path in modules) {
  handlers.push(...(modules[path] as HttpHandler[]))
}

if (import.meta.env.MODE === 'development') {
  await setupWorker(...handlers).start()
}
