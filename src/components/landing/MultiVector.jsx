import { Layers } from 'lucide-react'

const vectors = [
  { key: 'httpFlood',      label: 'HTTP Flood',      resource: 'CPU' },
  { key: 'slowloris',      label: 'Slowloris',       resource: 'Connections' },
  { key: 'tlsExhaustion',  label: 'TLS Exhaustion',  resource: 'Crypto CPU' },
]

export default function MultiVector() {
  return (
    <section className="py-24 px-6 border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs text-[#f97316] uppercase tracking-widest mb-3">Multi-vector</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#f5f5f5] mb-6">
              Real attacks combine vectors. So does Fusill.
            </h2>
            <p className="text-[#888] leading-relaxed mb-4">
              Real DDoS attacks combine multiple vectors simultaneously to exhaust different
              resources at once. A single-IP tool is easy to block; Fusill distributes each
              vector across independent nodes in different ASNs.
            </p>
            <p className="text-[#888] leading-relaxed">
              With a multi-vector job, each attack type runs on its own set of nodes —
              coordinated on-chain, launched at the same instant.
            </p>
          </div>

          <div className="border border-[#2a2a2a] rounded overflow-hidden">
            <div className="px-5 py-3 border-b border-[#2a2a2a] flex items-center gap-2">
              <Layers size={14} className="text-[#f97316]" />
              <span className="text-xs text-[#888] font-mono">multi-vector job</span>
            </div>
            <div className="divide-y divide-[#2a2a2a]">
              {vectors.map(({ key, label, resource }) => (
                <div key={key} className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#f5f5f5]">{label}</p>
                    <p className="text-xs text-[#555] font-mono">{key}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#888]">exhausts</p>
                    <p className="text-xs font-bold text-[#f97316]">{resource}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-[#2a2a2a] bg-[#111]">
              <p className="text-xs text-[#555] font-mono">→ each vector runs on independent nodes, launched simultaneously</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
