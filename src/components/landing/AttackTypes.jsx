import { Zap, Waves, RefreshCw, Globe, Lock, Radio, Server, Shield, Wifi, Hourglass } from 'lucide-react'

const attacks = [
  {
    icon: Zap,
    type: 'HTTP Flood',
    key: 'httpFlood',
    tag: 'L7',
    desc: 'Overwhelms your HTTP server with a flood of concurrent GET/POST requests, exposing thread pool and connection limits.',
  },
  {
    icon: Waves,
    type: 'Slowloris',
    key: 'slowloris',
    tag: 'L7',
    desc: 'Keeps connections alive by sending partial HTTP headers very slowly, draining the server\'s connection pool without bandwidth.',
  },
  {
    icon: Hourglass,
    type: 'RUDY',
    key: 'rudy',
    tag: 'L7',
    desc: 'R-U-Dead-Yet: sends POST requests with a huge Content-Length but drips the body one byte at a time, tying up server threads indefinitely.',
  },
  {
    icon: RefreshCw,
    type: 'HTTP/2 Rapid Reset',
    key: 'http2RapidReset',
    tag: 'L7',
    desc: 'Sends and immediately cancels thousands of HTTP/2 streams per second, exploiting the multiplexing model to pin server CPU.',
  },
  {
    icon: Radio,
    type: 'HTTP/2 Continuation',
    key: 'http2Continuation',
    tag: 'L7',
    desc: 'Floods the target with oversized CONTINUATION frames in a single stream, triggering memory exhaustion in HTTP/2 parsers.',
  },
  {
    icon: Lock,
    type: 'TLS Exhaustion',
    key: 'tlsExhaustion',
    tag: 'L7',
    desc: 'Initiates TLS handshakes without completing them, exhausting the server\'s crypto resources and session table.',
  },
  {
    icon: Wifi,
    type: 'WebSocket Exhaustion',
    key: 'websocketExhaustion',
    tag: 'L7',
    desc: 'Opens hundreds of WebSocket connections and holds them idle, saturating the event loop and connection limit of WS servers.',
  },
  {
    icon: Globe,
    type: 'DNS Flood',
    key: 'dnsFlood',
    tag: 'L7 DNS',
    desc: 'Floods your DNS infrastructure with high-rate random subdomain queries to expose resolver limits and cache capacity.',
  },
  {
    icon: Server,
    type: 'SYN Flood',
    key: 'synFlood',
    tag: 'L4',
    desc: 'Sends a storm of TCP SYN packets without completing the handshake, filling the target\'s connection queue and blocking legitimate traffic.',
  },
  {
    icon: Shield,
    type: 'UDP Flood',
    key: 'udpFlood',
    tag: 'L3/L4',
    desc: 'Saturates bandwidth with high-pps UDP packets to random ports, stressing firewalls, load balancers, and upstream links.',
  },
]

const tagColors = {
  'L7':      'text-[#f97316] border-[#f97316]/30',
  'L7 DNS':  'text-[#f97316] border-[#f97316]/30',
  'L4':      'text-[#60a5fa] border-[#60a5fa]/30',
  'L3/L4':   'text-[#a78bfa] border-[#a78bfa]/30',
}

export default function AttackTypes() {
  return (
    <section id="attacks" className="py-24 px-6 border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs text-[#f97316] uppercase tracking-widest mb-3">Attack types</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#f5f5f5] mb-4 max-w-lg">
          Test the vectors attackers actually use.
        </h2>
        <p className="text-sm text-[#888] mb-16 max-w-xl">
          Every type maps to a concrete <code className="text-[#f5f5f5] bg-[#1a1a1a] px-1 rounded">RunnerType</code> on-chain.
          Runners know exactly how to execute it — no ambiguity, no manual config.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {attacks.map(({ icon: Icon, type, tag, desc }) => (
            <div
              key={type}
              className="border border-[#2a2a2a] rounded p-6 hover:border-[#f97316]/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon size={18} className="text-[#f97316]" />
                <span className={`text-xs font-mono border px-2 py-0.5 rounded ${tagColors[tag] ?? 'text-[#888] border-[#2a2a2a]'}`}>
                  {tag}
                </span>
              </div>
              <h3 className="font-bold text-[#f5f5f5] mb-2 text-sm">{type}</h3>
              <p className="text-xs text-[#888] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
