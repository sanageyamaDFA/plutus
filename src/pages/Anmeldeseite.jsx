import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Eingabefeld } from '../components/ui/Eingabefeld'
import { Fehlermeldung } from '../components/ui/Fehlermeldung'
import { Passwortfeld } from '../components/ui/Passwortfeld'
import { pruefeAnmeldeeingaben } from '../utils/anmeldung'
import './Anmeldeseite.css'

export function Anmeldeseite({ onAnmelden }) {
    const [eingaben, setEingaben] = useState({ email: '', passwort: '' })
    const [fehler, setFehler] = useState({})
    const [istFehlgeschlagen, setIstFehlgeschlagen] = useState(false)

    function aendere(feld, wert) {
        setEingaben((bisher) => ({ ...bisher, [feld]: wert }))
        setFehler((bisher) => ({ ...bisher, [feld]: undefined }))
    }

    function meldeAn(ereignis) {
        ereignis.preventDefault()

        const gefundeneFehler = pruefeAnmeldeeingaben(eingaben)
        if (Object.keys(gefundeneFehler).length > 0) {
            setFehler(gefundeneFehler)
            return
        }

        const istErfolgreich = onAnmelden(eingaben.email, eingaben.passwort)
        setIstFehlgeschlagen(!istErfolgreich)
    }

    return (
        <div className="anmeldeseite">
            <header className="anmeldeseite__kopf">
                <div className="anmeldeseite__logo" aria-hidden="true" />
                <h1 className="anmeldeseite__titel">Plutus</h1>
                <p className="anmeldeseite__untertitel">Gemeinsam den Überblick behalten</p>
            </header>

            <form className="anmeldeseite__formular" onSubmit={meldeAn} noValidate>
                {istFehlgeschlagen && (
                    <Fehlermeldung>E-Mail oder Passwort ist falsch. Bitte versuche es erneut.</Fehlermeldung>
                )}

                <Eingabefeld
                    label="E-Mail"
                    type="email"
                    autoComplete="username"
                    placeholder="name@beispiel.de"
                    value={eingaben.email}
                    fehler={fehler.email}
                    onChange={(ereignis) => aendere('email', ereignis.target.value)}
                />

                <Passwortfeld
                    label="Passwort"
                    autoComplete="current-password"
                    placeholder="Passwort eingeben"
                    value={eingaben.passwort}
                    fehler={fehler.passwort}
                    onChange={(ereignis) => aendere('passwort', ereignis.target.value)}
                />

                <Button type="submit">Anmelden</Button>
            </form>

            <p className="anmeldeseite__hinweis">
                Testzugang: leandro@beispiel.de oder max@beispiel.de, Passwort „plutus“
            </p>
        </div>
    )
}