import { AusgabenKarte } from '../components/ausgaben/AusgabenKarte'
import { KategorieSymbol } from '../components/kategorien/KategorieSymbol'
import { ZurueckButton } from '../components/ui/ZurueckButton'
import { filtereNachMonat, sortiereNeuesteZuerst } from '../utils/ausgaben'
import { berechneAnteil, berechneGesamtbetrag } from '../utils/berechnungen'
import { formatiereMonatsname } from '../utils/datum'
import { formatiereEuro } from '../utils/format'
import './Kategoriedetail.css'

export function Kategoriedetail({
    kategorie,
    ausgaben,
    kategorien,
    mitglieder,
    jahr,
    monat,
    onZurueck,
    onAusgabeAuswahl,
}) {
    const ausgabenImMonat = filtereNachMonat(ausgaben, jahr, monat)
    const ausgabenDerKategorie = sortiereNeuesteZuerst(
        ausgabenImMonat.filter((ausgabe) => ausgabe.kategorieId === kategorie.id),
    )
    const summe = berechneGesamtbetrag(ausgabenDerKategorie)
    const anteil = berechneAnteil(summe, berechneGesamtbetrag(ausgabenImMonat))
    const monatsname = formatiereMonatsname(jahr, monat)

    return (
        <>
            <ZurueckButton onClick={onZurueck} />

            <header className="kategoriedetail__kopf">
                <KategorieSymbol symbol={kategorie.symbol} farbe={kategorie.farbe} groesse="gross" />
                <h1 className="kategoriedetail__titel">{kategorie.name}</h1>
                <p className="kategoriedetail__zusammenfassung">
                    {formatiereEuro(summe)} im {monatsname} · {Math.round(anteil)} %
                </p>
            </header>

            <section>
                <h2 className="abschnittstitel">Ausgaben im {monatsname}</h2>
                {ausgabenDerKategorie.length === 0 ?
                    (
                        <p className="leerhinweis">
                            Im {monatsname} gibt es in dieser Kategorie keine Ausgaben.
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