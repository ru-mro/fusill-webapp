import { useEffect, useState } from 'react'

const CMD = [
  '$ fusill job create \\',
  '    --target  api.staging.io  \\',
  '    --type    httpFlood       \\',
  '    --nodes   20 --duration 60',
]
const TOTAL = 20

function bar(n) {
  return '█'.repeat(n) + '░'.repeat(TOTAL - n)
}

function Inner({ onDone }) {
  const [lines,   setLines]   = useState(0)
  const [phase,   setPhase]   = useState('typing') // typing | created | running
  const [nodes,   setNodes]   = useState(0)
  const [secs,    setSecs]    = useState(60)
  const [rps,     setRps]     = useState('0')
  const [lat,     setLat]     = useState(0)
  const [err,     setErr]     = useState('0.0')
  const [fading,  setFading]  = useState(false)

  useEffect(() => {
    const T = []
    const at = (fn, ms) => { T.push(setTimeout(fn, ms)) }
    let t = 0

    CMD.forEach((_, i) => { t += 240; at(() => setLines(i + 1), t) })

    t += 500;  at(() => setPhase('created'), t)
    t += 300
    for (let i = 1; i <= TOTAL; i++) at(() => setNodes(i), t + i * 85)
    t += TOTAL * 85 + 700

    at(() => setPhase('running'), t)
    const run = t
    for (let s = 0; s < 26; s++) {
      at(() => {
        setSecs(60 - s)
        setRps((3400 + s * 520 + Math.floor(Math.random() * 350)).toLocaleString())
        setLat(Math.round(100 + s * 24 + Math.random() * 30))
        setErr((s * 0.095 + Math.random() * 0.14).toFixed(1))
      }, run + s * 360)
    }

    at(() => setFading(true), run + 26 * 360 + 300)
    at(onDone,                run + 26 * 360 + 1100)

    return () => T.forEach(clearTimeout)
  }, [])

  return (
    <div className={`transition-opacity duration-700 ${fading ? 'opacity-0' : 'opacity-100'}`}>
      <div className="border border-[#2a2a2a] rounded-lg overflow-hidden bg-[#0d0d0d] font-mono text-xs select-none">

        {/* title bar */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#2a2a2a] bg-[#111]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]" />
          <span className="ml-auto text-[#333] text-[10px] tracking-widest">fusill cli</span>
        </div>

        {/* body — fixed height, content appears inside */}
        <div className="p-5 h-72 leading-6">

          {/* command */}
          {CMD.slice(0, lines).map((l, i) => (
            <p key={i} className="text-[#f5f5f5]">{l}</p>
          ))}

          {/* job created */}
          {phase !== 'typing' && (
            <div className="mt-3 space-y-0.5">
              <p>
                <span className="text-[#22c55e]">✓</span>
                <span className="text-[#555]"> created  </span>
                <span className="text-[#444]">3xK9mNpQrStUvW</span>
              </p>
              <p>
                <span className="text-[#22c55e]">✓</span>
                <span className="text-[#555]"> funded   </span>
                <span className="text-[#f97316]">0.42 SOL</span>
              </p>
            </div>
          )}

          {/* node filling */}
          {nodes > 0 && (
            <div className="mt-3 space-y-0.5">
              <p className="text-[#444]">connecting runners</p>
              <p>
                <span className={nodes === TOTAL ? 'text-[#f97316]' : 'text-[#555]'}>
                  [{bar(nodes)}]
                </span>
                <span className="text-[#888]">  {nodes} / {TOTAL}</span>
                {nodes === TOTAL && (
                  <span className="text-[#22c55e]">  ready</span>
                )}
              </p>
            </div>
          )}

          {/* running */}
          {phase === 'running' && (
            <div className="mt-3 space-y-0.5">
              <p>
                <span className="text-[#f97316]">▶</span>
                <span className="text-[#555]"> running  </span>
                <span className="text-[#f5f5f5]">{secs}s</span>
                <span className="text-[#444]"> remaining</span>
              </p>
              <div className="mt-2 space-y-0.5">
                <p>
                  <span className="text-[#444]">rps      </span>
                  <span className="text-[#f5f5f5]">{rps}</span>
                </p>
                <p>
                  <span className="text-[#444]">latency  </span>
                  <span className={lat > 500 ? 'text-[#f97316]' : 'text-[#f5f5f5]'}>{lat}ms</span>
                </p>
                <p>
                  <span className="text-[#444]">errors   </span>
                  <span className={parseFloat(err) > 2 ? 'text-[#ef4444]' : 'text-[#f5f5f5]'}>{err}%</span>
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default function TerminalDemo() {
  const [k, setK] = useState(0)
  return <Inner key={k} onDone={() => setK(n => n + 1)} />
}
