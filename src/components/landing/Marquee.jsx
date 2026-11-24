const RUBROS = [
  'Peluquerías',
  'Barberías',
  'Consultorios',
  'Centros de estética',
  'Manicuría',
  'Kinesiología',
  'Tatuajes',
]

function Fila({ hidden = false }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex items-center gap-7 whitespace-nowrap pr-7 font-manrope text-[15px] font-semibold tracking-[.02em] text-gray-600"
    >
      {RUBROS.map((r) => (
        <span key={r} className="flex items-center gap-7">
          <span>{r}</span>
          <span aria-hidden="true" className="inline-block size-[5px] rounded-full bg-time-primary" />
        </span>
      ))}
    </div>
  )
}

// Cinta de rubros que se desplaza sola (se frena al pasar el mouse)
export default function Marquee() {
  return (
    <section aria-label="Rubros" className="overflow-hidden border-y border-time-border bg-white py-[13px]">
      <div className="marquee">
        <Fila />
        <Fila hidden />
      </div>
    </section>
  )
}
