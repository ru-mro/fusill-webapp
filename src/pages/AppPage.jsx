import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Logo from '../components/ui/Logo'
import WalletProviders from '../web3/WalletProviders'
import { useFusill } from '../web3/useFusill'

// On-chain RunnerType variants with three intensity presets each.
const ATTACKS = [
  { type: 'httpFlood',          label: 'HTTP Flood',          presets: { Liviano: { concurrent_connections: 20 },  Medio: { concurrent_connections: 100 }, Agresivo: { concurrent_connections: 300 } } },
  { type: 'slowloris',          label: 'Slowloris',           presets: { Liviano: { concurrent_connections: 200 }, Medio: { concurrent_connections: 1000 }, Agresivo: { concurrent_connections: 3000 } } },
  { type: 'rudy',               label: 'RUDY',                presets: { Liviano: { concurrent_connections: 50 },  Medio: { concurrent_connections: 100 }, Agresivo: { concurrent_connections: 300 } } },
  { type: 'tlsExhaustion',      label: 'TLS Exhaustion',      presets: { Liviano: { handshakes_per_second: 50 },  Medio: { handshakes_per_second: 200 }, Agresivo: { handshakes_per_second: 500 } } },
  { type: 'http2RapidReset',    label: 'HTTP/2 Rapid Reset',  presets: { Liviano: { connections: 10 },            Medio: { connections: 50 }, Agresivo: { connections: 100 } } },
  { type: 'http2Continuation',  label: 'HTTP/2 Continuation', presets: { Liviano: { connections: 5 },             Medio: { connections: 20 }, Agresivo: { connections: 50 } } },
  { type: 'websocketExhaustion',label: 'WebSocket Exhaustion',presets: { Liviano: { connections: 200 },           Medio: { connections: 1000 }, Agresivo: { connections: 3000 } } },
  { type: 'dnsFlood',           label: 'DNS Flood',           presets: { Liviano: { queries_per_second: 200 },    Medio: { queries_per_second: 1000 }, Agresivo: { queries_per_second: 5000 } } },
  { type: 'synFlood',           label: 'SYN Flood (L4)',      presets: { Liviano: { packets_per_second: 1000 },   Medio: { packets_per_second: 5000 }, Agresivo: { packets_per_second: 20000 } } },
  { type: 'udpFlood',           label: 'UDP Flood (L3/4)',    presets: { Liviano: { packets_per_second: 1000 },   Medio: { packets_per_second: 5000 }, Agresivo: { packets_per_second: 20000 } } },
]

const INTENSITIES = ['Liviano', 'Medio', 'Agresivo']

const STATUS_COLOR = {
  open:                'text-[#60a5fa]',
  filled:              'text-[#a78bfa]',
  running:             'text-[#f97316]',
  revealPhase:         'text-[#f97316]',
  pendingFinalization: 'text-[#f97316]',
  completed:           'text-[#4ade80]',
  cancelled:           'text-[#888]',
}

