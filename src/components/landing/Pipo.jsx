import { useCallback, useEffect, useRef, useState } from 'react'

/*
  Pipo, la mascota de Time.
  - Al entrar se presenta arriba de la tarjeta de reserva, con el fondo desenfocado.
  - Al hacer scroll vuela y se posa arriba del elemento que está en pantalla
    (los elementos se marcan con id="pipo-...").
  - Cambia de pose y de mensaje según lo que hace el usuario.
*/

const W = 110
const H = 128

// ax = en qué parte del ancho del elemento se para (0 = izquierda, 1 = derecha)
// side = el globito va al costado en lugar de arriba
const PERCHES = [
  { id: 'pipo-hero', ax: 0.84 },
  { id: 'pipo-compare', ax: 0.88, side: true },
  { id: 'pipo-phone', ax: 0.78 },
  { id: 'pipo-panel', ax: 0.9, side: true },
  { id: 'pipo-calc', ax: 0.84 },
  { id: 'pipo-faq', ax: 0.9 },
  { id: 'pipo-cta', ax: 0.86 },
]

const POKES = [
  '¡Ja! Me hacés cosquillas.',
  'Soy Pipo, el ayudante de Time.',
  'Tus clientes no necesitan cuenta para reservar.',
  'Te aviso por email de cada turno nuevo.',
]

function mensaje(perch, { booked, before, tab, horas }) {
  switch (perch) {
    case 'pipo-hero':
      return booked
        ? { m: '¡Bien ahí! Así de fácil reservan tus clientes.', pose: 'party' }
        : { m: '¡Hola! Soy Pipo. Probá reservar un turno en esta tarjeta.', pose: 'wave' }
    case 'pipo-compare':
      return before
        ? { m: 'Tocá «Con Time» y mirá cómo cambia el día.', pose: 'point' }
        : { m: '¿Viste? Cero mensajes para coordinar.', pose: 'party' }
    case 'pipo-phone':
      return { m: 'Este es el paso a paso de tus clientes. Tocá uno para verlo.', pose: 'wave' }
    case 'pipo-panel':
      return tab === 'stats'
        ? { m: 'Con las estadísticas ves cómo le va a tu negocio.', pose: 'party' }
        : { m: 'Probá las pestañas del panel.', pose: 'point' }
    case 'pipo-calc':
      return horas >= 20
        ? { m: `¡${horas} horas al mes! Ese tiempo lo recuperás.`, pose: 'party' }
        : { m: 'Mové las barras y fijate cuánto tiempo recuperás.', pose: 'think' }
    case 'pipo-faq':
      return { m: '¿Dudas? Tocá una pregunta y te la respondo.', pose: 'think' }
    case 'pipo-cta':
      return { m: '¿Arrancamos? Creá tu negocio en Time.', pose: 'wave' }
    default:
      return { m: '¡Hola! Soy Pipo.', pose: 'wave' }
  }
}

export function PipoSvg({ pose = 'idle', size = 110 }) {
  return (
    <div className={`pipo pose-${pose}`}>
      <svg width={size} height={(size * 128) / 110} viewBox="0 0 120 140" aria-hidden="true">
        <g className="pb">
          <path className="wl" d="M24 80 C12 90 10 108 16 120 C24 113 30 101 30 88 Z" fill="#FC6F20" />
          <path className="wr" d="M96 80 C108 90 110 108 104 120 C96 113 90 101 90 88 Z" fill="#FC6F20" />
          <ellipse cx="51" cy="133" rx="9" ry="4" fill="#FC6F20" />
          <ellipse cx="69" cy="133" rx="9" ry="4" fill="#FC6F20" />
          <rect x="44" y="96" width="32" height="36" rx="16" fill="#323232" />
          <g className="head">
            <path className="ant" d="M60 26 C57 12 64 4 72 6 C79 8 78 16 73 16" fill="none" stroke="#FC6F20" strokeWidth="5" strokeLinecap="round" />
            <circle cx="60" cy="66" r="42" fill="#323232" />
            <ellipse cx="60" cy="86" rx="26" ry="20" fill="#F6E6D6" />
            <g className="eyes">
              <circle cx="47" cy="56" r="9" fill="#FFFFFF" />
              <circle cx="73" cy="56" r="9" fill="#FFFFFF" />
              <circle cx="48" cy="57" r="4.5" fill="#323232" />
              <circle cx="72" cy="57" r="4.5" fill="#323232" />
            </g>
            <path d="M53 66 L67 66 L60 78 Z" fill="#FC6F20" />
          </g>
        </g>
      </svg>
    </div>
  )
}

