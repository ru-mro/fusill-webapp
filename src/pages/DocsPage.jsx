import { Link } from 'react-router-dom'
import Logo from '../components/ui/Logo'

function Section({ title, children }) {
  return (
    <section className="mb-16">
      <h2 className="text-xl font-bold text-[#f5f5f5] mb-6 pb-3 border-b border-[#2a2a2a]">{title}</h2>
      {children}
    </section>
  )
}

function CodeBlock({ children }) {
  return (
    <pre className="bg-[#111] border border-[#2a2a2a] rounded p-4 text-xs text-[#888] font-mono overflow-x-auto leading-relaxed mb-4">
      {children}
    </pre>
  )
}

function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-xs font-mono border-collapse">
        <thead>
          <tr className="border-b border-[#2a2a2a]">
            {headers.map(h => (
              <th key={h} className="text-left py-2 pr-6 text-[#f97316] font-bold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[#1a1a1a]">
              {row.map((cell, j) => (
                <td key={j} className="py-2 pr-6 text-[#888] align-top">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const runners = [
  { name: 'HTTP Flood',             key: 'HttpFlood',           metric: 'avgLatencyMs',  why: 'Response latency is a server property. A saturated server shows high latency to all nodes simultaneously.' },
  { name: 'TLS Exhaustion',         key: 'TlsExhaustion',       metric: 'avgLatencyMs',  why: 'TLS handshake RTT reflects server crypto CPU load — consistently observable by all nodes.' },
  { name: 'DNS Flood',              key: 'DnsFlood',            metric: 'avgLatencyMs',  why: 'DNS response time is the direct stress metric. Only measurable latency-based signal in UDP.' },
  { name: 'Slowloris',              key: 'Slowloris',           metric: 'errorRateBps',  why: 'No response ever arrives. Saturation shows as the server closing connections.' },
  { name: 'HTTP/2 Rapid Reset',     key: 'Http2RapidReset',     metric: 'errorRateBps',  why: 'Streams reset immediately — latency is zero. Saturation shows as GOAWAY / connection reset.' },
  { name: 'HTTP/2 Continuation',    key: 'Http2Continuation',   metric: 'errorRateBps',  why: 'Request never completes. Server under OOM pressure starts closing connections.' },
  { name: 'WebSocket Exhaustion',   key: 'WebsocketExhaustion', metric: 'errorRateBps',  why: 'Success metric is whether the server accepts the upgrade. Rejection rate is the observable signal.' },
  { name: 'SYN Flood',              key: 'SynFlood',            metric: '—',             why: 'Requires CAP_NET_RAW. Not yet in consensus.' },
  { name: 'UDP Flood',              key: 'UdpFlood',            metric: '—',             why: 'Requires CAP_NET_RAW. Not yet in consensus.' },
]

const cannotFake = [
  ['Reveal metrics different from commitment', 'keccak256(new_values) ≠ commitment → CommitmentMismatch'],
  ['Copy another node\'s commitment', 'Different nonce makes the hash distinct'],
  ['Report low latency when server is saturated', 'Diverges from average → exceeds tolerance → no payment'],
  ['Report 0% error rate when server closes connections', 'Diverges from average → exceeds tolerance → no payment'],
  ['Report 100% error rate to exaggerate the attack', 'Diverges from honest average → no payment'],
  ['Not revealing after committing', 'force_advance advances phase; node loses 20 reputation points'],
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#2a2a2a] bg-[#0a0a0a]/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/"><Logo size="md" /></Link>
          <Link to="/" className="text-xs text-[#888] hover:text-[#f5f5f5] transition-colors">← Back</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
        <p className="text-xs text-[#f97316] uppercase tracking-widest mb-3">Technical docs</p>
        <h1 className="text-4xl font-bold text-[#f5f5f5] mb-4">Trustless Consensus</h1>
        <p className="text-[#888] mb-16 max-w-2xl leading-relaxed">
          How Fusill verifies that runner nodes report honest results — without trusting any of them.
        </p>

        <Section title="The Problem">
          <p className="text-sm text-[#888] leading-relaxed mb-4">
            In a decentralized load testing network, the nodes that execute the attack also report their own results.
            How does the contract know they are not lying?
          </p>
          <p className="text-sm text-[#888] leading-relaxed">
            Fusill uses a <span className="text-[#f5f5f5]">commit-reveal scheme</span> combined with <span className="text-[#f5f5f5]">metric consensus</span>:
            nodes make a cryptographic commitment to their results before revealing them, and the contract only
            accepts results that converge on the same server metric.
          </p>
        </Section>

        <Section title="Commit → Reveal → Consensus">
          <CodeBlock>{`Phase 1 — COMMIT
  node computes: commitment = keccak256(avgLatencyMs || errorRateBps || requestsCompleted || nonce)
  node sends:    commitment (32 bytes) to the contract
  contract:      stores the hash, does not see the actual values

Phase 2 — REVEAL
  node sends:    (avgLatencyMs, errorRateBps, requestsCompleted, nonce)
  contract:      recomputes keccak256 and verifies == commitment
  if match:      accepts the values; if not → CommitmentMismatch

Phase 3 — FINALIZE
  contract:      selects the consensus metric based on runner type
  computes:      avg = average of the metric across all nodes
  classifies:    |node_value - avg| <= tolerance → honest, gets paid
                 |node_value - avg| >  tolerance → dishonest, loses reputation`}</CodeBlock>
          <div className="flex flex-col gap-3 mt-6">
            {[
              'A node cannot see other nodes\' values before committing — hashes are opaque.',
              'It cannot change its values after committing — the hash locks them in.',
              'The nonce prevents copying another node\'s commitment even if they report identical values.',
            ].map((s, i) => (
              <div key={i} className="flex gap-3 text-sm text-[#888]">
                <span className="text-[#f97316] shrink-0">→</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Consensus Metric Per Runner">
          <p className="text-sm text-[#888] leading-relaxed mb-6">
            The key design insight is distinguishing <span className="text-[#f5f5f5]">server properties</span> from{' '}
            <span className="text-[#f5f5f5]">node properties</span>. Response time and rejection rates are server properties —
            all honest nodes observe the same server, so they should measure similar values.
            <code className="text-[#f5f5f5] bg-[#1a1a1a] px-1 mx-1 rounded">requestsCompleted</code>
            is always a node property and is never used for consensus.
          </p>
          <Table
            headers={['Attack', 'RunnerType', 'Metric', 'Why']}
            rows={runners.map(r => [r.name, r.key, r.metric, r.why])}
          />
        </Section>

        <Section title="Tolerance Formula">
          <CodeBlock>{`avgLatencyMs  → tolerance = avg / 5            (20% relative)
errorRateBps  → tolerance = max(avg / 5, 500)   (20% relative, minimum 500 bps = 5pp)`}</CodeBlock>
          <p className="text-sm text-[#888] leading-relaxed mb-3">
            The 500 bps floor on <code className="text-[#f5f5f5] bg-[#1a1a1a] px-1 rounded">errorRateBps</code> prevents
            unfair failures when the server barely rejects connections. If avg = 200 bps (2%), a pure 20% tolerance
            would be 40 bps — too tight for normal network variation. The floor guarantees ±5 percentage points of margin.
          </p>
          <p className="text-sm text-[#888] leading-relaxed">
            <code className="text-[#f5f5f5] bg-[#1a1a1a] px-1 rounded">avgLatencyMs</code> has no floor because
            latency has high cross-node correlation when measuring the same server. 20% relative is sufficient at any scale.
          </p>
        </Section>

        <Section title="Payment Distribution">
          <CodeBlock>{`Total payment = 100%
  5%  → deployer (protocol fee)
  95% → split among honest nodes only

Dishonest node:
  - Gets no payment
  - Loses 10 reputation points
  - Its share is redistributed to honest nodes (not burned)

If ALL nodes are dishonest:
  - The 95% goes to the deployer as fallback
  - No node gets paid

Honest node:
  - Gets 95% / N_honest
  - Gains 5 reputation points
  - jobs_completed++`}</CodeBlock>
        </Section>

        <Section title="What Cannot Be Faked">
          <Table
            headers={['Fraud attempt', 'Why it fails']}
            rows={cannotFake}
          />
        </Section>
      </div>
    </div>
  )
}
