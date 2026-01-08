import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './mocks.ts' // Loading this file sets up the API mocking in development mode
import { App } from './App.tsx'

const rootElement = document.querySelector('#root')

if (rootElement && !rootElement.innerHTML) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
