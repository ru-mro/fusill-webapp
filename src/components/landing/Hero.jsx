import { Link } from 'react-router-dom'
import { ArrowRight, Shield } from 'lucide-react'
import TerminalDemo from './TerminalDemo'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-6 pt-14">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-start py-20">

        {/* left — copy */}
        <div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-none">
            <span className="text-[#f5f5f5]">Stress-test your infra</span>
            <br />
            <span className="text-[#f97316]">before attackers do.</span>
          </h1>

          <p className="text-[#888] text-lg mb-10 leading-relaxed max-w-md">
            Decentralized pentesting network built on Solana. Dev teams can stress-test their own
            infrastructure against real distributed DDoS attacks, with verifiable results on-chain.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              to="/app"
              className="flex items-center gap-2 px-6 py-3 bg-[#f97316] text-black font-bold rounded hover:bg-[#ea6c0a] transition-colors"
            >
              Launch App <ArrowRight size={16} />
            </Link>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 px-6 py-3 border border-[#2a2a2a] text-[#888] rounded hover:border-[#444] hover:text-[#f5f5f5] transition-colors"
            >
              <Shield size={16} /> How it works
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[
              { label: 'Decentralized runners', value: '100+' },
              { label: 'Attack types', value: '9' },
              { label: 'On-chain coordination', value: 'Solana' },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-[#f97316] mb-1">{value}</div>
                <div className="text-xs text-[#555] uppercase tracking-widest leading-tight">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* right — terminal */}
        <div className="w-full">
          <TerminalDemo />
        </div>

      </div>
    </section>
  )
}
