import Logo from '../ui/Logo'

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo size="sm" />
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <a
            href="mailto:ru-mro@proton.me"
            className="text-xs text-[#888] hover:text-white transition-colors"
          >
            ru-mro@proton.me
          </a>
          <p className="text-xs text-[#888]">
            Open-source · Built on Solana · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
