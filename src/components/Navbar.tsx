export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10">
      <span className="font-display text-lg tracking-wide text-mist">NOVA</span>

      <nav className="hidden items-center gap-8 text-sm text-mist-dim md:flex">
        <a href="#features" className="transition-colors hover:text-mist">
          Features
        </a>
        <a href="#colorways" className="transition-colors hover:text-mist">
          Colorways
        </a>
        <a href="#footer" className="transition-colors hover:text-mist">
          Contact
        </a>
      </nav>

      <a
        href="#footer"
        className="rounded-full bg-ember px-5 py-2 text-sm font-semibold text-void transition-colors hover:bg-ember-soft"
      >
        Notify Me
      </a>
    </header>
  )
}
