# Fusill — Web App

Web3 client and landing page for [Fusill](https://github.com/), decentralized server resilience testing on Solana.

Connect a wallet to create on-chain load-test jobs, run multi-vector campaigns, and read consensus-verified results (baseline vs. latency under load).

## Stack

- React + Vite
- Tailwind CSS
- `@solana/wallet-adapter` (Phantom, Solflare)
- [`@fusill/sdk`](https://www.npmjs.com/package/@fusill/sdk) — on-chain client

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # outputs to dist/
```

## Configuration

| Env var | Default | Description |
|---------|---------|-------------|
| `VITE_SOLANA_RPC` | `clusterApiUrl('devnet')` | Solana RPC endpoint. Use a dedicated devnet RPC in production to avoid rate limits. |

## Deployment

Static SPA — deploy `dist/` to any static host (Cloudflare Pages, Vercel, Netlify).
`public/_redirects` provides the SPA fallback (`/* /index.html 200`) for client-side routing.
