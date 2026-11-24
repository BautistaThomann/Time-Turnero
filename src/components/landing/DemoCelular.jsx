import { useEffect, useState } from 'react'
import { Store } from 'lucide-react'
import ScrollCue from './ScrollCue.jsx'

const STEPS = [
  { title: 'Elige el servicio', text: 'Ve la duración de cada uno.' },
  { title: 'Elige profesional', text: 'O deja que el sistema asigne uno libre.' },
  { title: 'Elige el horario', text: 'Solo aparecen los horarios disponibles.' },
  { title: 'Completa sus datos', text: 'Sin crear una cuenta.' },
  { title: 'Recibe la confirmación', text: 'Por email, y un recordatorio antes del turno.' },
]
const DURACION = 2600

const opcion = 'rounded-2xl border border-time-border bg-white p-3.5'
const opcionActiva = 'pulse-ring rounded-2xl border-2 border-time-primary bg-white p-3.5'

function Pantalla({ step }) {
  if (step === 0)
    return (
      <div className="slide flex flex-col gap-2.5">
        <b className="font-manrope text-xl">Elegí un servicio</b>
        <div className={opcionActiva}><b className="text-[15px]">Corte de pelo</b><br /><span className="text-[13px] text-[#5B6472]">45 min</span></div>
        <div className={opcion}><b className="text-[15px]">Coloración</b><br /><span className="text-[13px] text-[#5B6472]">90 min</span></div>
        <div className={opcion}><b className="text-[15px]">Barba</b><br /><span className="text-[13px] text-[#5B6472]">30 min</span></div>
      </div>
    )
  if (step === 1)
    return (
      <div className="slide flex flex-col gap-2.5">
        <b className="font-manrope text-xl">Elegí profesional</b>
        {[
          { ini: 'LG', name: 'Laura Gómez', c: 'bg-time-primary text-time-accent', on: true },
          { ini: 'MR', name: 'Martín Ríos', c: 'bg-time-accent text-white' },
          { ini: '?', name: 'Cualquiera disponible', c: 'bg-time-secondary text-time-accent' },
        ].map((p) => (
          <div key={p.ini} className={`flex items-center gap-3 ${p.on ? opcionActiva : opcion} !p-3`}>
            <span className={`inline-flex size-10 items-center justify-center rounded-full font-extrabold ${p.c}`}>{p.ini}</span>
            <b className="text-[15px]">{p.name}</b>
          </div>
        ))}
      </div>
    )
  if (step === 2)
    return (
      <div className="slide flex flex-col gap-2.5">
        <b className="font-manrope text-xl">Elegí horario</b>
        <span className="text-[13px] text-[#5B6472]">Martes 24</span>
        <div className="grid grid-cols-3 gap-[7px]">
          {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'].map((t) => {
            if (t === '09:30' || t === '11:30')
              return <span key={t} className="rounded-[10px] bg-gray-100 py-2.5 text-center text-[13px] text-gray-400 line-through">{t}</span>
            if (t === '10:30')
              return <span key={t} className="pulse-ring rounded-[10px] bg-time-primary py-2.5 text-center text-[13px] font-bold">{t}</span>
            return <span key={t} className="rounded-[10px] border border-time-border bg-white py-2.5 text-center text-[13px]">{t}</span>
          })}
        </div>
      </div>
    )
  if (step === 3)
    return (
      <div className="slide flex flex-col gap-2.5">
        <b className="font-manrope text-xl">Tus datos</b>
        <span className="text-[13px] text-[#5B6472]">Nombre</span>
        <div className="rounded-xl border-2 border-time-primary bg-white p-3 text-[15px]">
          Ana Torres
          <span className="caret ml-0.5 inline-block h-4 w-0.5 bg-time-accent align-middle" />
        </div>
        <span className="text-[13px] text-[#5B6472]">Email</span>
        <div className="rounded-xl border border-time-border bg-white p-3 text-[15px] text-gray-400">ana@email.com</div>
        <div className="pulse-ring mt-2 rounded-[14px] bg-time-primary p-3.5 text-center text-[15px] font-bold">Confirmar turno</div>
      </div>
    )
  return (
    <div className="pop pt-10 text-center">
      <span className="inline-flex size-[86px] items-center justify-center rounded-full bg-time-accent">
        <svg className="check" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#FC6F20" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <p className="mt-5 mb-1.5 font-manrope text-[22px] font-extrabold">¡Listo, Ana!</p>
      <p className="m-0 text-sm leading-relaxed text-gray-600">Martes 24 · 10:30<br />Corte con Laura Gómez</p>
      <p className="mt-[22px] rounded-xl bg-time-secondary p-2.5 text-[13px]">Te enviamos la confirmación por email</p>
    </div>
  )
}

