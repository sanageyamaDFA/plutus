import { Ringdiagramm } from '../components/auswertung/Ringdiagramm'
import { KategorieEintrag } from '../components/kategorien/KategorieEintrag'
import { Monatsauswahl } from '../components/auswertung/Monatsauswahl'
import { Zeitraumauswahl } from '../components/auswertung/Zeitraumauswahl'
import { ermittleNeuesteAusgaben } from '../utils/ausgaben'
import { AusgabenKarte } from '../components/ausgaben/AusgabenKarte'
import {
    berechneAnteil,
    berechneGesamtbetrag,
    berechneKategorieSummen,
    filtereNachMonat
} from '../utils/berechnungen'
import './Startseite.css'

const ANZAHL_LETZTE_AUSGABEN = 5

export function Startseite({ ausgaben, kategorien, mitglieder, jahr, monat, onAusgabeAuswahl }) {

    const ausgabenImMonat = filtereNachMonat(ausgaben, jahr, monat)
    const kategorieSummen = berechneKategorieSummen(ausgabenImMonat, kategorien)
        .filter((kategorie) => kategorie.betrag > 0)
        .toSorted((a, b) => b.betrag - a.betrag)
    const gesamtbetrag = berechneGesamtbetrag(kategorieSummen)
    const letzteAusgaben = ermittleNeuesteAusgaben(ausgabenImMonat, ANZAHL_LETZTE_AUSGABEN)

    return (
        <div className="startseite">
            <h1 className="visuell-versteckt">Übersicht</h1>
            <div className="startseite__auswertung">
                <Zeitraumauswahl aktiverZeitraum="Monat" />
                <Monatsauswahl monat="Oktober 2026" />
                <Ringdiagramm eintraege={kategorieSummen} beschriftung="Ausgaben im Oktober" />
            </div>
            <section className="kategorien startseite__kategorien">
                <h2 className="abschnittstitel">Kategorien</h2>
                <ul className="kartenliste startseite__kategorienliste">
                    {kategorieSummen.map((kategorie) => (
                        <li key={kategorie.id}>
                            <KategorieEintrag
                                name={kategorie.name}
                                symbol={kategorie.symbol}
                                farbe={kategorie.farbe}
                                betrag={kategorie.betrag}
                                anteil={berechneAnteil(kategorie.betrag, gesamtbetrag)}
                            />
                        </li>
                    ))}
                </ul>
            </section>

            <section className="startseite__letzte">
                <h2 className="abschnittstitel">Letzte Ausgaben</h2>
                <AusgabenKarte
                    ausgaben={letzteAusgaben}
                    kategorien={kategorien}
                    mitglieder={mitglieder}
                    onAuswahl={onAusgabeAuswahl}
                />
            </section>

        </div >
    )

}
