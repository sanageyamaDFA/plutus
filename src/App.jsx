import { useState } from 'react'
import { Mainlayout } from './components/layout/Mainlayout'
import { SEITEN, HAUPTSEITEN } from './navigation/seiten'
import { Platzhalterseite } from './pages/Platzhalterseite'
import { Ausgabedetail } from './pages/Ausgabedetail'
import { Ausgabenliste } from './pages/Ausgabenliste'
import { Startseite } from './pages/Startseite'
import { Ausgabeformular } from './pages/Ausgabeformular'
import { Kategoriedetail } from './pages/Kategoriedetail'
import { Anmeldeseite } from './pages/Anmeldeseite'
import { Ladefehlerseite } from './pages/Ladefehlerseite'
import { Ladeanzeige } from './components/ui/Ladeanzeige'
import { useHaushaltsdaten, LADESTATUS } from './hooks/useHaushaltsdaten'
import { findeNachId } from './utils/listen'
import { pruefeZugangsdaten } from './utils/anmeldung'
import { heuteAlsIsoDatum } from './utils/datum'
import { ZEITRAUMARTEN } from './utils/zeitraum'
import { TESTZUGAENGE } from './data/testzugaenge'
import './App.css'

export function App() {
  const [angemeldetesMitgliedId, setAngemeldetesMitgliedId] = useState(null)
  const [verlauf, setVerlauf] = useState([{ seite: SEITEN.UEBERSICHT }])
  const ansicht = verlauf.at(-1)
  const istHauptseite = HAUPTSEITEN.includes(ansicht.seite)
  const daten = useHaushaltsdaten(angemeldetesMitgliedId !== null)
  const [zeitraum, setZeitraum] = useState(() => ({
    art: ZEITRAUMARTEN.MONAT,
    bezugsdatum: heuteAlsIsoDatum(),
  }))


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

  async function legeAusgabeAn(werte) {
    await daten.legeAusgabeAn(werte)
    geheZurueck()
  }

  async function aktualisiereAusgabe(ausgabeId, werte) {
    await daten.aktualisiereAusgabe(ausgabeId, werte)
    geheZurueck()
  }

  async function loescheAusgabe(ausgabeId) {
    await daten.loescheAusgabe(ausgabeId)
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
            ausgaben={daten.ausgaben}
            kategorien={daten.kategorien}
            mitglieder={daten.mitglieder}
            zeitraum={zeitraum}
            onZeitraumAenderung={setZeitraum}
            onAusgabeAuswahl={(ausgabeId) => oeffneSeite(SEITEN.AUSGABEDETAIL, { ausgabeId })}
            onKategorieAuswahl={oeffneKategorie}
          />
        )
      case SEITEN.AUSGABEN:
        return <Ausgabenliste
          ausgaben={daten.ausgaben}
          kategorien={daten.kategorien}
          mitglieder={daten.mitglieder}
          onAusgabeAuswahl={(ausgabeId) => oeffneSeite(SEITEN.AUSGABEDETAIL, { ausgabeId })}
        />

      case SEITEN.AUSGABEDETAIL: {
        const ausgabe = findeNachId(daten.ausgaben, ansicht.ausgabeId)
        if (!ausgabe) {
          return <Platzhalterseite titel="Ausgabe nicht gefunden" />
        }
        return (
          <Ausgabedetail
            ausgabe={ausgabe}
            kategorien={daten.kategorien}
            mitglieder={daten.mitglieder}
            onZurueck={geheZurueck}
            onBearbeiten={() => oeffneSeite(SEITEN.AUSGABE_BEARBEITEN, { ausgabeId: ausgabe.id })}
            onLoeschen={() => loescheAusgabe(ausgabe.id)}
          />
        )
      }

      case SEITEN.AUSGABE_NEU: {
        return (
          <Ausgabeformular
            kategorien={daten.kategorien}
            mitglieder={daten.mitglieder}
            aktuellesMitgliedId={angemeldetesMitgliedId}
            onSpeichern={legeAusgabeAn}
            onSchliessen={geheZurueck}
          />
        )
      }

      case SEITEN.AUSGABE_BEARBEITEN: {
        const ausgabe = findeNachId(daten.ausgaben, ansicht.ausgabeId)
        if (!ausgabe) {
          return <Platzhalterseite titel="Ausgabe nicht gefunden" />
        }
        return (
          <Ausgabeformular
            ausgabe={ausgabe}
            kategorien={daten.kategorien}
            mitglieder={daten.mitglieder}
            aktuellesMitgliedId={angemeldetesMitgliedId}
            onSpeichern={(werte) => aktualisiereAusgabe(ausgabe.id, werte)}
            onSchliessen={geheZurueck}
          />
        )
      }
      case SEITEN.KATEGORIEDETAIL: {
        const kategorie = findeNachId(daten.kategorien, ansicht.kategorieId)
        if (!kategorie) {
          return <Platzhalterseite titel="Kategorie nicht gefunden" />
        }
        return (
          <Kategoriedetail
            kategorie={kategorie}
            ausgaben={daten.ausgaben}
            kategorien={daten.kategorien}
            mitglieder={daten.mitglieder}
            zeitraum={zeitraum}
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

  if (daten.status === LADESTATUS.LAEDT) {
    return (
      <div className="app">
        <div className="unterseite">
          <Ladeanzeige text="Daten werden geladen …" />
        </div>
      </div>
    )
  }

  if (daten.status === LADESTATUS.FEHLER) {
    return (
      <div className="app">
        <div className="unterseite">
          <Ladefehlerseite onErneutVersuchen={daten.ladeErneut} />
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      {istHauptseite ? (
        <Mainlayout
          haushalt={daten.haushalt}
          mitglieder={daten.mitglieder}
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