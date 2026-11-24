import { ZEITRAUMARTEN } from '../../utils/zeitraum'
import './Zeitraumauswahl.css'

const OPTIONEN = [
    { art: ZEITRAUMARTEN.WOCHE, label: 'Woche' },
    { art: ZEITRAUMARTEN.MONAT, label: 'Monat' },
    { art: ZEITRAUMARTEN.JAHR, label: 'Jahr' },
]

export function Zeitraumauswahl({ aktiveArt, onAuswahl }) {

    return (
        <div className="zeitraumauswahl">
            {OPTIONEN.map((option) => {
                const istAktiv = (option.art === aktiveArt)
                const className = istAktiv ? 'zeitraumauswahl__option zeitraumauswahl__option--aktiv' : 'zeitraumauswahl__option'
                return (
                    <button
                        key={option.art}
                        className={className}
                        aria-pressed={istAktiv}
                        onClick={() => onAuswahl(option.art)}
                    >
                        {option.label}
                    </button>
                )
            })}
        </div>
    )
}