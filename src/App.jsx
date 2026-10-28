import './App.css'
import './components/Navigationsleiste.css'
import Ringdiagramm from './components/Ringdiagramm'
import KategorieEintrag from './components/KategorieEintrag'
import Kopfzeile from './components/Kopfzeile'
import Monatsauswahl from './components/MonatsAuswahl'
import { ChartNoAxesColumn, House, Plus, Receipt, ShoppingBasket, Users } from 'lucide-react'


function App() {

  return (
    <div className="app">
      <Kopfzeile haushaltsName="Unser Haushalt" />
      <main className="startseite">
        <div className="zeitraum">
          <button className="zeitraum__option">Woche</button>
          <button className="zeitraum__option zeitraum__option--aktiv" aria-pressed={true}>Monat</button>
          <button className="zeitraum__option">Jahr</button>
        </div>
        <Monatsauswahl monat="Oktober 2026" />
        <Ringdiagramm gesamtbetrag={842.3} beschriftung="Ausgaben im Oktober" />
        <section className="kategorien">
          <h2 className="kategorien__titel">Kategorien</h2>
          <ul className="kategorien__liste">
            <li>
              <KategorieEintrag name="Lebensmittel" icon={ShoppingBasket} farbe="var(--farbe-salbei)" betrag={312.4} anteil={37} />
            </li>
            <li>
              <KategorieEintrag name="Wohnen & Haushalt" icon={House} farbe="var(--farbe-sand)" betrag={210} anteil={25} />
            </li>
          </ul>
        </section>
      </main>

      <nav className="navigationsleiste" aria-label="Hauptnavigation">
        <button className="navigationsleiste__eintrag navigationsleiste__eintrag--aktiv" aria-current="page">
          <House /><span>Übersicht</span>
        </button>
        <button className="navigationsleiste__eintrag"><Receipt /><span>Ausgaben</span></button>
        <button className="navigationsleiste__plus" aria-label="Neue Ausgabe hinzufügen"><Plus /></button>
        <button className="navigationsleiste__eintrag"><ChartNoAxesColumn /><span>Statistik</span></button>
        <button className="navigationsleiste__eintrag"><Users /><span>Haushalt</span></button>
      </nav>
    </div>
  )

}

export default App
