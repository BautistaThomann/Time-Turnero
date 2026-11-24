import ScrollCue from './ScrollCue.jsx'

const card = 'lift rounded-3xl border border-time-border bg-white p-5 sm:p-[26px]'
const h3 = 'mb-1.5 font-manrope text-[21px] font-extrabold'
const txt = 'm-0 text-base leading-relaxed text-gray-600'

const CHAT = [
  { me: false, text: 'Hola, ¿tenés lugar mañana?', hora: '23:48' },
  { me: false, text: '¿Y a las 5 no podés?', hora: '07:12' },
  { me: true, text: 'Perdón, a las 5 ya tengo a otra persona…' },
  { me: false, text: 'Me olvidé del turno de hoy, ¿lo pasamos?', hora: '10:05', shake: true },
]

const AGENDA = [
  { hora: '09:00', quien: 'Ana · Corte', estado: 'Confirmado' },
  { hora: '10:30', quien: 'Carla · Coloración', estado: 'Confirmado' },
  { hora: '13:00', quien: 'Diego · Barba', estado: 'Recordado' },
  { hora: '17:00', quien: 'Martina · Corte', estado: 'Confirmado' },
]

export default function Comparador({ before, setBefore }) {
  const opcion = (activo, label, onClick, colorActivo) =>
    activo ? (
      <button
        type="button"
        aria-pressed="true"
        className={`cursor-pointer rounded-full border-0 px-5 py-3 text-[15px] font-bold sm:px-[26px] ${colorActivo}`}
      >
        {label}
      </button>
    ) : (
      <button
        type="button"
        aria-pressed="false"
        onClick={onClick}
        className="chip cursor-pointer rounded-full border border-transparent bg-transparent px-5 py-3 text-[15px] font-semibold text-time-accent sm:px-[26px]"
      >
        {label}
      </button>
    )

  return (
    <section id="comparar" className="screen mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-20">
      <div className="screen-body">
      <div className="reveal mx-auto max-w-[760px] text-center">
        <p className="mb-3.5 text-sm font-semibold tracking-[0.12em] text-time-orange-dark uppercase">¿Te suena familiar?</p>
        <h2 className="m-0 font-manrope text-4xl leading-[1.1] font-extrabold tracking-[-0.02em] md:text-[46px]">
          Mirá la diferencia de un día con y sin Time.
        </h2>
      </div>

      <div className="mt-8 flex justify-center sm:mt-9">
        <div role="group" aria-label="Comparar" className="inline-flex gap-1 rounded-full border border-time-border bg-white p-1.5">
          {opcion(before, 'Sin Time', () => setBefore(true), 'bg-time-accent text-white')}
          {opcion(!before, 'Con Time', () => setBefore(false), 'bg-time-primary text-time-accent')}
        </div>
      </div>

      {before ? (
        <div key="antes" className="pop mt-10 flex flex-wrap items-stretch gap-6">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3 rounded-[28px] bg-time-accent p-6 sm:rounded-[32px] sm:p-8">
            <p className="mb-1.5 text-sm text-gray-300">Tu celular, un martes cualquiera</p>
            {CHAT.map((m, i) => (
              <div
                key={i}
                style={{ animationDelay: `${0.1 + i * 0.3}s` }}
                className={`pop max-w-[80%] px-4 py-3 text-[15px] ${m.shake ? 'shake' : ''} ${
                  m.me
                    ? 'self-end rounded-[18px_18px_4px_18px] bg-time-secondary'
                    : 'self-start rounded-[18px_18px_18px_4px] bg-white'
                }`}
              >
                {m.text} {m.hora && <span className="text-xs text-[#5B6472]">{m.hora}</span>}
              </div>
            ))}
            <p className="pop mt-2 text-sm font-semibold text-time-primary" style={{ animationDelay: '1.3s' }}>
              +14 mensajes sin leer
            </p>
          </div>
          <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-4">
            <div id="pipo-compare" className={card}>
              <h3 className={h3}>Mensajes a toda hora</h3>
              <p className={txt}>Coordinar por chat mientras atendés, de noche y los fines de semana.</p>
            </div>
            <div className={card}>
              <h3 className={h3}>Turnos superpuestos</h3>
              <p className={txt}>Dos personas a la misma hora y un cliente que se va molesto.</p>
            </div>
            <div className={card}>
              <h3 className={h3}>Huecos en la agenda</h3>
              <p className={txt}>Sin recordatorios, los clientes se olvidan y el horario queda vacío.</p>
            </div>
          </div>
        </div>
      ) : (
        <div key="despues" className="pop mt-10 flex flex-wrap items-stretch gap-6">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3 rounded-[28px] bg-time-secondary p-6 sm:rounded-[32px] sm:p-8">
            <p className="mb-1.5 text-sm text-gray-600">Tu agenda, el mismo martes</p>
            {AGENDA.map((a, i) => (
              <div
                key={a.hora}
                style={{ animationDelay: `${0.1 + i * 0.2}s` }}
                className="slide flex items-center gap-3.5 rounded-[18px] bg-white px-[18px] py-3.5"
              >
                <b className="w-[52px] font-manrope">{a.hora}</b>
                <span className="flex-1 text-[15px]">{a.quien}</span>
                {a.estado === 'Recordado' ? (
                  <span className="rounded-full border border-time-primary bg-time-secondary px-[11px] py-[3px] text-[13px] font-semibold">
                    Recordado
                  </span>
                ) : (
                  <span className="rounded-full bg-time-accent px-3 py-1 text-[13px] font-semibold text-white">Confirmado</span>
                )}
              </div>
            ))}
            <p className="pop mt-2 text-sm font-semibold" style={{ animationDelay: '.9s' }}>
              0 mensajes para coordinar
            </p>
          </div>
          <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-4">
            <div id="pipo-compare" className={card}>
              <h3 className={h3}>Reservan solos, 24/7</h3>
              <p className={txt}>Tus clientes eligen servicio, profesional y horario desde tu enlace.</p>
            </div>
            <div className={card}>
              <h3 className={h3}>Solo horarios libres</h3>
              <p className={txt}>El sistema no ofrece un horario ocupado: se terminan las superposiciones.</p>
            </div>
            <div className={card}>
              <h3 className={h3}>Recordatorios por email</h3>
              <p className={txt}>Confirmación, recordatorio y aviso de cancelación, automáticos.</p>
            </div>
          </div>
        </div>
      )}

      </div>
      <ScrollCue to="demo" label="Mirá la demo" />
    </section>
  )
}
