import { Link } from 'react-router-dom'
import { Terminal, Cpu, Coins, ArrowRight } from 'lucide-react'

const perks = [
  {
    icon: Terminal,
    title: 'Run the runner',
    desc: 'Deploy the open-source runner on any VPS or bare-metal server. It polls the chain for open jobs and claims them automatically.',
  },
  {
    icon: Cpu,
    title: 'Do the work',
    desc: 'Your node executes the assigned attack vector against the target and submits cryptographic proof of the work done.',
  },
  {
    icon: Coins,
    title: 'Earn SOL',
    desc: 'Once the job completes and consensus is reached, the smart contract releases your share of the payment directly to your wallet.',
  },
]

export default function RunANode() {
  return (
    <section className="py-24 px-6 border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          <div>
            <p className="text-xs text-[#f97316] uppercase tracking-widest mb-3">Run a node</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#f5f5f5] mb-6">
              Join the network.<br />Earn SOL.
            </h2>
            <p className="text-[#888] leading-relaxed mb-8">
              Anyone can run a Fusill runner node. You provide the bandwidth and compute;
              the protocol pays you on-chain for every job you complete — no middlemen,
              no invoices, no trust required.
            </p>
            <a
              href="https://github.com/ru-mro/fusill"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#f97316] text-[#f97316] text-sm font-bold rounded hover:bg-[#f97316]/10 transition-colors"
            >
              Read the docs <ArrowRight size={14} />
            </a>
          </div>

          <div className="flex flex-col gap-4">
            {perks.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="flex gap-4 items-start">
                <div className="shrink-0 w-8 h-8 rounded border border-[#2a2a2a] flex items-center justify-center">
                  <Icon size={14} className="text-[#f97316]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#f5f5f5] mb-1">{title}</p>
                  <p className="text-xs text-[#888] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}

            <div className="mt-4 border border-[#2a2a2a] rounded p-4 font-mono text-xs text-[#888] bg-[#111]">
              <p><span className="text-[#f97316]">$</span> docker run fusill/runner \</p>
              <p className="pl-4">--wallet ./keypair.json \</p>
              <p className="pl-4">--rpc https://api.mainnet-beta.solana.com</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
