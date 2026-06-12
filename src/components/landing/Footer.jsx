import Logo from '../ui/Logo'

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo size="sm" />
        <p className="text-xs text-[#888]">
          Open-source · Built on Solana · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
