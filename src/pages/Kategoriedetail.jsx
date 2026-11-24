import { AusgabenKarte } from '../components/ausgaben/AusgabenKarte'
import { KategorieSymbol } from '../components/kategorien/KategorieSymbol'
import { ZurueckButton } from '../components/ui/ZurueckButton'
import { filtereNachZeitraum, sortiereNeuesteZuerst } from '../utils/ausgaben'
import { berechneAnteil, berechneGesamtbetrag } from '../utils/berechnungen'
import { formatiereEuro } from '../utils/format'
import { beschreibeZeitraum } from '../utils/zeitraum'
import './Kategoriedetail.css'

export function Kategoriedetail({
    kategorie,
    ausgaben,
    kategorien,
    mitglieder,
    zeitraum,
    onZurueck,
    onAusgabeAuswahl,
}) {
    const ausgabenImZeitraum = filtereNachZeitraum(ausgaben, zeitraum)
    const ausgabenDerKategorie = sortiereNeuesteZuerst(
        ausgabenImZeitraum.filter((ausgabe) => ausgabe.kategorieId === kategorie.id),
    )
    const summe = berechneGesamtbetrag(ausgabenDerKategorie)
    const anteil = berechneAnteil(summe, berechneGesamtbetrag(ausgabenImZeitraum))
    const beschreibung = beschreibeZeitraum(zeitraum)

    return (
        <>
            <ZurueckButton onClick={onZurueck} />

            <header className="kategoriedetail__kopf">
                <KategorieSymbol symbol={kategorie.symbol} farbe={kategorie.farbe} groesse="gross" />
                <h1 className="kategoriedetail__titel">{kategorie.name}</h1>
                <p className="kategoriedetail__zusammenfassung">
                    {formatiereEuro(summe)} {beschreibung} · {Math.round(anteil)} %
                </p>
            </header>

            <section>
                <h2 className="abschnittstitel">Ausgaben {beschreibung}</h2>
                {ausgabenDerKategorie.length === 0 ?
                    (
                        <p className="leerhinweis">
                            Für diesen Zeitraum gibt es in dieser Kategorie keine Ausgaben.
                        </p>
                    ) :
                    (
                        <AusgabenKarte
                            ausgaben={ausgabenDerKategorie}
                            kategorien={kategorien}
                            mitglieder={mitglieder}
                            onAuswahl={onAusgabeAuswahl}
                        />
                    )}
            </section>
        </>
    )
}