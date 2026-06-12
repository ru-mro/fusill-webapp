import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#2a2a2a] bg-[#0a0a0a]/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Logo size="md" />
        <div className="flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-[#888] hover:text-[#f5f5f5] transition-colors">
            How it works
          </a>
          <a href="#attacks" className="text-sm text-[#888] hover:text-[#f5f5f5] transition-colors">
            Attack types
          </a>
          <a
            href="https://github.com/mro/fusill"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#888] hover:text-[#f5f5f5] transition-colors"
          >
            GitHub
          </a>
          <Link
            to="/app"
            className="text-sm px-4 py-1.5 bg-[#f97316] text-black font-bold rounded hover:bg-[#ea6c0a] transition-colors"
          >
            Launch App
          </Link>
        </div>
      </div>
    </nav>
  )
}
