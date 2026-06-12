import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    phase: 'Commit',
    desc: 'Before revealing any result, each node submits a cryptographic hash of its metrics. No one can see what anyone else measured.',
  },
  {
    phase: 'Reveal',
    desc: 'Nodes reveal their actual values. The contract verifies the hash matches — making it impossible to change results after the fact.',
  },
  {
    phase: 'Consensus',
    desc: 'The contract computes the average metric across all nodes. Outliers get no payment. Honest nodes split the 95% pool.',
  },
]

export default function Trustless() {
  return (
    <section className="py-24 px-6 border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs text-[#f97316] uppercase tracking-widest mb-3">Trustless by design</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#f5f5f5] max-w-lg">
            Nodes can't lie. The math won't let them.
          </h2>
          <Link
            to="/docs"
            className="inline-flex items-center gap-2 text-sm text-[#f97316] hover:underline shrink-0"
          >
            Full technical breakdown <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-[#2a2a2a]">
          {steps.map(({ phase, desc }, i) => (
            <div key={phase} className="bg-[#0a0a0a] p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-[#555]">0{i + 1}</span>
                <span className="text-sm font-bold text-[#f97316]">{phase}</span>
              </div>
              <p className="text-sm text-[#888] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4 text-center">
          {[
            { v: '5%',  label: 'Protocol fee' },
            { v: '95%', label: 'Split among honest nodes' },
            { v: '0',   label: 'Payment for dishonest nodes' },
          ].map(({ v, label }) => (
            <div key={label} className="border border-[#2a2a2a] rounded py-4 px-6">
              <p className="text-2xl font-bold text-[#f5f5f5] mb-1">{v}</p>
              <p className="text-xs text-[#888]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