function CreateJobForm({ client, onCreated }) {
  const [attack, setAttack]       = useState(ATTACKS[0].type)
  const [intensity, setIntensity] = useState('Medio')
  const [target, setTarget]       = useState('https://')
  const [minNodes, setMinNodes]   = useState(3)
  const [duration, setDuration]   = useState(30)
  const [payment, setPayment]     = useState(0.03)
  const [busy, setBusy]           = useState(false)
  const [error, setError]         = useState(null)

  const attackDef = ATTACKS.find(a => a.type === attack)
  const config    = attackDef.presets[intensity]

  async function submit(e) {
    e.preventDefault()
    setBusy(true); setError(null)
    try {
      await client.createJob({
        target,
        runnerType:      attack,
        runnerConfig:    config,
        durationSeconds: Number(duration),
        minNodes:        Number(minNodes),
        paymentSol:      Number(payment),
      })
      onCreated()
    } catch (err) {
      setError(err.message ?? String(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="border border-[#2a2a2a] rounded p-6 space-y-4">
      <h2 className="text-sm font-bold text-[#f5f5f5]">Create a load test</h2>

      <div>
        <label className="block text-xs text-[#888] mb-1">Target</label>
        <input
          value={target} onChange={e => setTarget(e.target.value)}
          placeholder="https://your-server.com"
          className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:border-[#f97316] outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-[#888] mb-1">Attack type</label>
          <select
            value={attack} onChange={e => setAttack(e.target.value)}
            className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:border-[#f97316] outline-none"
          >
            {ATTACKS.map(a => <option key={a.type} value={a.type}>{a.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-[#888] mb-1">Intensity</label>
          <div className="flex gap-1">
            {INTENSITIES.map(i => (
              <button
                key={i} type="button" onClick={() => setIntensity(i)}
                className={`flex-1 text-xs py-2 rounded border transition-colors ${
                  intensity === i ? 'border-[#f97316] text-[#f97316]' : 'border-[#2a2a2a] text-[#888]'
                }`}
              >{i}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-[#888] mb-1">Nodes</label>
          <input type="number" min="1" max="10" value={minNodes} onChange={e => setMinNodes(e.target.value)}
            className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:border-[#f97316] outline-none" />
        </div>
        <div>
          <label className="block text-xs text-[#888] mb-1">Duration (s)</label>
          <input type="number" min="10" max="3600" value={duration} onChange={e => setDuration(e.target.value)}
            className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:border-[#f97316] outline-none" />
        </div>
        <div>
          <label className="block text-xs text-[#888] mb-1">Payment (SOL)</label>
          <input type="number" min="0" step="0.01" value={payment} onChange={e => setPayment(e.target.value)}
            className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:border-[#f97316] outline-none" />
        </div>
      </div>

      <p className="text-xs text-[#666] font-mono">config: {JSON.stringify(config)}</p>
      {error && <p className="text-xs text-[#f87171]">{error}</p>}

      <button
        type="submit" disabled={busy}
        className="w-full bg-[#f97316] text-[#0a0a0a] font-bold text-sm py-2.5 rounded hover:bg-[#fb923c] transition-colors disabled:opacity-50"
      >
        {busy ? 'Sending transaction…' : 'Create job'}
      </button>
    </form>
  )
}

function JobResults({ client, jobPubkey }) {
  const [results, setResults] = useState(null)

  useEffect(() => {
    let alive = true
    client.getJobResults(jobPubkey).then(r => { if (alive) setResults(r) }).catch(() => {})
    return () => { alive = false }
  }, [client, jobPubkey])

  if (!results) return <p className="text-xs text-[#666] mt-2">Loading results…</p>
  if (results.length === 0) return <p className="text-xs text-[#666] mt-2">No revealed results.</p>

  return (
    <div className="mt-3 border-t border-[#2a2a2a] pt-3 space-y-2">
      {results.map((r) => (
        <div key={r.node} className="text-xs grid grid-cols-4 gap-2">
          <span className="text-[#888] font-mono truncate">{r.node.slice(0, 6)}…</span>
          <span className="text-[#f5f5f5]">{r.baselineLatencyMs}ms → {r.avgLatencyMs}ms</span>
          <span className={r.degradation > 2 ? 'text-[#f87171]' : 'text-[#4ade80]'}>
            {r.degradation != null ? `${r.degradation}× slower` : '—'}
          </span>
          <span className="text-[#888]">{r.errorRatePct}% err · {r.requestsCompleted.toLocaleString()} req</span>
        </div>
      ))}
    </div>
  )
}

function JobList({ client, refreshKey }) {
  const [jobs, setJobs]       = useState([])
  const [loading, setLoading] = useState(true)
  const [openJob, setOpenJob] = useState(null)

  const load = useCallback(() => {
    setLoading(true)
    client.listJobs().then(setJobs).catch(() => setJobs([])).finally(() => setLoading(false))
  }, [client])

  useEffect(() => { load() }, [load, refreshKey])

  if (loading) return <p className="text-sm text-[#888]">Loading your jobs…</p>
  if (jobs.length === 0) return <p className="text-sm text-[#888]">No jobs yet. Create one above.</p>

  return (
    <div className="space-y-3">
      {jobs.map((j) => (
        <div key={j.pubkey} className="border border-[#2a2a2a] rounded p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#f5f5f5] font-mono">{j.target}</p>
              <p className="text-xs text-[#888]">{j.runnerType} · {j.paymentSol} SOL · {j.nodesClaimed}/{j.minNodes} nodes</p>
            </div>
            <span className={`text-xs font-mono ${STATUS_COLOR[j.status] ?? 'text-[#888]'}`}>{j.status}</span>
          </div>
          {j.status === 'completed' && (
            <button
              onClick={() => setOpenJob(openJob === j.pubkey ? null : j.pubkey)}
              className="text-xs text-[#f97316] mt-2 hover:underline"
            >
              {openJob === j.pubkey ? 'Hide results' : 'View results'}
            </button>
          )}
          {openJob === j.pubkey && <JobResults client={client} jobPubkey={j.pubkey} />}
        </div>
      ))}
    </div>
  )
}

function MultiVectorForm({ client, onLaunched }) {
  const [target, setTarget]     = useState('http://mock-target:3000')
  const [duration, setDuration] = useState(30)
  const [payment, setPayment]   = useState(0.03)
  const [vectors, setVectors]   = useState([
    { type: 'httpFlood', intensity: 'Medio', minNodes: 3 },
    { type: 'slowloris', intensity: 'Medio', minNodes: 2 },
  ])
  const [campaign, setCampaign] = useState(null) // PublicKey[] once created
  const [busy, setBusy]         = useState(false)
  const [error, setError]       = useState(null)

  const updateVector = (i, patch) => setVectors(vs => vs.map((v, idx) => idx === i ? { ...v, ...patch } : v))
  const addVector    = () => setVectors(vs => [...vs, { type: 'tlsExhaustion', intensity: 'Medio', minNodes: 3 }])
  const removeVector = (i) => setVectors(vs => vs.filter((_, idx) => idx !== i))

  const totalNodes = vectors.reduce((n, v) => n + Number(v.minNodes), 0)

  async function create(e) {
    e.preventDefault()
    setBusy(true); setError(null)
    try {
      const resolved = vectors.map(v => ({
        type:     v.type,
        config:   ATTACKS.find(a => a.type === v.type).presets[v.intensity],
        minNodes: Number(v.minNodes),
      }))
      const jobPubkeys = await client.createMultiVectorJob({
        target,
        vectors:         resolved,
        minNodes:        Number(vectors[0]?.minNodes ?? 1), // default fallback
        durationSeconds: Number(duration),
        paymentSol:      Number(payment),
      })
      setCampaign(jobPubkeys)
    } catch (err) {
      setError(err.message ?? String(err))
    } finally {
      setBusy(false)
    }
  }

  if (campaign) {
    return <CampaignFlow client={client} jobPubkeys={campaign} onLaunched={onLaunched} onReset={() => setCampaign(null)} />
  }

  return (
    <form onSubmit={create} className="border border-[#2a2a2a] rounded p-6 space-y-4">
      <div>
        <h2 className="text-sm font-bold text-[#f5f5f5]">Multi-vector campaign</h2>
        <p className="text-xs text-[#888] mt-1">Several attacks against one target, fired simultaneously once every node has claimed.</p>
      </div>

      <div>
        <label className="block text-xs text-[#888] mb-1">Target</label>
        <input
          value={target} onChange={e => setTarget(e.target.value)}
          className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:border-[#f97316] outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs text-[#888]">Vectors</label>
        <div className="flex gap-2 items-center text-[10px] text-[#666] uppercase tracking-wide px-1">
          <span className="flex-1">Attack</span>
          <span className="w-24">Intensity</span>
          <span className="w-16 text-center">Nodes</span>
          <span className="w-5" />
        </div>
        {vectors.map((v, i) => (
          <div key={i} className="flex gap-2 items-center">
            <select
              value={v.type} onChange={e => updateVector(i, { type: e.target.value })}
              className="flex-1 bg-[#111] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:border-[#f97316] outline-none"
            >
              {ATTACKS.map(a => <option key={a.type} value={a.type}>{a.label}</option>)}
            </select>
            <select
              value={v.intensity} onChange={e => updateVector(i, { intensity: e.target.value })}
              className="w-24 bg-[#111] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:border-[#f97316] outline-none"
            >
              {INTENSITIES.map(int => <option key={int} value={int}>{int}</option>)}
            </select>
            <input
              type="number" min="1" max="10" value={v.minNodes}
              onChange={e => updateVector(i, { minNodes: e.target.value })}
              className="w-16 bg-[#111] border border-[#2a2a2a] rounded px-2 py-2 text-sm text-[#f5f5f5] text-center focus:border-[#f97316] outline-none"
            />
            <button
              type="button" onClick={() => removeVector(i)} disabled={vectors.length <= 1}
              className="w-5 text-[#888] hover:text-[#f87171] disabled:opacity-30"
            >✕</button>
          </div>
        ))}
        <button type="button" onClick={addVector} className="text-xs text-[#f97316] hover:underline">+ Add vector</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-[#888] mb-1">Duration (s)</label>
          <input type="number" min="10" max="3600" value={duration} onChange={e => setDuration(e.target.value)}
            className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:border-[#f97316] outline-none" />
        </div>
        <div>
          <label className="block text-xs text-[#888] mb-1">SOL / vector</label>
          <input type="number" min="0" step="0.01" value={payment} onChange={e => setPayment(e.target.value)}
            className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:border-[#f97316] outline-none" />
        </div>
      </div>

      <p className="text-xs text-[#666]">{vectors.length} vectors · {totalNodes} nodes total · {(vectors.length * payment).toFixed(2)} SOL · one signature per vector</p>
      {error && <p className="text-xs text-[#f87171]">{error}</p>}

      <button type="submit" disabled={busy}
        className="w-full bg-[#f97316] text-[#0a0a0a] font-bold text-sm py-2.5 rounded hover:bg-[#fb923c] transition-colors disabled:opacity-50">
        {busy ? 'Creating campaign…' : 'Create campaign'}
      </button>
    </form>
  )
}

function CampaignFlow({ client, jobPubkeys, onLaunched, onReset }) {
  const [statuses, setStatuses] = useState({})
  const [launching, setLaunching] = useState(false)
  const [launched, setLaunched]   = useState(false)
  const [error, setError]         = useState(null)

  useEffect(() => {
    let alive = true
    const poll = async () => {
      const entries = await Promise.all(jobPubkeys.map(async pk => {
        try { const j = await client.getJob(pk); return [pk.toString(), j.status] }
        catch { return [pk.toString(), 'unknown'] }
      }))
      if (alive) setStatuses(Object.fromEntries(entries))
    }
    poll()
    const id = setInterval(poll, 3000)
    return () => { alive = false; clearInterval(id) }
  }, [client, jobPubkeys])

  const filledCount = jobPubkeys.filter(pk => statuses[pk.toString()] === 'filled').length
  const allFilled   = jobPubkeys.length > 0 && filledCount === jobPubkeys.length

  async function launch() {
    setLaunching(true); setError(null)
    try {
      const runAt = Math.floor(Date.now() / 1000) + 20 // 20s margin to coordinate
      await client.scheduleMultiVectorJob(jobPubkeys, runAt)
      setLaunched(true)
      onLaunched?.()
    } catch (err) {
      setError(err.message ?? String(err))
    } finally {
      setLaunching(false)
    }
  }

  return (
    <div className="border border-[#2a2a2a] rounded p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-[#f5f5f5]">Campaign · {jobPubkeys.length} vectors</h2>
        <button onClick={onReset} className="text-xs text-[#888] hover:text-[#f97316]">New campaign</button>
      </div>

      <div className="space-y-1">
        {jobPubkeys.map((pk) => {
          const s = statuses[pk.toString()] ?? '…'
          return (
            <div key={pk.toString()} className="flex justify-between text-xs">
              <span className="font-mono text-[#888]">{pk.toString().slice(0, 8)}…</span>
              <span className={STATUS_COLOR[s] ?? 'text-[#888]'}>{s}</span>
            </div>
          )
        })}
      </div>

      {!launched ? (
        <>
          <p className="text-xs text-[#888]">
            {allFilled
              ? 'All vectors claimed. Launch to fire them simultaneously.'
              : `Waiting for nodes to claim every vector — ${filledCount}/${jobPubkeys.length} filled…`}
          </p>
          {error && <p className="text-xs text-[#f87171]">{error}</p>}
          <button
            onClick={launch} disabled={!allFilled || launching}
            className="w-full bg-[#f97316] text-[#0a0a0a] font-bold text-sm py-2.5 rounded hover:bg-[#fb923c] transition-colors disabled:opacity-40"
          >
            {launching ? 'Scheduling…' : 'Launch coordinated attack'}
          </button>
        </>
      ) : (
        <p className="text-xs text-[#4ade80]">Launched — all vectors fire together in ~20s. Track them in “Your jobs” below.</p>
      )}
    </div>
  )
}

function Dashboard() {
  const { connected } = useWallet()
  const client = useFusill()
  const [refreshKey, setRefreshKey] = useState(0)
  const [mode, setMode] = useState('single')

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      <header className="border-b border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
        <Link to="/"><Logo size="sm" /></Link>
        <WalletMultiButton />
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        {!connected || !client ? (
          <div className="text-center py-20 space-y-4">
            <p className="text-[#888] text-sm">Connect your wallet to create and manage load test jobs on devnet.</p>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              {[['single', 'Single attack'], ['multi', 'Multi-vector']].map(([m, label]) => (
                <button
                  key={m} onClick={() => setMode(m)}
                  className={`text-xs px-4 py-2 rounded border transition-colors ${
                    mode === m ? 'border-[#f97316] text-[#f97316]' : 'border-[#2a2a2a] text-[#888]'
                  }`}
                >{label}</button>
              ))}
            </div>

            {mode === 'single'
              ? <CreateJobForm client={client} onCreated={() => setRefreshKey(k => k + 1)} />
              : <MultiVectorForm client={client} onLaunched={() => setRefreshKey(k => k + 1)} />}

            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold">Your jobs</h2>
                <button onClick={() => setRefreshKey(k => k + 1)} className="text-xs text-[#888] hover:text-[#f97316]">Refresh</button>
              </div>
              <JobList client={client} refreshKey={refreshKey} />
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default function AppPage() {
  return (
    <WalletProviders>
      <Dashboard />
    </WalletProviders>
  )
}
