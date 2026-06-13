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
      // Buffer MUST be `true`: it aliases `import 'buffer'` to the plugin's own
      // shim, which implements writeBigInt64LE/writeBigUInt64LE. With `false`
      // the alias falls through to node-stdlib-browser's bundled buffer@5.7.1,
      // which lacks those BigInt helpers — and the Fusill SDK needs
      // writeBigInt64LE for the i64 PDA seed when creating a job. main.jsx still
      // pins globalThis.Buffer at runtime for the SDK's bare `Buffer` global.
      globals: { Buffer: true, process: true, global: true },
    }),
  ],
})
