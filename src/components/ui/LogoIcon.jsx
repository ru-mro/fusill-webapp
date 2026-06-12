const CENTER  = [0.50, 0.47]
const SOURCES = [
  { p: [0.16, 0.22], active: true  },
  { p: [0.81, 0.16], active: false },
  { p: [0.88, 0.63], active: true  },
  { p: [0.63, 0.88], active: false },
  { p: [0.19, 0.80], active: false },
]

export default function LogoIcon({ size = 28 }) {
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
