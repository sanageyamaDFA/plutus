import { findeNachId } from '../../utils/listen'
import { AusgabeEintrag } from './AusgabeEintrag'

export function AusgabenKarte({ ausgaben, kategorien, mitglieder, onAuswahl }) {
    return (
        <ul className="kartenliste">
            {ausgaben.map((ausgabe) => {
                const kategorie = findeNachId(kategorien, ausgabe.kategorieId)
                const person = findeNachId(mitglieder, ausgabe.bezahltVon)

                return (
                    <li key={ausgabe.id}>
                        <AusgabeEintrag
                            beschreibung={ausgabe.beschreibung}
                            betrag={ausgabe.betrag}
                            kategorieName={kategorie.name}
                            symbol={kategorie.symbol}
                            farbe={kategorie.farbe}
                            personName={person.name}
                            onClick={() => onAuswahl(ausgabe.id)}
                        />
                    </li>
                )
            })}
        </ul>
    )
}