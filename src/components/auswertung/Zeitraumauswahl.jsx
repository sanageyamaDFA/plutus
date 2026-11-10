import './Zeitraumauswahl.css'

const ZEITRAEUME = ['Woche', 'Monat', 'Jahr']

export function Zeitraumauswahl({ aktiverZeitraum }) {

    return (
        <div className="zeitraumauswahl">
            {ZEITRAEUME.map((zeitraum) => {
                const istAktiv = (zeitraum === aktiverZeitraum)
                const className = istAktiv ? 'zeitraumauswahl__option zeitraumauswahl__option--aktiv' : 'zeitraumauswahl__option'
                return (
                    <button key={zeitraum} className={className} aria-pressed={istAktiv}>{zeitraum}</button>
                )
            })}
        </div>
    )
}