// El celular reproduce solo los 5 pasos; tocar un paso lo muestra y reinicia el ciclo
export default function DemoCelular() {
  const [step, setStep] = useState(0)
  const [ciclo, setCiclo] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % STEPS.length), DURACION)
    return () => clearInterval(t)
  }, [ciclo])

  const ir = (i) => {
    setStep(i)
    setCiclo((c) => c + 1)
  }

  return (
    <section id="demo" className="screen relative overflow-hidden bg-time-accent py-16 lg:py-20">
      <div aria-hidden="true" className="blob absolute -top-[120px] -right-[140px] size-[520px] bg-[rgba(252,111,32,0.16)]" />
      <div className="screen-body relative mx-auto flex max-w-[1200px] flex-wrap items-center gap-12 px-5 sm:px-8 lg:gap-16">
        <div className="min-w-0 flex-[1_1_440px]">
          <p className="mb-3.5 text-sm font-semibold tracking-[0.12em] text-time-primary uppercase">La demo</p>
          <h2 className="m-0 font-manrope text-4xl leading-[1.1] font-extrabold tracking-[-0.02em] text-white md:text-[46px]">
            Así reserva un cliente, en menos de un minuto.
          </h2>
          <p className="mt-[18px] mb-[34px] text-lg leading-relaxed text-gray-300">Tocá cualquier paso para verlo en el celular.</p>
          <div className="flex flex-col gap-2.5">
            {STEPS.map((s, i) =>
              i === step ? (
                <button
                  key={i}
                  type="button"
                  aria-current="step"
                  className="relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-[18px] border border-time-primary bg-[rgba(252,111,32,0.14)] px-4 py-3.5 text-left text-white sm:px-5 sm:py-4"
                >
                  <span className="inline-flex size-9 flex-none items-center justify-center rounded-full bg-time-primary font-manrope font-extrabold text-time-accent">{i + 1}</span>
                  <span>
                    <b className="font-manrope text-lg">{s.title}</b>
                    <br />
                    <span className="text-sm text-gray-300">{s.text}</span>
                  </span>
                  <span
                    key={`${step}-${ciclo}`}
                    className="barx absolute bottom-0 left-0 h-[3px] w-full bg-time-primary"
                    style={{ animationDuration: `${DURACION / 1000}s`, animationTimingFunction: 'linear' }}
                  />
                </button>
              ) : (
                <button
                  key={i}
                  type="button"
                  onClick={() => ir(i)}
                  className="chip flex cursor-pointer items-center gap-4 rounded-[18px] border border-white/15 bg-transparent px-4 py-3.5 text-left text-white sm:px-5 sm:py-4"
                >
                  <span className="inline-flex size-9 flex-none items-center justify-center rounded-full bg-white/10 font-manrope font-extrabold">{i + 1}</span>
                  <b className="font-manrope text-lg">{s.title}</b>
                </button>
              ),
            )}
          </div>
        </div>

        <div className="flex min-w-0 flex-[1_1_360px] justify-center">
          <div
            id="pipo-phone"
            className="float2 box-border h-[580px] w-[286px] sm:h-[610px] sm:w-[300px] rounded-[48px] bg-[#111111] p-3 shadow-[0_50px_90px_-30px_rgba(0,0,0,0.7),inset_0_0_0_2px_#4B5563]"
          >
            <div className="flex h-full w-full flex-col overflow-hidden rounded-[38px] bg-time-background">
              <div className="flex h-[30px] items-center justify-center">
                <span className="h-[22px] w-[90px] rounded-full bg-[#111111]" />
              </div>
              <div className="flex items-center gap-2.5 px-5 pt-2.5 pb-1.5">
                <span className="inline-flex size-[34px] items-center justify-center rounded-[10px] bg-time-secondary">
                  <Store size={18} className="text-time-orange-dark" aria-hidden="true" />
                </span>
                <b className="font-manrope text-[15px]">Peluquería Estilo</b>
              </div>
              <div className="flex gap-[5px] px-5 pt-2 pb-1">
                {STEPS.map((_, i) => (
                  <span key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-time-primary' : 'bg-time-border'}`} />
                ))}
              </div>
              <div key={step} className="flex flex-1 flex-col gap-2.5 px-5 py-3.5">
                <Pantalla step={step} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollCue to="panel" label="Conocé el panel" dark />
    </section>
  )
}
