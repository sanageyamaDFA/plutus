import { useState } from 'react'
import { Mainlayout } from './components/layout/Mainlayout'
import { ausgaben as beispielAusgaben, haushalt, kategorien, mitglieder } from './data/beispieldaten'
import { SEITEN, HAUPTSEITEN } from './navigation/seiten'
import { Platzhalterseite } from './pages/Platzhalterseite'
import { Ausgabedetail } from './pages/Ausgabedetail'
import { Ausgabenliste } from './pages/Ausgabenliste'
import { Startseite } from './pages/Startseite'
import { Ausgabeformular } from './pages/Ausgabeformular'
import { Kategoriedetail } from './pages/Kategoriedetail'
import { Anmeldeseite } from './pages/Anmeldeseite'
import { findeNachId, ermittleNaechsteId } from './utils/listen'
import { pruefeZugangsdaten } from './utils/anmeldung'
import { TESTZUGAENGE } from './data/testzugaenge'
import './App.css'

const ANGEZEIGTES_JAHR = 2026
const ANGEZEIGTER_MONAT = 10

export function App() {
  const [angemeldetesMitgliedId, setAngemeldetesMitgliedId] = useState(null)
  const [verlauf, setVerlauf] = useState([{ seite: SEITEN.UEBERSICHT }])
  const ansicht = verlauf.at(-1)
  const istHauptseite = HAUPTSEITEN.includes(ansicht.seite)

  const [ausgaben, setAusgaben] = useState(beispielAusgaben)

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

  function loescheAusgabe(ausgabeId) {
    setAusgaben((bisher) => bisher.filter((ausgabe) => ausgabe.id !== ausgabeId))
    geheZurueck()
  }

  function legeAusgabeAn(daten) {
    setAusgaben((bisher) => [...bisher, { ...daten, id: ermittleNaechsteId(bisher) }])
    geheZurueck()
  }

  function aktualisiereAusgabe(ausgabeId, daten) {
    setAusgaben((bisher) =>
      bisher.map((ausgabe) => (ausgabe.id === ausgabeId ? { ...ausgabe, ...daten } : ausgabe)),
    )
    geheZurueck()
  }

  function oeffneKategorie(kategorieId) {
    oeffneSeite(SEITEN.KATEGORIEDETAIL, { kategorieId })
  }


  function meldeAn(email, passwort) {
    const mitgliedId = pruefeZugangsdaten(TESTZUGAENGE, email, passwort)
    if (mitgliedId === null) {
      return false
    }

    setAngemeldetesMitgliedId(mitgliedId)
    setVerlauf([{ seite: SEITEN.UEBERSICHT }])
    return true
  }

  function zeigeSeite() {
    switch (ansicht.seite) {
      case SEITEN.UEBERSICHT:
        return (
          <Startseite
            ausgaben={ausgaben}
            kategorien={kategorien}
            mitglieder={mitglieder}
            jahr={ANGEZEIGTES_JAHR}
            monat={ANGEZEIGTER_MONAT}
            onAusgabeAuswahl={(ausgabeId) => oeffneSeite(SEITEN.AUSGABEDETAIL, { ausgabeId })}
            onKategorieAuswahl={oeffneKategorie}
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
            onBearbeiten={() => oeffneSeite(SEITEN.AUSGABE_BEARBEITEN, { ausgabeId: ausgabe.id })}
            onLoeschen={() => loescheAusgabe(ausgabe.id)}
          />
        )
      }

      case SEITEN.AUSGABE_NEU: {
        return (
          <Ausgabeformular
            kategorien={kategorien}
            mitglieder={mitglieder}
            aktuellesMitgliedId={angemeldetesMitgliedId}
            onSpeichern={legeAusgabeAn}
            onSchliessen={geheZurueck}
          />
        )
      }

      case SEITEN.AUSGABE_BEARBEITEN: {
        const ausgabe = findeNachId(ausgaben, ansicht.ausgabeId)
        if (!ausgabe) {
          return <Platzhalterseite titel="Ausgabe nicht gefunden" />
        }
        return (
          <Ausgabeformular
            ausgabe={ausgabe}
            kategorien={kategorien}
            mitglieder={mitglieder}
            aktuellesMitgliedId={angemeldetesMitgliedId}
            onSpeichern={(daten) => aktualisiereAusgabe(ausgabe.id, daten)}
            onSchliessen={geheZurueck}
          />
        )
      }
      case SEITEN.KATEGORIEDETAIL: {
        const kategorie = findeNachId(kategorien, ansicht.kategorieId)
        if (!kategorie) {
          return <Platzhalterseite titel="Kategorie nicht gefunden" />
        }
        return (
          <Kategoriedetail
            kategorie={kategorie}
            ausgaben={ausgaben}
            kategorien={kategorien}
            mitglieder={mitglieder}
            jahr={ANGEZEIGTES_JAHR}
            monat={ANGEZEIGTER_MONAT}
            onZurueck={geheZurueck}
            onAusgabeAuswahl={(ausgabeId) => oeffneSeite(SEITEN.AUSGABEDETAIL, { ausgabeId })}
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

  if (angemeldetesMitgliedId === null) {
    return (
      <div className="app">
        <div className="unterseite">
          <Anmeldeseite onAnmelden={meldeAn} />
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      {istHauptseite ? (
        <Mainlayout
          haushalt={haushalt}
          mitglieder={mitglieder}
          aktiveSeite={ansicht.seite}
          onNavigation={wechsleHauptseite}
          onNeueAusgabe={() => oeffneSeite(SEITEN.AUSGABE_NEU)}
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