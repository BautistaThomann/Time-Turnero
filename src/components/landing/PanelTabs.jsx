import logo from '../../assets/logo/logo-principal-turnero.png'
import ScrollCue from './ScrollCue.jsx'

const TABS = [
  { id: 'hoy', label: 'Turnos de hoy', short: 'Hoy' },
  { id: 'equipo', label: 'Profesionales', short: 'Equipo' },
  { id: 'stats', label: 'Estadísticas', short: 'Estadísticas' },
]

const TURNOS = [
  { hora: '09:00', nombre: 'Ana Torres', servicio: 'Corte de pelo', confirmado: true },
  { hora: '10:30', nombre: 'Carla Ruiz', servicio: 'Coloración', confirmado: false },
  { hora: '13:00', nombre: 'Diego Sosa', servicio: 'Barba', confirmado: true },
]

const EQUIPO = [
  { ini: 'LG', nombre: 'Laura Gómez', servicios: 'Corte, Coloración', pct: 82, c: 'bg-time-primary text-time-accent' },
  { ini: 'MR', nombre: 'Martín Ríos', servicios: 'Barba, Corte', pct: 64, c: 'bg-time-accent text-white' },
  { ini: 'SP', nombre: 'Sofía Paz', servicios: 'Manicuría', pct: 47, c: 'bg-time-secondary text-time-accent' },
]

const SEMANA = [
  { dia: 'Lun', n: 9 },
  { dia: 'Mar', n: 12 },
  { dia: 'Mié', n: 10 },
  { dia: 'Jue', n: 15 },
  { dia: 'Vie', n: 18 },
  { dia: 'Sáb', n: 14 },
]
const MAX = 20

const stat = 'lift rounded-2xl border border-time-border bg-white p-4'

