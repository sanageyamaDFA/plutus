import { Ringdiagramm } from '../components/auswertung/Ringdiagramm'
import { KategorieEintrag } from '../components/kategorien/KategorieEintrag'
import { Monatsauswahl } from '../components/auswertung/Monatsauswahl'
import { Zeitraumauswahl } from '../components/auswertung/Zeitraumauswahl'
import { AusgabenKarte } from '../components/ausgaben/AusgabenKarte'
import { formatiereMonatsname, formatiereMonatUndJahr } from '../utils/datum'
import { ermittleNeuesteAusgaben, filtereNachMonat } from '../utils/ausgaben'
import {
    berechneAnteil,
    berechneGesamtbetrag,
    berechneKategorieSummen,
} from '../utils/berechnungen'
import './Startseite.css'

const ANZAHL_LETZTE_AUSGABEN = 5

export function Startseite({ ausgaben, kategorien, mitglieder, jahr, monat, onMonatWechsel, onAusgabeAuswahl, onKategorieAuswahl }) {

    const ausgabenImMonat = filtereNachMonat(ausgaben, jahr, monat)
    const kategorieSummen = berechneKategorieSummen(ausgabenImMonat, kategorien)
        .filter((kategorie) => kategorie.betrag > 0)
        .toSorted((a, b) => b.betrag - a.betrag)
    const gesamtbetrag = berechneGesamtbetrag(kategorieSummen)
    const letzteAusgaben = ermittleNeuesteAusgaben(ausgabenImMonat, ANZAHL_LETZTE_AUSGABEN)
    const monatsname = formatiereMonatsname(jahr, monat)


    return (
        <div className="startseite">
            <h1 className="visuell-versteckt">Übersicht</h1>
            <div className="startseite__auswertung">
                <Zeitraumauswahl aktiverZeitraum="Monat" />
                <Monatsauswahl
                    beschriftung={formatiereMonatUndJahr(jahr, monat)}
                    onZurueck={() => onMonatWechsel(-1)}
                    onWeiter={() => onMonatWechsel(1)}
                />
                <Ringdiagramm eintraege={kategorieSummen} beschriftung={`Ausgaben im ${monatsname}`} />
            </div>
            <section className="kategorien startseite__kategorien">
                <h2 className="abschnittstitel">Kategorien</h2>
                {kategorieSummen.length === 0 ? (
                    <p className="leerhinweis">Im {monatsname} gibt es noch keine Ausgaben.</p>
                ) : (
                    <ul className="kartenliste startseite__kategorienliste">
                        {kategorieSummen.map((kategorie) => (
                            <li key={kategorie.id}>
                                <KategorieEintrag
                                    name={kategorie.name}
                                    symbol={kategorie.symbol}
                                    farbe={kategorie.farbe}
                                    betrag={kategorie.betrag}
                                    anteil={berechneAnteil(kategorie.betrag, gesamtbetrag)}
                                    onClick={() => onKategorieAuswahl(kategorie.id)}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {letzteAusgaben.length > 0 && (
                <section className="startseite__letzte">
                    <h2 className="abschnittstitel">Letzte Ausgaben</h2>
                    <AusgabenKarte
                        ausgaben={letzteAusgaben}
                        kategorien={kategorien}
                        mitglieder={mitglieder}
                        onAuswahl={onAusgabeAuswahl}
                    />
                </section>
            )}
        </div >
    )

}
