import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#2a2a2a] bg-[#0a0a0a]/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Logo size="md" />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
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

        {/* Mobile hamburger button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="md:hidden p-2 -mr-2 text-[#888] hover:text-[#f5f5f5] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#2a2a2a] bg-[#0a0a0a]/95 backdrop-blur-sm">
          <div className="px-6 py-4 flex flex-col gap-4">
            <a
              href="#how-it-works"
              onClick={close}
              className="text-sm text-[#888] hover:text-[#f5f5f5] transition-colors"
            >
              How it works
            </a>
            <a
              href="#attacks"
              onClick={close}
              className="text-sm text-[#888] hover:text-[#f5f5f5] transition-colors"
            >
              Attack types
            </a>
            <a
              href="https://github.com/mro/fusill"
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="text-sm text-[#888] hover:text-[#f5f5f5] transition-colors"
            >
              GitHub
            </a>
            <Link
              to="/app"
              onClick={close}
              className="text-sm px-4 py-2 bg-[#f97316] text-black font-bold rounded hover:bg-[#ea6c0a] transition-colors text-center"
            >
              Launch App
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
