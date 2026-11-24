import { useEffect, useState } from 'react'
import { CalendarDays, Check, Mail, MousePointer2, Play, Store } from 'lucide-react'
import ScrollCue from './ScrollCue.jsx'

const DAYS = [
  { id: 'lun', d: 'Lun', n: '23', full: false },
  { id: 'mar', d: 'Mar', n: '24', full: false },
  { id: 'mie', d: 'Mié', n: '25', full: true },
  { id: 'jue', d: 'Jue', n: '26', full: false },
  { id: 'vie', d: 'Vie', n: '27', full: false },
]
const NAMES = { lun: 'Lunes', mar: 'Martes', mie: 'Miércoles', jue: 'Jueves', vie: 'Viernes' }
const TIMES = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30']
const TAKEN = { lun: ['09:30', '11:00'], mar: ['09:30', '11:30'], jue: ['10:00', '10:30'], vie: ['09:00'] }

const NOTIFS = [
  { Icon: CalendarDays, circle: 'bg-time-accent text-white', title: 'Nuevo turno · 10:30', text: 'Carla reservó Coloración' },
  { Icon: Mail, circle: 'bg-time-primary text-time-accent', title: 'Recordatorio enviado', text: 'Diego · mañana 13:00' },
  { Icon: Check, circle: 'bg-time-secondary text-time-orange-dark', title: 'Turno confirmado', text: 'Ana · hoy 09:00' },
]

