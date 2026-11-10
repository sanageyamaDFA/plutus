import { useState } from 'react'
import { AusgabeEintrag } from '../components/AusgabeEintrag'
import { Filterauswahl } from '../components/Filterauswahl'
import { gruppiereNachDatum } from '../utils/ausgaben'
import { formatiereTagesueberschrift, heuteAlsIsoDatum } from '../utils/datum'
import { findeNachId } from '../utils/listen'
import './Ausgabenliste.css'

const ALLE = 'alle'

export function Ausgabenliste({ ausgaben, kategorien, mitglieder, onAusgabeAuswahl }) {
    const [kategorieFilter, setKategorieFilter] = useState(ALLE)

    const gefilterteAusgaben =
        kategorieFilter === ALLE
            ? ausgaben
            : ausgaben.filter((ausgabe) => ausgabe.kategorieId === kategorieFilter)
    const tage = gruppiereNachDatum(gefilterteAusgaben)
    const heute = heuteAlsIsoDatum()

    const filteroptionen = [
        { id: ALLE, label: 'Alle' },
        ...kategorien.map((kategorie) => ({ id: kategorie.id, label: kategorie.name })),
    ]

    function zeigeAusgabe(ausgabe) {
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
                    onClick={() => onAusgabeAuswahl(ausgabe.id)}
                />
            </li>
        )
    }

    return (
        <>
            <h1 className="seitentitel">Ausgaben</h1>
            <Filterauswahl
                optionen={filteroptionen}
                aktiveId={kategorieFilter}
                beschriftung="Nach Kategorie filtern"
                onAuswahl={setKategorieFilter}
            />

            {tage.length === 0 && (
                <p className="ausgabenliste__leer">Hier gibt es noch keine Ausgaben.</p>
            )}

            {tage.map((tag) => (
                <section key={tag.datum} className="ausgabenliste__tag">
                    <h2 className="ausgabenliste__datum">
                        {formatiereTagesueberschrift(tag.datum, heute)}
                    </h2>
                    <ul className="kartenliste">{tag.ausgaben.map(zeigeAusgabe)}</ul>
                </section>
            ))}
        </>
    )
}