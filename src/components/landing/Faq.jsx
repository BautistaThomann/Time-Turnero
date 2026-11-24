import { ChevronDown } from 'lucide-react'
import ScrollCue from './ScrollCue.jsx'

const PREGUNTAS = [
  {
    q: '¿Mis clientes tienen que crear una cuenta?',
    a: 'No. Reservan completando sus datos. Después pueden consultar o cancelar sus turnos desde su panel, ingresando con su DNI.',
  },
  {
    q: '¿Puedo tener varias sucursales y profesionales?',
    a: 'Sí. Cargás las sucursales que necesites, y cada profesional tiene sus propios horarios y servicios.',
  },
  {
    q: '¿Mis clientes reciben avisos de sus turnos?',
    a: 'Sí. El sistema envía por email la confirmación, el recordatorio y el aviso de cancelación, al cliente y al profesional.',
  },
  {
    q: '¿Puedo poner mi marca?',
    a: 'Sí. Elegís tus colores y tu logo, y la pantalla de reservas que ven tus clientes los usa.',
  },
]

export default function Faq() {
  return (
    <section id="faq" className="screen mx-auto max-w-[860px] px-5 py-16 sm:px-8 lg:py-20">
      <div className="screen-body">
      <div className="reveal text-center">
        <p className="mb-3.5 text-sm font-semibold tracking-[0.12em] text-time-orange-dark uppercase">Preguntas frecuentes</p>
        <h2 className="m-0 font-manrope text-4xl leading-[1.1] font-extrabold tracking-[-0.02em] md:text-[42px]">
          Lo que suelen preguntar.
        </h2>
      </div>
      <div id="pipo-faq" className="mt-10 flex flex-col gap-3 sm:mt-12">
        {PREGUNTAS.map((p) => (
          <details key={p.q} className="lift rounded-[20px] border border-time-border bg-white px-5 py-[18px] sm:px-[26px] sm:py-[22px]">
            <summary className="flex items-center justify-between gap-4 font-manrope text-base font-bold sm:text-lg">
              {p.q}
              <ChevronDown className="chev flex-none transition-transform duration-200" size={22} strokeWidth={2.2} aria-hidden="true" />
            </summary>
            <p className="mt-3.5 text-base leading-[1.65] text-gray-600">{p.a}</p>
          </details>
        ))}
      </div>
      </div>
      <ScrollCue to="empezar" label="Empezá ahora" />
    </section>
  )
}
