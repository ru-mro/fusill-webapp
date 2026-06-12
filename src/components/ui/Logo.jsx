import LogoIcon from './LogoIcon'

const cfg = {
  sm: { text: 'text-lg',  icon: 18 },
  md: { text: 'text-2xl', icon: 28 },
  lg: { text: 'text-4xl', icon: 42 },
}

export default function Logo({ size = 'md' }) {
  const { text, icon } = cfg[size]
  return (
    <span className={`inline-flex items-center gap-2.5 font-mono font-bold tracking-tight ${text}`}>
      <LogoIcon size={icon} />
      <span><span className="text-[#f5f5f5]">fus</span><span className="text-[#f97316]">ill</span></span>
    </span>
  )
}
