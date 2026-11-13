import { useState } from 'react'
import { AusgabenKarte } from '../components/ausgaben/AusgabenKarte'
import { Filterauswahl } from '../components/ui/Filterauswahl'
import { gruppiereNachDatum } from '../utils/ausgaben'
import { formatiereTagesueberschrift, heuteAlsIsoDatum } from '../utils/datum'
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

    return (
        <div className="ausgabenliste">
            <h1 className="seitentitel">Ausgaben</h1>
            <Filterauswahl
                optionen={filteroptionen}
                aktiveId={kategorieFilter}
                beschriftung="Nach Kategorie filtern"
                onAuswahl={setKategorieFilter}
            />

            {tage.length === 0 && (
                <p className="leerhinweis">Hier gibt es noch keine Ausgaben.</p>
            )}

            {tage.map((tag) => (
                <section key={tag.datum} className="ausgabenliste__tag">
                    <h2 className="ausgabenliste__datum">
                        {formatiereTagesueberschrift(tag.datum, heute)}
                    </h2>
                    <AusgabenKarte
                        ausgaben={tag.ausgaben}
                        kategorien={kategorien}
                        mitglieder={mitglieder}
                        onAuswahl={onAusgabeAuswahl}
                    />
                </section>
            ))}
        </div>
    )
}