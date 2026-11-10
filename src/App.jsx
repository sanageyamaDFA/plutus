import './App.css'
import { Ringdiagramm } from './components/Ringdiagramm'
import { KategorieEintrag } from './components/KategorieEintrag'
import { Kopfzeile } from './components/Kopfzeile'
import { Monatsauswahl } from './components/MonatsAuswahl'
import { haushalt, mitglieder, kategorien, ausgaben } from './data/beispieldaten'
import {
  berechneAnteil, berechneGesamtbetrag, berechneKategorieSummen, filtereNachMonat
} from './utils/berechnungen'
import { Navigationsleiste } from './components/Navigationsleiste'
import { Zeitraumauswahl } from './components/Zeitraumauswahl'

const ANGEZEIGTES_JAHR = 2026
const ANGEZEIGTER_MONAT = 10

function App() {

  const ausgabenImMonat = filtereNachMonat(ausgaben, ANGEZEIGTES_JAHR, ANGEZEIGTER_MONAT)
  const kategorieSummen = berechneKategorieSummen(ausgabenImMonat, kategorien)
    .filter((kategorie) => kategorie.betrag > 0)
    .toSorted((a, b) => b.betrag - a.betrag)
  const gesamtbetrag = berechneGesamtbetrag(kategorieSummen)

  return (
    <div className="app">
      <Kopfzeile haushaltsName={haushalt.name} mitglieder={mitglieder} />
      <main className="startseite">
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
      </main>
      <Navigationsleiste aktiverEintrag='uebersicht'
        onNeueAusgabe={() => window.alert('Implementation folgt!')}
      />
    </div>
  )

}

export default App
