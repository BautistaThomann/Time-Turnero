import logo from '../../assets/logo/logo-principal-turnero.png'

export default function Footer() {
  return (
    <footer className="border-t border-time-border bg-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-5 py-6 sm:p-8">
        <img src={logo} alt="Time Turnero Digital" className="h-[54px] w-[126px] object-contain" />
        <p className="m-0 text-sm text-[#5B6472]">
          Time – Turnero Digital · Proyecto de la Tecnicatura Universitaria en Programación · 2026
        </p>
      </div>
    </footer>
  )
}
