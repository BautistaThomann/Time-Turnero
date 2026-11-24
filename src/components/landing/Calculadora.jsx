import ScrollCue from './ScrollCue.jsx'

export default function Calculadora({ turnos, minutos, setTurnos, setMinutos, horas }) {
  const jornadas = (horas / 8).toFixed(1).replace('.', ',')

  return (
    <section id="calculadora" className="screen mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-20">
      <div className="screen-body reveal flex flex-wrap items-stretch gap-8 rounded-[28px] border border-time-border bg-white p-6 sm:p-10 lg:gap-10 lg:rounded-[36px] lg:p-12">
        <div className="min-w-0 flex-[1_1_380px]">
          <p className="mb-3.5 text-sm font-semibold tracking-[0.12em] text-time-orange-dark uppercase">Calculadora</p>
          <h2 className="m-0 font-manrope text-[30px] leading-[1.1] sm:text-[34px] font-extrabold tracking-[-0.02em] md:text-[40px]">
            ¿Cuánto tiempo se te va en coordinar turnos?
          </h2>
          <p className="mt-4 mb-[30px] text-[17px] leading-relaxed text-gray-600">Mové las barras según tu negocio.</p>

          <label htmlFor="calc-turnos" className="flex justify-between gap-4 text-base font-semibold">
            Turnos por semana <b className="font-manrope text-time-orange-dark">{turnos}</b>
          </label>
          <input
            id="calc-turnos"
            className="range"
            type="range"
            min="5"
            max="200"
            step="5"
            value={turnos}
            onChange={(e) => setTurnos(Number(e.target.value))}
          />

          <label htmlFor="calc-min" className="mt-[22px] flex justify-between gap-4 text-base font-semibold">
            Minutos que te lleva coordinar cada uno <b className="font-manrope whitespace-nowrap text-time-orange-dark">{minutos} min</b>
          </label>
          <input
            id="calc-min"
            className="range"
            type="range"
            min="1"
            max="20"
            step="1"
            value={minutos}
            onChange={(e) => setMinutos(Number(e.target.value))}
          />
        </div>

        <div
          id="pipo-calc"
          className="relative flex min-w-0 flex-[1_1_300px] flex-col justify-center overflow-hidden rounded-[24px] bg-time-accent p-7 text-white sm:rounded-[28px] sm:p-9"
        >
          <div aria-hidden="true" className="blob absolute -right-20 -bottom-[90px] size-[260px] bg-[rgba(252,111,32,0.25)]" />
          <p className="relative m-0 text-base text-gray-300">Tiempo que dedicás a coordinar</p>
          <p className="relative mt-2 font-manrope text-6xl leading-none sm:text-[76px] font-extrabold text-time-primary">{horas} h</p>
          <p className="relative mt-1.5 text-lg">por mes</p>
          <p className="relative mt-[22px] text-base leading-relaxed text-gray-300">
            Equivale a <b className="text-white">{jornadas} jornadas de 8 horas</b> que podés usar para atender. Con Time,
            tus clientes reservan solos.
          </p>
        </div>
      </div>
      <ScrollCue to="como" label="Cómo empezar" />
    </section>
  )
}