function Hoy() {
  return (
    <div className="pop">
      <p className="m-0 font-manrope text-2xl font-extrabold">Hola, Peluquería Estilo</p>
      <p className="mt-1 mb-[22px] text-sm text-[#5B6472]">Resumen de hoy</p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
        {[['Turnos de hoy', 8], ['Confirmados', 6], ['Pendientes', 2]].map(([l, v]) => (
          <div key={l} className={stat}>
            <p className="m-0 text-[13px] text-[#5B6472]">{l}</p>
            <p className="mt-1.5 font-manrope text-[30px] font-extrabold">{v}</p>
          </div>
        ))}
      </div>
      <p className="mt-[26px] mb-3 font-manrope text-[17px] font-bold">Próximos turnos</p>
      <div className="flex flex-col gap-2.5">
        {TURNOS.map((t, i) => (
          <div
            key={t.hora}
            style={{ animationDelay: `${0.1 + i * 0.15}s` }}
            className="slide flex flex-wrap items-center gap-3.5 rounded-2xl border border-time-border bg-white px-[18px] py-3.5"
          >
            <b className="w-14 font-manrope">{t.hora}</b>
            <span className="flex-[1_1_140px] text-[15px] font-semibold">
              {t.nombre}
              <br />
              <span className="text-[13px] font-normal text-[#5B6472]">{t.servicio}</span>
            </span>
            {t.confirmado ? (
              <span className="rounded-full bg-time-accent px-3 py-[5px] text-[13px] text-white">Confirmado</span>
            ) : (
              <span className="rounded-full bg-time-secondary px-3 py-[5px] text-[13px]">Pendiente</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function Equipo() {
  return (
    <div className="pop">
      <p className="m-0 font-manrope text-2xl font-extrabold">Tu equipo</p>
      <p className="mt-1 mb-[22px] text-sm text-[#5B6472]">Agenda ocupada esta semana</p>
      <div className="flex flex-col gap-3.5">
        {EQUIPO.map((p, i) => (
          <div key={p.ini} className="lift flex flex-wrap items-center gap-4 rounded-[18px] border border-time-border bg-white p-[18px]">
            <span className={`inline-flex size-[46px] items-center justify-center rounded-full font-extrabold ${p.c}`}>{p.ini}</span>
            <div className="flex-[1_1_220px]">
              <b>{p.nombre}</b>
              <span className="text-[13px] text-[#5B6472]"> · {p.servicios}</span>
              <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-gray-100">
                <div className="barx h-full rounded-full bg-time-primary" style={{ width: `${p.pct}%`, animationDelay: `${i * 0.15}s` }} />
              </div>
            </div>
            <b className="font-manrope text-xl">{p.pct}%</b>
          </div>
        ))}
      </div>
    </div>
  )
}

function Stats() {
  const top = Math.max(...SEMANA.map((d) => d.n))
  return (
    <div className="pop">
      <p className="m-0 font-manrope text-2xl font-extrabold">Estadísticas</p>
      <p className="mt-1 mb-[22px] text-sm text-[#5B6472]">Turnos por día · última semana</p>
      <div className="flex h-[200px] items-end gap-2 border-b border-time-border px-1 sm:h-[220px] sm:gap-3.5">
        {SEMANA.map((d, i) => (
          <div key={d.dia} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <b className="text-[13px]">{d.n}</b>
            <div
              className={`bar w-full max-w-[54px] rounded-t-[10px] ${d.n === top ? 'bg-time-accent' : 'bg-time-primary'}`}
              style={{ height: `${(d.n / MAX) * 100}%`, animationDelay: `${i * 0.08}s` }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2 px-1 pt-2 text-center text-[13px] text-[#5B6472] sm:gap-3.5">
        {SEMANA.map((d) => (
          <span key={d.dia} className="flex-1">{d.dia}</span>
        ))}
      </div>
      <div className="mt-[22px] grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
        {[['Asistencia', '92%'], ['Cancelados', 4], ['Completados', 74]].map(([l, v]) => (
          <div key={l} className="rounded-2xl border border-time-border bg-white p-3.5">
            <p className="m-0 text-[13px] text-[#5B6472]">{l}</p>
            <p className="mt-1 font-manrope text-2xl font-extrabold">{v}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PanelTabs({ tab, setTab }) {
  return (
    <section id="panel" className="screen bg-time-secondary py-16 lg:py-20">
      <div className="screen-body mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="reveal mx-auto max-w-[720px] text-center">
          <p className="mb-3.5 text-sm font-semibold tracking-[0.12em] text-time-orange-dark uppercase">El panel del dueño</p>
          <h2 className="m-0 font-manrope text-4xl leading-[1.1] font-extrabold tracking-[-0.02em] md:text-[46px]">
            Todo tu negocio en un solo lugar.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-600">Explorá las pestañas.</p>
        </div>

        <div
          id="pipo-panel"
          className="reveal mt-10 overflow-hidden rounded-[24px] sm:mt-12 sm:rounded-[28px] border border-time-border bg-white shadow-[0_40px_80px_-30px_rgba(50,50,50,0.35)]"
        >
          <div className="flex h-11 items-center gap-2 bg-[#EFE6DC] px-5">
            <span className="size-3 rounded-full bg-[#F28B6B]" />
            <span className="size-3 rounded-full bg-[#F2C46B]" />
            <span className="size-3 rounded-full bg-[#8BCB8B]" />
          </div>
          <div className="flex flex-wrap">
            <div className="flex w-full gap-1.5 border-b border-time-border px-2 py-2.5 md:w-auto md:max-w-[240px] md:flex-[1_1_210px] md:flex-col md:border-r md:border-b-0 md:px-4 md:py-[22px]">
              <img src={logo} alt="" className="mb-4 ml-2 hidden h-[34px] w-20 object-contain md:block" />
              {TABS.map((t) =>
                t.id === tab ? (
                  <button key={t.id} type="button" aria-pressed="true" className="flex-1 cursor-pointer rounded-xl border-0 bg-time-secondary px-2 py-2.5 text-center text-sm font-bold md:flex-none md:px-3.5 md:py-3 md:text-left md:text-[15px] md:whitespace-nowrap">
                    <span className="md:hidden">{t.short}</span>
                    <span className="hidden md:inline">{t.label}</span>
                  </button>
                ) : (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed="false"
                    onClick={() => setTab(t.id)}
                    className="chip flex-1 cursor-pointer rounded-xl border border-transparent bg-transparent px-2 py-2.5 text-center text-sm text-gray-600 md:flex-none md:px-3.5 md:py-3 md:text-left md:text-[15px] md:whitespace-nowrap"
                  >
                    <span className="md:hidden">{t.short}</span>
                    <span className="hidden md:inline">{t.label}</span>
                  </button>
                ),
              )}
            </div>
            <div className="min-h-[420px] min-w-0 flex-[999_1_560px] bg-time-background p-5 sm:p-7">
              {tab === 'hoy' && <Hoy />}
              {tab === 'equipo' && <Equipo />}
              {tab === 'stats' && <Stats />}
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-[13px] text-gray-600">Vista ilustrativa con datos de ejemplo.</p>
        </div>
      <ScrollCue to="calculadora" label="Calculá tu tiempo" />
    </section>
  )
}
