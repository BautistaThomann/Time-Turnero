import logo from '../../assets/logo/logo-principal-turnero.png'

const LINKS = [
  { href: '#demo', label: 'Demo' },
  { href: '#panel', label: 'El panel' },
  { href: '#calculadora', label: 'Calculadora' },
  { href: '#faq', label: 'Preguntas' },
]

export default function Navbar({ registroUrl }) {
  return (
    <header className="sticky top-0 z-20 border-b border-time-border/70 bg-time-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-[var(--nav-h)] max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#inicio" aria-label="Time Turnero Digital, inicio" className="inline-flex">
          <img src={logo} alt="Time Turnero Digital" className="h-12 w-[112px] object-contain sm:h-[60px] sm:w-[140px]" />
        </a>
        <nav aria-label="Principal" className="flex items-center gap-5 lg:gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden text-[15px] font-medium text-time-accent no-underline hover:text-time-orange-dark md:inline"
            >
              {l.label}
            </a>
          ))}
          <a
            href={registroUrl}
            className="btn rounded-xl bg-time-primary px-4 py-2.5 text-sm font-bold whitespace-nowrap text-time-accent no-underline sm:px-[22px] sm:py-3 sm:text-[15px]"
          >
            Quiero probar Time
          </a>
        </nav>
      </div>
    </header>
  )
}
