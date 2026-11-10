import { Aktionsleiste } from '../components/Aktionsleiste'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { KategorieSymbol } from '../components/KategorieSymbol'
import { ZurueckButton } from '../components/ZurueckButton'
import { formatiereDatum } from '../utils/datum'
import { formatiereEuro } from '../utils/format'
import { findeNachId } from '../utils/listen'
import './Ausgabedetail.css'

function Detailzeile({ bezeichnung, children }) {
    return (
        <div className="ausgabedetail__zeile">
            <dt className="ausgabedetail__bezeichnung">{bezeichnung}</dt>
            <dd className="ausgabedetail__wert">{children}</dd>
        </div>
    )
}

export function Ausgabedetail({ ausgabe, kategorien, mitglieder, onZurueck, onBearbeiten, onLoeschen }) {
    const kategorie = findeNachId(kategorien, ausgabe.kategorieId)
    const person = findeNachId(mitglieder, ausgabe.bezahltVon)

    return (
        <>
            <ZurueckButton onClick={onZurueck} />

            <header className="ausgabedetail__kopf">
                <p className="ausgabedetail__betrag">{formatiereEuro(ausgabe.betrag)}</p>
                <h1 className="ausgabedetail__beschreibung">{ausgabe.beschreibung}</h1>
            </header>

            <dl className="ausgabedetail__karte">
                <Detailzeile bezeichnung="Kategorie">
                    <KategorieSymbol symbol={kategorie.symbol} farbe={kategorie.farbe} />
                    {kategorie.name}
                </Detailzeile>
                <Detailzeile bezeichnung="Datum">{formatiereDatum(ausgabe.datum)}</Detailzeile>
                <Detailzeile bezeichnung="Bezahlt von">
                    <Avatar initial={person.initial} name={person.name} farbe={person.farbe} />
                    {person.name}
                </Detailzeile>
                {ausgabe.notiz && <Detailzeile bezeichnung="Notiz">{ausgabe.notiz}</Detailzeile>}
            </dl>

            <Aktionsleiste>
                <Button onClick={onBearbeiten}>Bearbeiten</Button>
                <Button variante="destruktiv-dezent" onClick={onLoeschen}>
                    Löschen
                </Button>
            </Aktionsleiste>
        </>
    )
}