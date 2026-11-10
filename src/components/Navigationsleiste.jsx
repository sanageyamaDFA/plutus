import { ChartNoAxesColumn, House, Plus, Receipt, Users } from 'lucide-react'
import './Navigationsleiste.css'

const EINTRAEGE_LINKS = [
  { id: 'uebersicht', label: 'Übersicht', symbol: House },
  { id: 'ausgaben', label: 'Ausgaben', symbol: Receipt }
]

const EINTRAEGE_RECHTS = [
  { id: 'statistik', label: 'Statistik', symbol: ChartNoAxesColumn },
  { id: 'haushalt', label: 'Haushalt', symbol: Users }
]



function NavigationsEintrag({ label, symbol: Symbol, istAktiv }) {
  const className = istAktiv ? 'navigationsleiste__eintrag navigationsleiste__eintrag--aktiv' : 'navigationsleiste__eintrag'
  const ariaCurrent = istAktiv ? 'page' : undefined

  return (
    <button className={className} aria-current={ariaCurrent}>
      <Symbol />
      <span>{label}</span>
    </button>
  )
}

export function Navigationsleiste({ aktiverEintrag, onNeueAusgabe }) {
  const zeigeEintrag = (eintrag) => (
    <NavigationsEintrag
      key={eintrag.id}
      label={eintrag.label}
      symbol={eintrag.symbol}
      istAktiv={eintrag.id === aktiverEintrag}
    />
  )

  return (
    <nav className="navigationsleiste" aria-label="Hauptnavigation">
      {EINTRAEGE_LINKS.map(zeigeEintrag)}
      <button className="navigationsleiste__plus"
        aria-label="Neue Ausgabe hinzufügen"
        onClick={onNeueAusgabe}
      >
        <Plus />
      </button>
      {EINTRAEGE_RECHTS.map(zeigeEintrag)}
    </nav>
  )
}