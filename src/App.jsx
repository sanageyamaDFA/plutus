import { useState } from 'react'
import { Mainlayout } from './components/Mainlayout'
import { ausgaben, haushalt, kategorien, mitglieder } from './data/beispieldaten'
import { SEITEN, HAUPTSEITEN } from './navigation/seiten'
import { Platzhalterseite } from './pages/Platzhalterseite'
import { Ausgabedetail } from './pages/Ausgabedetail'
import { Ausgabenliste } from './pages/Ausgabenliste'
import { Startseite } from './pages/Startseite'
import { findeNachId } from './utils/listen'
import './App.css'

const ANGEZEIGTES_JAHR = 2026
const ANGEZEIGTER_MONAT = 10

export function App() {
  const [verlauf, setVerlauf] = useState([{ seite: SEITEN.UEBERSICHT }])
  const ansicht = verlauf.at(-1)
  const istHauptseite = HAUPTSEITEN.includes(ansicht.seite)

  function oeffneSeite(seite, details = {}) {
    setVerlauf((bisher) => [...bisher, { seite, ...details }])
    window.scrollTo(0, 0)
  }

  function wechsleHauptseite(seite) {
    setVerlauf([{ seite }])
    window.scrollTo(0, 0)
  }

  function geheZurueck() {
    setVerlauf((bisher) => (bisher.length > 1 ? bisher.slice(0, -1) : bisher))
    window.scrollTo(0, 0)
  }

  function zeigeSeite() {
    switch (ansicht.seite) {
      case SEITEN.UEBERSICHT:
        return (
          <Startseite
            ausgaben={ausgaben}
            kategorien={kategorien}
            jahr={ANGEZEIGTES_JAHR}
            monat={ANGEZEIGTER_MONAT}
          />
        )
      case SEITEN.AUSGABEN:
        return <Ausgabenliste
          ausgaben={ausgaben}
          kategorien={kategorien}
          mitglieder={mitglieder}
          onAusgabeAuswahl={(ausgabeId) => oeffneSeite(SEITEN.AUSGABEDETAIL, { ausgabeId })}
        />

      case SEITEN.AUSGABEDETAIL: {
        const ausgabe = findeNachId(ausgaben, ansicht.ausgabeId)
        if (!ausgabe) {
          return <Platzhalterseite titel="Ausgabe nicht gefunden" />
        }
        return (
          <Ausgabedetail
            ausgabe={ausgabe}
            kategorien={kategorien}
            mitglieder={mitglieder}
            onZurueck={geheZurueck}
            onBearbeiten={() => window.alert('Das Bearbeiten folgt im übernächsten Schritt.')}
            onLoeschen={() => window.alert('Das Löschen folgt im nächsten Schritt.')}
          />
        )
      }
      case SEITEN.STATISTIK:
        return <Platzhalterseite titel="Statistik" />
      case SEITEN.HAUSHALT:
        return <Platzhalterseite titel="Haushalt" />
      default:
        return <Platzhalterseite titel="Seite nicht gefunden" />
    }
  }

  return (
    <div className="app">
      {istHauptseite ? (
        <Mainlayout
          haushalt={haushalt}
          mitglieder={mitglieder}
          aktiveSeite={ansicht.seite}
          onNavigation={wechsleHauptseite}
          onNeueAusgabe={() => window.alert('Das Formular für neue Ausgaben folgt im nächsten Schritt.')}
        >
          {zeigeSeite()}
        </Mainlayout>
      ) : (
        <div className="unterseite">{zeigeSeite()}</div>
      )}
    </div>
  )
}

export default App