import { ChartNoAxesColumn, House, Plus, Receipt, Users } from 'lucide-react'
import { SEITEN } from '../../navigation/seiten'
import './Navigationsleiste.css'

const EINTRAEGE_LINKS = [
  { seite: SEITEN.UEBERSICHT, label: 'Übersicht', symbol: House },
  { seite: SEITEN.AUSGABEN, label: 'Ausgaben', symbol: Receipt },
]

const EINTRAEGE_RECHTS = [
  { seite: SEITEN.STATISTIK, label: 'Statistik', symbol: ChartNoAxesColumn },
  { seite: SEITEN.HAUSHALT, label: 'Haushalt', symbol: Users },
]



function NavigationsEintrag({ label, symbol: Symbol, istAktiv, onClick }) {
  const className = istAktiv ? 'navigationsleiste__eintrag navigationsleiste__eintrag--aktiv' : 'navigationsleiste__eintrag'
  const ariaCurrent = istAktiv ? 'page' : undefined

  return (
    <button className={className}
      aria-current={ariaCurrent}
      onClick={onClick}
    >
      <Symbol />
      <span>{label}</span>
    </button>
  )
}

export function Navigationsleiste({ aktiveSeite, onNavigation, onNeueAusgabe }) {
  const zeigeEintrag = (eintrag) => (
    <NavigationsEintrag
      key={eintrag.seite}
      label={eintrag.label}
      symbol={eintrag.symbol}
      istAktiv={eintrag.seite === aktiveSeite}
      onClick={() => onNavigation(eintrag.seite)}
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