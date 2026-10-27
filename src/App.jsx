import { ChartNoAxesColumn, ChevronDown, ChevronLeft, ChevronRight, House, Menu, Plus, Receipt, ShoppingBasket, Users } from 'lucide-react'
import './App.css'

function App() {

  return(
    <div className="app">
      <header className="kopfzeile">
        <button className="kopfzeile_menu" aria_label="Menü öffnen">
          <Menu />
        </button>

        <button className="kopfzeile_haushalt">
          Unser Haushalt<ChevronDown />
        </button>

        <div className="kopfzeile_user">
          <span className="avatar">L</span>
          <span className="avatar">M</span>
        </div>
      </header>

    <main className="startseite">
      <div className="zeitraum">
        <button className="zeitraum__option">Woche</button>
        <button className="zeitraum__option zeitraum__option--aktiv"  aria-pressed={true}>Monat</button>
        <button className="zeitraum__option">Jahr</button>
      </div>

      <div className="monatsauswahl">
        <button className="monatsauswahl__pfeil" aria-label="Vorheriger Monat"><ChevronLeft /></button>
        <span className="monatsauswahl__monat">Oktober 2026</span>
        <button className="monatsauswahl__pfeil" aria-label="Nächster Monat"><ChevronRight /></button>
      </div>

      <div className="ringdiagramm">
        <p className="ringdiagramm__betrag">842,30 €</p>
        <p className="ringdiagramm__beschriftung">Ausgaben im Oktober</p>
      </div>


      <section className="kategorien">
        <h2 className="kategorien__titel">Kategorien</h2>
        <ul className="kategorien__liste">
          <li>
            <button className="kategorie-eintrag" style={{ '--kategorie-farbe': 'var(--farbe-salbei)' }}>
              <span className="kategorie-eintrag__icon"><ShoppingBasket /></span>
              <span className="kategorie-eintrag__text">
                <span className="kategorie-eintrag__name">Lebensmittel</span>
                <span className="kategorie-eintrag__balken">
                  <span className="kategorie-eintrag__fuellung" style={{ width: '37%' }} />
                </span>
              </span>
              <span className="kategorie-eintrag__werte">
                <span className="kategorie-eintrag__betrag">312,40 €</span>
                <span className="kategorie-eintrag__anteil">37 %</span>
              </span>
              <ChevronRight className="kategorie-eintrag__pfeil" />
            </button>
          </li>
          <li>
            <button className="kategorie-eintrag" style={{ '--kategorie-farbe': 'var(--farbe-sand)' }}>
              <span className="kategorie-eintrag__icon"><House /></span>
              <span className="kategorie-eintrag__text">
                <span className="kategorie-eintrag__name">Wohnen &amp; Haushalt</span>
                <span className="kategorie-eintrag__balken">
                  <span className="kategorie-eintrag__fuellung" style={{ width: '25%' }} />
                </span>
              </span>
              <span className="kategorie-eintrag__werte">
                <span className="kategorie-eintrag__betrag">210,00 €</span>
                <span className="kategorie-eintrag__anteil">25 %</span>
              </span>
              <ChevronRight className="kategorie-eintrag__pfeil" />
            </button>
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
