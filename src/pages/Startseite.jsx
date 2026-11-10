import { Ringdiagramm } from '../components/auswertung/Ringdiagramm'
import { KategorieEintrag } from '../components/kategorien/KategorieEintrag'
import { Monatsauswahl } from '../components/auswertung/Monatsauswahl'
import { Zeitraumauswahl } from '../components/auswertung/Zeitraumauswahl'
import {
    berechneAnteil,
    berechneGesamtbetrag,
    berechneKategorieSummen,
    filtereNachMonat
} from '../utils/berechnungen'
import './Startseite.css'

export function Startseite({ ausgaben, kategorien, jahr, monat }) {

    const ausgabenImMonat = filtereNachMonat(ausgaben, jahr, monat)
    const kategorieSummen = berechneKategorieSummen(ausgabenImMonat, kategorien)
        .filter((kategorie) => kategorie.betrag > 0)
        .toSorted((a, b) => b.betrag - a.betrag)
    const gesamtbetrag = berechneGesamtbetrag(kategorieSummen)

    return (
        <>
            <h1 className="visuell-versteckt">Übersicht</h1>
            <Zeitraumauswahl aktiverZeitraum='Monat' />
            <Monatsauswahl monat="Oktober 2026" />
            <Ringdiagramm eintraege={kategorieSummen} beschriftung="Ausgaben im Oktober" />
            <section className="kategorien">
                <h2 className="kategorien__titel">Kategorien</h2>
                <ul className="kategorien__liste">
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
        </>
    )

}
