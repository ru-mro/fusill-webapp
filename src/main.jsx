import { Buffer } from 'buffer'
// Assign unconditionally: some wallet adapters set window.Buffer at import time
// (before this statement, due to ESM hoisting). Always install our shim Buffer,
// which has writeBigInt64LE — the SDK needs it for i64 PDA seeds on createJob.
globalThis.Buffer = Buffer

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
