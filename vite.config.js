import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  // The SDK lives outside webapp/; dedupe shared libs so there is a single
  // instance of web3.js/anchor/react (avoids instanceof + hook mismatches).
  resolve: {
    dedupe: ['@solana/web3.js', '@coral-xyz/anchor', 'react', 'react-dom'],
  },
  plugins: [
    react(),
    tailwindcss(),
    // Anchor + web3.js expect Node globals (Buffer, process) and a few core
    // modules. The SDK's `fs` import is never hit in the browser (we use the
    // provider branch), so an empty shim is enough.
    nodePolyfills({
      include: ['buffer', 'process', 'util', 'stream', 'crypto'],
      // Buffer is set as a real global in main.jsx instead of per-file shim
      // injection, which fails for the SDK source that lives outside webapp/.
      globals: { Buffer: false, process: true, global: true },
    }),
  ],
})
