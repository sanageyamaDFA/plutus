import './Filterauswahl.css'

export function Filterauswahl({ optionen, aktiveId, beschriftung, onAuswahl }) {
    return (
        <div className="filterauswahl" role="group" aria-label={beschriftung}>
            {optionen.map((option) => {
                const istAktiv = option.id === aktiveId
                const className = istAktiv
                    ? 'filterauswahl__option filterauswahl__option--aktiv'
                    : 'filterauswahl__option'

                return (
                    <button
                        key={option.id}
                        className={className}
                        aria-pressed={istAktiv}
                        onClick={() => onAuswahl(option.id)}
                    >
                        {option.label}
                    </button>
                )
            })}
        </div>
    )
}