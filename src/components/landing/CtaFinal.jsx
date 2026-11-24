import ScrollCue from './ScrollCue.jsx'

export default function CtaFinal({ registroUrl }) {
  return (
    <section id="empezar" className="screen mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-20">
      <div id="pipo-cta" className="screen-body reveal relative overflow-hidden rounded-[32px] bg-time-primary px-6 py-14 text-center sm:px-14 sm:py-20 lg:rounded-[44px]">
        <div aria-hidden="true" className="blob absolute -top-[140px] -left-[120px] size-[340px] bg-[rgba(254,232,208,0.45)]" />
        <div
          aria-hidden="true"
          className="blob absolute -right-[100px] -bottom-[130px] size-[300px] bg-[rgba(50,50,50,0.12)]"
          style={{ animationDelay: '-6s' }}
        />
        <h2 className="relative mx-auto max-w-[740px] font-manrope text-[32px] leading-[1.08] sm:text-4xl font-extrabold tracking-[-0.02em] md:text-[50px]">
          Ordená tu agenda y dejá que tus clientes reserven solos.
        </h2>
        <p className="relative mx-auto mt-5 max-w-[560px] text-[17px] leading-relaxed sm:text-[19px]">
          Creá tu negocio en Time y compartí tu enlace hoy.
        </p>
        <div className="relative mt-9 flex flex-wrap justify-center gap-4">
          <a href={registroUrl} className="btn shiny rounded-[14px] bg-time-accent px-7 py-4 text-base font-bold text-white no-underline sm:px-[34px] sm:py-[18px] sm:text-[17px]">
            Quiero probar Time
          </a>
          <a href="#" className="btn rounded-[14px] border-[1.5px] border-time-accent px-7 py-[14.5px] text-base font-semibold text-time-accent no-underline sm:px-8 sm:py-[16.5px] sm:text-[17px]">
            Hablar con el equipo
          </a>
        </div>
      </div>
      <ScrollCue to="inicio" label="Volver al inicio" up />
    </section>
  )
}