const burbuja =
  'pop absolute w-[220px] sm:w-60 border-2 border-time-primary bg-white px-4 py-3 font-manrope text-[15px] leading-[1.35] font-bold text-time-accent shadow-[0_16px_30px_-14px_rgba(50,50,50,.4)]'

function IntroCard({ onStart }) {
  return (
    <>
      <p className="m-0 font-manrope text-2xl font-extrabold text-time-accent">¡Hola! Soy Pipo</p>
      <p className="mt-2 text-base leading-normal text-gray-600">
        El ayudante de Time. Te acompaño a ver cómo tus clientes pueden reservar solos.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="btn shiny mt-4 cursor-pointer rounded-[14px] border-0 bg-time-primary px-[30px] py-[13px] text-base font-bold text-time-accent"
      >
        ¡Vamos!
      </button>
      <p className="mt-2.5 text-[13px] text-[#5B6472]">o deslizá para abajo</p>
    </>
  )
}

export default function Pipo({ booked, before, tab, horas }) {
  const boxRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [intro, setIntro] = useState(true)
  const [introMode, setIntroMode] = useState('side')
  const [pos, setPos] = useState({ perch: null, hover: false, right: true, side: false })
  const [flying, setFlying] = useState(true)
  const [poked, setPoked] = useState(0)
  // En celular el globito se muestra unos segundos y se esconde para no tapar contenido
  const [quiet, setQuiet] = useState(false)
  const quietTimer = useRef()

  // Valores actuales para usar dentro de los listeners sin recrearlos
  const live = useRef({})
  live.current = { intro, pos, introMode }
  const flyTimer = useRef()
  const pokeTimer = useRef()
  const introTop = useRef(null)
  const raf = useRef(null)

  const endIntro = useCallback(() => {
    if (!live.current.intro) return
    setIntro(false)
    setPos((p) => ({ ...p, perch: null }))
  }, [])

  const update = useCallback(() => {
    const el = boxRef.current
    if (!el) return
    const vh = window.innerHeight
    const vw = window.innerWidth
    const { intro: inIntro, pos: cur, introMode: curMode } = live.current

    // Presentación: quieto arriba de la tarjeta de reserva
    if (inIntro) {
      const hero = document.getElementById('inicio')
      if (hero) {
        const ht = hero.getBoundingClientRect().top
        if (introTop.current == null) introTop.current = ht
        if (Math.abs(ht - introTop.current) > 40) {
          endIntro()
          return
        }
      }
      const card = document.getElementById('pipo-hero')
      if (!card) return
      const cr = card.getBoundingClientRect()
      let ix = Math.max(8, Math.min(vw - W - 8, cr.left + cr.width * 0.84 - W / 2))
      let iy = Math.max(8, cr.top - 122)
      let mode = ix > 360 ? 'side' : 'below'
      // En pantallas chicas la tarjeta queda abajo: Pipo se presenta abajo a la derecha
      if (mode === 'below' && iy + H + 300 > vh) {
        mode = 'above'
        ix = vw - W - 12
        iy = vh - H - 12
      }
      el.style.transition = 'none'
      el.style.transform = `translate(${Math.round(ix)}px, ${Math.round(iy)}px)`
      if (mode !== curMode) setIntroMode(mode)
      return
    }

    el.style.transition = 'transform .85s cubic-bezier(.45,.05,.25,1)'

    // Elige el elemento más cerca del centro de la pantalla
    let best = null
    let bestD = Infinity
    for (const p of PERCHES) {
      const t = document.getElementById(p.id)
      if (!t) continue
      const r = t.getBoundingClientRect()
      if (r.bottom < 140 || r.top > vh * 0.85) continue
      const d = Math.abs(r.top + Math.min(r.height, vh) / 2 - vh * 0.5)
      if (d < bestD) {
        bestD = d
        best = { p, r }
      }
    }
    if (!best) return

    const { p, r } = best
    const x = Math.max(8, Math.min(vw - W - 8, r.left + r.width * p.ax - W / 2))
    let y = r.top - 122
    let hover = false
    const minY = vw < 640 ? 84 : 160
    const maxY = vh - H - 8
    if (y < minY) { y = minY; hover = true }
    if (y > maxY) { y = maxY; hover = true }
    el.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`

    const right = x + W / 2 > vw / 2
    // En celular el globito va siempre al costado para no tapar los títulos
    const side = (!!p.side || vw < 640) && x > 230
    if (p.id !== cur.perch || hover !== cur.hover || right !== cur.right || side !== cur.side) {
      if (p.id !== cur.perch) {
        setFlying(true)
        clearTimeout(flyTimer.current)
        setQuiet(false)
        clearTimeout(quietTimer.current)
        flyTimer.current = setTimeout(() => {
          setFlying(false)
          if (window.innerWidth < 640) quietTimer.current = setTimeout(() => setQuiet(true), 4000)
        }, 950)
      }
      setPos({ perch: p.id, hover, right, side })
    }
  }, [endIntro])

  // Aparece un momento después de cargar
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 600)
    return () => clearTimeout(t)
  }, [])

  // Escucha el scroll y el cambio de tamaño de la ventana
  useEffect(() => {
    const onScroll = () => {
      if (raf.current) return
      raf.current = requestAnimationFrame(() => {
        raf.current = null
        update()
      })
    }
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf.current)
      clearTimeout(flyTimer.current)
      clearTimeout(pokeTimer.current)
      clearTimeout(quietTimer.current)
    }
  }, [update])

  // Recalcula la posición cuando aparece y cuando termina la presentación
  useEffect(() => {
    if (ready) update()
  }, [ready, intro, update])

  const poke = () => {
    clearTimeout(pokeTimer.current)
    setPoked((n) => n + 1)
    pokeTimer.current = setTimeout(() => setPoked(0), 2400)
    setQuiet(false)
    clearTimeout(quietTimer.current)
    if (window.innerWidth < 640) quietTimer.current = setTimeout(() => setQuiet(true), 4000)
  }

  if (!ready) return null

  const info = mensaje(pos.perch, { booked, before, tab, horas })
  const poking = poked > 0
  const texto = poking ? POKES[(poked - 1) % POKES.length] : info.m
  const pose = intro ? 'wave' : flying || pos.hover ? 'fly' : poking ? 'party' : info.pose
  const showBubble = !intro && !flying && !pos.hover && !!pos.perch && (!quiet || poking)

  return (
    <>
      {intro && <button type="button" className="intro-veil" onClick={endIntro} aria-label="Cerrar la presentación de Pipo" />}

      <div
        ref={boxRef}
        className="pointer-events-none fixed top-0 left-0 z-50"
        style={{ width: W, height: H, willChange: 'transform' }}
      >
        {/* Presentación */}
        {intro && introMode === 'side' && (
          <div className="pointer-events-auto absolute top-1.5 right-[112px] w-[330px]">
            <div role="dialog" aria-label="Pipo se presenta" className="pop rounded-[24px_4px_24px_24px] border-2 border-time-primary bg-white px-6 py-[22px] text-center shadow-[0_30px_60px_-24px_rgba(50,50,50,.55)]">
              <IntroCard onStart={endIntro} />
            </div>
          </div>
        )}
        {intro && introMode === 'below' && (
          <div className="pointer-events-auto absolute top-[134px] left-0 w-[300px]">
            <div role="dialog" aria-label="Pipo se presenta" className="pop rounded-[4px_24px_24px_24px] border-2 border-time-primary bg-white px-[22px] py-5 text-center shadow-[0_30px_60px_-24px_rgba(50,50,50,.55)]">
              <IntroCard onStart={endIntro} />
            </div>
          </div>
        )}

        {intro && introMode === 'above' && (
          <div className="pointer-events-auto absolute right-0 bottom-[134px] w-[min(300px,calc(100vw-24px))]">
            <div role="dialog" aria-label="Pipo se presenta" className="pop rounded-[24px_24px_4px_24px] border-2 border-time-primary bg-white px-[22px] py-5 text-center shadow-[0_30px_60px_-24px_rgba(50,50,50,.55)]">
              <IntroCard onStart={endIntro} />
            </div>
          </div>
        )}

        {/* Globitos de ayuda (key = texto, así la animación se repite al cambiar) */}
        {showBubble && pos.side && (
          <div key={texto} role="status" className={`${burbuja} right-[108px] bottom-2 rounded-[18px_18px_4px_18px]`}>
            {texto}
          </div>
        )}
        {showBubble && !pos.side && pos.right && (
          <div key={texto} role="status" className={`${burbuja} right-0 bottom-[122px] rounded-[18px_18px_4px_18px]`}>
            {texto}
          </div>
        )}
        {showBubble && !pos.side && !pos.right && (
          <div key={texto} role="status" className={`${burbuja} bottom-[122px] left-0 rounded-[18px_18px_18px_4px]`}>
            {texto}
          </div>
        )}

        <button type="button" className="pipo-btn pop origin-bottom max-sm:scale-[.8]" onClick={poke} aria-label="Pipo, el ayudante de Time. Tocalo para un consejo.">
          <PipoSvg pose={pose} />
        </button>
      </div>
    </>
  )
}
