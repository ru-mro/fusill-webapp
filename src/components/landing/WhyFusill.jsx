import { MapPin, Wifi } from 'lucide-react'

export default function WhyFusill() {
  return (
    <section className="py-24 px-6 border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs text-[#f97316] uppercase tracking-widest mb-3">Why Fusill</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#f5f5f5] mb-6">
            Why Fusill and not a local tool?
          </h2>
          <p className="text-[#888] leading-relaxed">
            A tool running from a single machine has a single IP — any firewall or CDN blocks it
            within seconds. Fusill distributes the load across multiple nodes in different ASNs and
            geographic locations, simulating the real threat model: traffic from multiple origins
            that is much harder to mitigate.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="border border-[#2a2a2a] rounded p-5 flex gap-4 items-start">
            <Wifi size={18} className="text-[#888] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#888] mb-1">Single machine</p>
              <p className="text-xs text-[#555] leading-relaxed">
                One IP, one ASN. Blocked by a firewall rule in seconds. Useless against any CDN or
                modern DDoS protection.
              </p>
            </div>
          </div>
          <div className="border border-[#f97316]/40 rounded p-5 flex gap-4 items-start">
            <MapPin size={18} className="text-[#f97316] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#f5f5f5] mb-1">Fusill</p>
              <p className="text-xs text-[#888] leading-relaxed">
                Dozens of nodes, multiple ASNs, distributed geographically. The same threat model
                as a real botnet — without the botnet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