export default function HeroReserva({ booked, setBooked }) {
  const [day, setDay] = useState('mar')
  const [time, setTime] = useState(null)
  const [notif, setNotif] = useState(0)

  // Las notificaciones de ejemplo van rotando
  useEffect(() => {
    const t = setInterval(() => setNotif((n) => (n + 1) % NOTIFS.length), 2600)
    return () => clearInterval(t)
  }, [])

  const taken = TAKEN[day] || []
  const current = DAYS.find((d) => d.id === day)
  const dayLabel = `${NAMES[day]} ${current.n}`
  const N = NOTIFS[notif]

  const pickDay = (id) => {
    setDay(id)
    setTime(null)
  }
  const reset = () => {
    setBooked(false)
    setTime(null)
  }

  return (
    <section id="inicio" className="screen">
      <div className="screen-body mx-auto flex max-w-[1200px] flex-wrap items-center gap-10 px-5 pt-10 pb-6 sm:px-8 lg:gap-14 lg:pt-12 lg:[@media(max-height:820px)]:pt-4 lg:[@media(max-height:820px)]:pb-0">
      {/* Texto */}
      <div className="pop min-w-0 flex-[1_1_440px]">
        <p className="mb-[26px] lg:[@media(max-height:820px)]:mb-4 inline-flex items-center gap-2.5 rounded-full border border-time-border bg-white py-2 pr-4 pl-2.5 text-sm font-medium">
          <span className="pulse-ring ml-1 inline-block size-2.5 rounded-full bg-time-primary" />
          Turnero online para negocios de servicios
        </p>
        <h1 className="m-0 font-manrope text-[40px] leading-[1.04] font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-[56px] xl:text-[66px] lg:[@media(max-height:820px)]:text-[50px]">
          Tus clientes reservan solos.
          <br />
          <span className="text-time-orange-text">Vos te dedicás a atender.</span>
        </h1>
        <p className="mt-6 max-w-[540px] text-lg leading-relaxed text-gray-600 sm:mt-7 sm:text-xl lg:[@media(max-height:820px)]:mt-5 lg:[@media(max-height:820px)]:text-lg">
          Time ordena tu agenda, evita los turnos superpuestos y le da a tu negocio un enlace propio para que sus
          clientes reserven las 24 horas, sin llamadas ni chats.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 sm:mt-[38px] sm:gap-4 lg:[@media(max-height:820px)]:mt-7">
          <a
            href="#empezar"
            className="btn shiny rounded-[14px] bg-time-primary px-[30px] py-[17px] text-base font-bold text-time-accent no-underline shadow-[0_14px_28px_-14px_rgba(252,111,32,0.8)]"
          >
            Quiero probar Time
          </a>
          <a
            href="#demo"
            className="btn inline-flex items-center gap-2.5 rounded-[14px] border-[1.5px] border-time-accent bg-white px-7 py-[15.5px] text-base font-semibold text-time-accent no-underline"
          >
            <Play size={18} fill="currentColor" aria-hidden="true" />
            Ver la demo
          </a>
        </div>
        <p className="mt-7 flex items-center gap-2.5 text-[15px] text-[#5B6472] sm:mt-[34px] lg:[@media(max-height:820px)]:mt-5 lg:[@media(max-height:740px)]:hidden">
          <MousePointer2 size={20} className="text-time-orange-dark" aria-hidden="true" />
          Probá la reserva de al lado: elegí un día y un horario.
        </p>
      </div>

      {/* Tarjeta de reserva interactiva */}
      <div className="relative flex min-w-0 flex-[1_1_360px] justify-center pt-10 pb-16 lg:[@media(max-height:820px)]:pt-6 lg:[@media(max-height:820px)]:pb-12 lg:[@media(max-height:820px)]:[zoom:.88]">
        <div className="blob absolute top-[2%] right-[-2%] bottom-[4%] left-[10%] bg-time-secondary" />
        <div
          aria-hidden="true"
          className="spin absolute -top-2.5 right-3 size-[110px] rounded-full border-2 border-dashed border-time-primary opacity-45"
        />

        <div
          id="pipo-hero"
          className="float relative box-border w-full max-w-[396px] rounded-[28px] border border-time-border bg-white p-[26px] shadow-[0_40px_70px_-28px_rgba(50,50,50,0.35)]"
        >
          {!booked ? (
            <>
              <div className="flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-[14px] bg-time-secondary">
                  <Store size={22} className="text-time-orange-dark" aria-hidden="true" />
                </span>
                <div>
                  <p className="m-0 font-manrope text-base font-bold">Peluquería Estilo</p>
                  <p className="mt-0.5 text-[13px] text-[#5B6472]">Corte de pelo · Laura Gómez</p>
                </div>
              </div>

              <p className="mt-[22px] mb-3 font-manrope text-[19px] font-bold">Elegí tu día</p>
              <div className="flex gap-[7px]">
                {DAYS.map((d) =>
                  d.full ? (
                    <button
                      key={d.id}
                      type="button"
                      disabled
                      aria-label={`${NAMES[d.id]} ${d.n}, día completo`}
                      className="flex-1 rounded-[14px] border border-dashed border-gray-300 bg-gray-100 py-[9px] text-xs leading-[1.35] text-gray-500 line-through"
                    >
                      {d.d}
                      <br />
                      <b className="text-[17px]">{d.n}</b>
                    </button>
                  ) : (
                    <button
                      key={d.id}
                      type="button"
                      aria-pressed={d.id === day}
                      onClick={() => pickDay(d.id)}
                      className={`chip flex-1 cursor-pointer rounded-[14px] py-[9px] text-xs leading-[1.35] ${
                        d.id === day
                          ? 'border-0 bg-time-accent text-white'
                          : 'border border-time-border bg-white text-time-accent'
                      }`}
                    >
                      {d.d}
                      <br />
                      <b className="text-[17px]">{d.n}</b>
                    </button>
                  ),
                )}
              </div>

              <p className="mt-[18px] mb-2.5 font-manrope text-[19px] font-bold">Elegí tu horario</p>
              <div className="grid grid-cols-3 gap-2">
                {TIMES.map((t) => {
                  const isTaken = taken.includes(t)
                  if (isTaken) {
                    return (
                      <button
                        key={t}
                        type="button"
                        disabled
                        aria-label={`${t}, ocupado`}
                        className="rounded-xl border border-gray-100 bg-gray-100 py-[11px] text-sm text-gray-400 line-through"
                      >
                        {t}
                      </button>
                    )
                  }
                  const sel = t === time
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={sel}
                      onClick={() => setTime(t)}
                      className={`chip cursor-pointer rounded-xl py-[11px] text-sm ${
                        sel
                          ? 'border-[1.5px] border-time-primary bg-time-primary font-bold text-time-accent'
                          : 'border border-time-border bg-white font-medium text-time-accent'
                      }`}
                    >
                      {t}
                    </button>
                  )
                })}
              </div>

              {time ? (
                <button
                  type="button"
                  onClick={() => setBooked(true)}
                  className="btn shiny pop mt-[18px] w-full cursor-pointer rounded-[14px] border-0 bg-time-primary py-[15px] text-[15px] font-bold text-time-accent"
                >
                  Confirmar {dayLabel} a las {time}
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-[18px] w-full rounded-[14px] border-0 bg-time-border py-[15px] text-[15px] font-semibold text-gray-600"
                >
                  Elegí un horario para continuar
                </button>
              )}
            </>
          ) : (
            <div className="pop px-1.5 pt-[30px] pb-2 text-center">
              <span className="inline-flex size-[84px] items-center justify-center rounded-full bg-time-accent">
                <svg className="check" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#FC6F20" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <p className="mt-[22px] mb-1.5 font-manrope text-[26px] font-extrabold">¡Turno reservado!</p>
              <p className="m-0 text-base leading-relaxed text-gray-600">
                {dayLabel} a las {time} con Laura Gómez.
                <br />
                Te llega la confirmación por email.
              </p>
              <div className="mt-[22px] rounded-2xl bg-time-secondary p-3.5 text-sm leading-normal">
                Así de fácil lo hacen tus clientes, desde el celular y a cualquier hora.
              </div>
              <button
                type="button"
                onClick={reset}
                className="btn mt-[18px] w-full cursor-pointer rounded-[14px] border-[1.5px] border-time-accent bg-white py-[13px] text-[15px] font-semibold text-time-accent"
              >
                Probar de nuevo
              </button>
            </div>
          )}
        </div>

        {/* Notificación flotante que va rotando */}
        <div
          key={notif}
          className="slide absolute bottom-2 -left-1.5 flex items-center gap-3 rounded-[18px] border border-time-border bg-white px-4 py-3 shadow-[0_20px_40px_-16px_rgba(50,50,50,0.35)]"
        >
          <span className={`inline-flex size-9 items-center justify-center rounded-full ${N.circle}`}>
            <N.Icon size={18} strokeWidth={2.4} aria-hidden="true" />
          </span>
          <div>
            <p className="m-0 text-sm font-semibold">{N.title}</p>
            <p className="mt-px text-[13px] text-[#5B6472]">{N.text}</p>
          </div>
        </div>
      </div>
      </div>
      <ScrollCue to="comparar" label="Deslizá para descubrir más" className="pb-4" />
    </section>
  )
}
