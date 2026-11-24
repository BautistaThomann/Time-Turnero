import { ChevronDown } from 'lucide-react'

// Indicador sutil "deslizá" que lleva a la sección siguiente
export default function ScrollCue({ to, label, dark = false, up = false, className = '' }) {
  return (
    <div className={`cue-wrap relative flex justify-center ${className}`}>
      <a href={`#${to}`} className={`cue ${dark ? 'cue-dark' : ''}`}>
        <span className="mouse">
          <span className="dot" />
        </span>
        {label}
        <ChevronDown className={`cchev ${up ? 'rotate-180' : ''}`} size={18} strokeWidth={2.4} aria-hidden="true" />
      </a>
    </div>
  )
}
