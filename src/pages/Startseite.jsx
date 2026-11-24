import { Ringdiagramm } from '../components/auswertung/Ringdiagramm'
import { KategorieEintrag } from '../components/kategorien/KategorieEintrag'
import { AusgabenKarte } from '../components/ausgaben/AusgabenKarte'
import { ermittleNeuesteAusgaben, filtereNachZeitraum } from '../utils/ausgaben'
import { Zeitraumsteuerung } from '../components/auswertung/Zeitraumsteuerung'
import { beschreibeZeitraum } from '../utils/zeitraum'
import {
    berechneAnteil,
    berechneGesamtbetrag,
    berechneKategorieSummen,
} from '../utils/berechnungen'
import './Startseite.css'


const ANZAHL_LETZTE_AUSGABEN = 5

export function Startseite({ ausgaben, kategorien, mitglieder, zeitraum, onZeitraumAenderung, onAusgabeAuswahl, onKategorieAuswahl }) {

    const ausgabenImZeitraum = filtereNachZeitraum(ausgaben, zeitraum)
    const kategorieSummen = berechneKategorieSummen(ausgabenImZeitraum, kategorien)
        .filter((kategorie) => kategorie.betrag > 0)
        .toSorted((a, b) => b.betrag - a.betrag)
    const gesamtbetrag = berechneGesamtbetrag(kategorieSummen)
    const letzteAusgaben = ermittleNeuesteAusgaben(ausgabenImZeitraum, ANZAHL_LETZTE_AUSGABEN)


    return (
        <div className="startseite">
            <h1 className="visuell-versteckt">Übersicht</h1>
            <div className="startseite__auswertung">
                <Zeitraumsteuerung zeitraum={zeitraum} onAenderung={onZeitraumAenderung} />
                <Ringdiagramm eintraege={kategorieSummen} beschriftung={`Ausgaben ${beschreibeZeitraum(zeitraum)}`} />
            </div>
            <section className="kategorien startseite__kategorien">
                <h2 className="abschnittstitel">Kategorien</h2>
                {kategorieSummen.length === 0 ? (
                    <p className="leerhinweis">Für diesen Zeitraum gibt es noch keine Ausgaben.</p>
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
