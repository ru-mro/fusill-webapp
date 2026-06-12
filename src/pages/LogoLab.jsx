const CENTER  = [0.50, 0.47]
const SOURCES = [
  { p: [0.16, 0.22], active: true  },
  { p: [0.81, 0.16], active: false },
  { p: [0.88, 0.63], active: true  },
  { p: [0.63, 0.88], active: false },
  { p: [0.19, 0.80], active: false },
]

function IconC({ size }) {
  const cx = CENTER[0] * size, cy = CENTER[1] * size
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {SOURCES.map(({ p, active }, i) => (
        <line key={i}
          x1={p[0] * size} y1={p[1] * size} x2={cx} y2={cy}
          stroke={active ? '#f97316' : '#333'}
          strokeWidth={size * 0.032}
          strokeLinecap="round"
          strokeDasharray={`${size * 0.08} ${size * 0.06}`}
          opacity={active ? 0.7 : 0.4}
        />
      ))}
      {SOURCES.map(({ p, active }, i) => (
        <circle key={i}
          cx={p[0] * size} cy={p[1] * size} r={size * 0.075}
          fill={active ? '#f97316' : '#444'}
        />
      ))}
      <circle cx={cx} cy={cy} r={size * 0.22} fill="#f97316" opacity="0.1" />
      <circle cx={cx} cy={cy} r={size * 0.14} fill="#f97316" />
    </svg>
  )
}

const SIZE = 36

const typo = [
  {
    id: '1',
    label: 'Mono bold — FUS/ILL split (actual)',
    el: <span className="font-mono font-bold tracking-tighter text-3xl">
          <span className="text-[#f5f5f5]">FUS</span>
          <span className="text-[#f97316]">ILL</span>
        </span>,
  },
  {
    id: '2',
    label: 'Mono bold — todo blanco',
    el: <span className="font-mono font-bold tracking-tighter text-3xl text-[#f5f5f5]">
          FUSILL
        </span>,
  },
  {
    id: '3',
    label: 'Sans bold — tracking normal',
    el: <span className="font-sans font-bold text-3xl text-[#f5f5f5]">
          FUSILL
        </span>,
  },
  {
    id: '4',
    label: 'Sans semibold — tracking wide',
    el: <span className="font-sans font-semibold tracking-widest text-2xl text-[#f5f5f5] uppercase">
          Fusill
        </span>,
  },
  {
    id: '5',
    label: 'Sans light — todo caps wide',
    el: <span className="font-sans font-light tracking-[0.2em] text-2xl text-[#f5f5f5] uppercase">
          FUSILL
        </span>,
  },
  {
    id: '6a',
    label: 'Mono — lowercase, naranja solo en dot',
    el: <span className="font-mono font-bold tracking-tight text-3xl text-[#f5f5f5]">
          fusill
        </span>,
  },
  {
    id: '6b',
    label: 'Mono — lowercase, "ill" en naranja',
    el: <span className="font-mono font-bold tracking-tight text-3xl">
          <span className="text-[#f5f5f5]">fus</span>
          <span className="text-[#f97316]">ill</span>
        </span>,
  },
  {
    id: '7',
    label: 'Sans bold — F naranja, resto blanco',
    el: <span className="font-sans font-bold text-3xl">
          <span className="text-[#f97316]">F</span>
          <span className="text-[#f5f5f5]">USILL</span>
        </span>,
  },
  {
    id: '8',
    label: 'Icon arriba del texto (stacked)',
    stacked: true,
    el: <span className="font-mono font-bold tracking-widest text-sm text-[#f5f5f5] uppercase">
          FUSILL
        </span>,
  },
]

export default function LogoLab() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] px-10 py-20">
      <p className="text-[#444] text-xs uppercase tracking-widest mb-16">Logo lab — C icon + typography</p>

      <div className="flex flex-col gap-12">
        {typo.map(({ id, label, el, stacked }) => (
          <div key={id} className="flex items-center gap-16">

            {/* dark bg */}
            <div className="w-64 flex items-center justify-start">
              {stacked ? (
                <div className="flex flex-col items-center gap-2">
                  <IconC size={SIZE} />
                  {el}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <IconC size={SIZE} />
                  {el}
                </div>
              )}
            </div>

            {/* white bg */}
            <div className="w-52 bg-white rounded px-6 py-4 flex items-center justify-center">
              {stacked ? (
                <div className="flex flex-col items-center gap-2">
                  <IconC size={SIZE} />
                  <span className="font-mono font-bold tracking-widest text-sm text-[#0a0a0a] uppercase">FUSILL</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <IconC size={SIZE} />
                  <span style={{ filter: 'invert(1) brightness(0.15)' }}>{el}</span>
                </div>
              )}
            </div>

            <p className="text-[#444] text-xs">{id} — {label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
