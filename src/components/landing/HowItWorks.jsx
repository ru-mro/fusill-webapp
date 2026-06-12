const steps = [
  {
    n: '01',
    title: 'Create a job on-chain',
    desc: 'You define the target URL, attack type, intensity, and duration. The job is registered on Solana and funded with SOL.',
  },
  {
    n: '02',
    title: 'Runners pick it up',
    desc: 'Decentralized runner nodes detect the job and start hammering your target simultaneously from multiple IPs and regions.',
  },
  {
    n: '03',
    title: 'Results reported on-chain',
    desc: 'Each runner submits cryptographic proof of their work. Aggregated metrics — RPS, latency, errors — are written back on-chain.',
  },
  {
    n: '04',
    title: 'Runners get paid',
    desc: 'After job completion, runners claim their reward automatically. No invoices, no trust — the smart contract enforces it.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs text-[#f97316] uppercase tracking-widest mb-3">How it works</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#f5f5f5] mb-16 max-w-lg">
          From job creation to results in minutes.
        </h2>

        <div className="grid md:grid-cols-2 gap-px bg-[#2a2a2a]">
          {steps.map(({ n, title, desc }) => (
            <div key={n} className="bg-[#0a0a0a] p-8">
              <span className="text-4xl font-bold text-[#2a2a2a] select-none">{n}</span>
              <h3 className="text-lg font-bold text-[#f5f5f5] mt-4 mb-2">{title}</h3>
              <p className="text-sm text-[#888] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
