import { useState } from 'react'
import '../styles/landing.css'
import Navbar from '../components/landing/Navbar.jsx'
import HeroReserva from '../components/landing/HeroReserva.jsx'
import Marquee from '../components/landing/Marquee.jsx'
import Comparador from '../components/landing/Comparador.jsx'
import DemoCelular from '../components/landing/DemoCelular.jsx'
import PanelTabs from '../components/landing/PanelTabs.jsx'
import Calculadora from '../components/landing/Calculadora.jsx'
import ComoEmpezar from '../components/landing/ComoEmpezar.jsx'
import Faq from '../components/landing/Faq.jsx'
import CtaFinal from '../components/landing/CtaFinal.jsx'
import Footer from '../components/landing/Footer.jsx'
import Pipo from '../components/landing/Pipo.jsx'

// Cambiá esto por la ruta real del registro (en turnero-front: "/registro")
const REGISTRO_URL = '#empezar'

export default function Landing() {
  // Estado compartido: lo usan las secciones y Pipo para saber qué decir
  const [booked, setBooked] = useState(false)
  const [before, setBefore] = useState(true)
  const [tab, setTab] = useState('hoy')
  const [turnos, setTurnos] = useState(60)
  const [minutos, setMinutos] = useState(5)
  const horas = Math.round((turnos * minutos * 4.3) / 60)

  return (
    <div className="w-full overflow-x-clip bg-time-background font-inter text-time-accent">
      <Navbar registroUrl={REGISTRO_URL} />
      <HeroReserva booked={booked} setBooked={setBooked} />
      <Marquee />
      <Comparador before={before} setBefore={setBefore} />
      <DemoCelular />
      <PanelTabs tab={tab} setTab={setTab} />
      <Calculadora
        turnos={turnos}
        minutos={minutos}
        setTurnos={setTurnos}
        setMinutos={setMinutos}
        horas={horas}
      />
      <ComoEmpezar />
      <Faq />
      <CtaFinal registroUrl={REGISTRO_URL} />
      <Footer />
      <Pipo booked={booked} before={before} tab={tab} horas={horas} />
    </div>
  )
}
