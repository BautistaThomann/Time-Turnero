import { Link2 } from 'lucide-react'
import ScrollCue from './ScrollCue.jsx'

const PASOS = [
  { t: 'Creá tu negocio', d: 'Registrate con los datos de tu empresa y entrás a tu panel de dueño.' },
  { t: 'Configuralo en cinco pasos', d: 'Sucursales, horarios, servicios, profesionales y tu marca, con un asistente que te guía.' },
  { t: 'Compartí tu enlace', d: 'Por WhatsApp, en tus redes o en el mostrador, y empezás a recibir turnos.' },
]

export default function ComoEmpezar() {
  return (
    <section id="como" className="screen mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-20">
      <div className="screen-body">
      <div className="reveal mx-auto max-w-[720px] text-center">
        <p className="mb-3.5 text-sm font-semibold tracking-[0.12em] text-time-orange-dark uppercase">Cómo empezar</p>
        <h2 className="m-0 font-manrope text-4xl leading-[1.1] font-extrabold tracking-[-0.02em] md:text-[46px]">
          Funcionando en tres pasos.
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-4 sm:mt-14 sm:gap-5">
        {PASOS.map((p, i) => (
          <div key={p.t} className="lift reveal rounded-[24px] border border-time-border bg-white p-7 sm:rounded-[28px] sm:p-9">
            <span className="inline-flex size-[52px] items-center justify-center rounded-full bg-time-primary font-manrope text-[22px] font-extrabold">
              {i + 1}
            </span>
            <h3 className="mt-[22px] mb-2.5 font-manrope text-[23px] font-extrabold">{p.t}</h3>
            <p className="m-0 text-base leading-[1.65] text-gray-600">{p.d}</p>
          </div>
        ))}
      </div>

      <div className="reveal mt-7 flex flex-wrap items-center gap-x-8 gap-y-5 rounded-[24px] bg-time-accent px-6 py-6 sm:rounded-[28px] sm:px-9 sm:py-[30px]">
        <p className="m-0 flex-[1_1_260px] font-manrope text-2xl font-extrabold text-white">Tu negocio, tu propio enlace.</p>
        <div className="flex min-w-0 flex-[2_1_320px] items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-[18px]">
          <Link2 size={22} className="flex-none text-time-primary" aria-hidden="true" />
          <p className="m-0 min-w-0 font-manrope text-[15px] font-bold break-all text-white sm:text-[17px]">
            time-turnerodigital.vercel.app/timeturnero/<span className="text-time-primary">tu-negocio</span>
            <span className="caret ml-0.5 inline-block h-[18px] w-0.5 bg-time-primary align-middle" />
          </p>
        </div>
      </div>
      </div>
      <ScrollCue to="faq" label="Preguntas frecuentes" />
    </section>
  )
}
