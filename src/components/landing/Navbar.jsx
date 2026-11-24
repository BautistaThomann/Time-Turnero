import { useEffect, useState } from 'react'
import logo from '../../assets/logo/logo-principal-turnero.png'

const LINKS = [
  { href: '#demo', label: 'Demo' },
  { href: '#panel', label: 'El panel' },
  { href: '#calculadora', label: 'Calculadora' },
  { href: '#faq', label: 'Preguntas' },
]

/*
  Barra de navegación:
  - Arriba de todo: transparente y sin línea.
  - Al hacer el primer scroll: se vuelve un vidrio translúcido, crece un poco
    (el alto y el logo) y la línea se reemplaza por una sombra muy suave.
  El header mantiene su alto fijo en el layout, así que al crecer no mueve el contenido.
*/
export default function Navbar({ registroUrl }) {
  const [scrolled, setScrolled] = useState(false)
  // true mientras la barra está encima de la sección oscura (la demo): ahí el vidrio es más opaco para que se lea
  const [overDark, setOverDark] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      const demo = document.getElementById('demo')
      if (demo) {
        const r = demo.getBoundingClientRect()
        setOverDark(r.top < 60 && r.bottom > 40)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const ease = 'ease-[cubic-bezier(.22,1,.36,1)]'

  return (
    <header className="sticky top-0 z-20 h-[var(--nav-h)]">
      <div
        className={`absolute inset-x-0 top-0 transition-[height,background-color,box-shadow,backdrop-filter] duration-500 ${ease} ${
          scrolled
            ? `h-[calc(var(--nav-h)+8px)] ${overDark ? 'bg-time-background/75' : 'bg-time-background/40'} shadow-[0_12px_32px_-20px_rgba(50,50,50,0.4)] backdrop-blur-xl backdrop-saturate-150`
            : 'h-[var(--nav-h)] bg-transparent shadow-none backdrop-blur-none'
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
          <a href="#inicio" aria-label="Time Turnero Digital, inicio" className="inline-flex origin-left">
            <img
              src={logo}
              alt="Time Turnero Digital"
              className={`h-12 w-[112px] object-contain transition-transform duration-500 sm:h-[60px] sm:w-[140px] ${ease} ${
                scrolled ? 'scale-[1.06]' : 'scale-100'
              }`}
              style={{ transformOrigin: 'left center' }}
            />
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
      </div>
    </header>
  )
}
