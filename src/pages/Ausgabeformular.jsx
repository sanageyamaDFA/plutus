import { X } from "lucide-react";
import { useId, useState } from 'react'
import { Aktionsleiste } from '../components/ui/Aktionsleiste'
import { Button } from '../components/ui/Button'
import { Eingabefeld } from '../components/ui/Eingabefeld'
import { Kategoriewahl } from '../components/kategorien/Kategoriewahl'
import { Segmentwahl } from '../components/auswertung/Segmentwahl'
import { pruefeEingaben } from '../utils/ausgaben'
import { betragAlsEingabe, leseBetrag } from '../utils/format'
import { heuteAlsIsoDatum } from '../utils/datum'
import './Ausgabeformular.css'


function erstelleAnfangswerte(ausgabe, kategorien, aktuellesMitgliedId) {
    if (ausgabe) {
        return {
            betrag: betragAlsEingabe(ausgabe.betrag),
            beschreibung: ausgabe.beschreibung,
            kategorieId: ausgabe.kategorieId,
            datum: ausgabe.datum,
            bezahltVon: ausgabe.bezahltVon,
            notiz: ausgabe.notiz
        }
    }
    return {
        betrag: '',
        beschreibung: '',
        kategorieId: kategorien[0].id,
        datum: heuteAlsIsoDatum(),
        bezahltVon: aktuellesMitgliedId,
        notiz: '',
    }
}

export function Ausgabeformular({
    ausgabe,
    kategorien,
    mitglieder,
    aktuellesMitgliedId,
    onSpeichern,
    onSchliessen,
}) {
    const istBearbeitung = ausgabe !== undefined
    const [eingaben, setEingaben] = useState(() =>
        erstelleAnfangswerte(ausgabe, kategorien, aktuellesMitgliedId),
    )
    const [fehler, setFehler] = useState({})
    const betragId = useId()
    const betragFehlerId = `${betragId}-fehler`

    function aendere(feld, wert) {
        setEingaben((bisher) => ({ ...bisher, [feld]: wert }))
        setFehler((bisher) => ({ ...bisher, [feld]: undefined }))
    }

    function speichere(ereignis) {
        ereignis.preventDefault()

        const gefundeneFehler = pruefeEingaben(eingaben)
        if (Object.keys(gefundeneFehler).length > 0) {
            setFehler(gefundeneFehler)
            return
        }

        onSpeichern({
            betrag: leseBetrag(eingaben.betrag),
            beschreibung: eingaben.beschreibung.trim(),
            kategorieId: eingaben.kategorieId,
            datum: eingaben.datum,
            bezahltVon: eingaben.bezahltVon,
            notiz: eingaben.notiz.trim(),
        })
    }

    const personenOptionen = mitglieder.map((mitglied) => ({
        wert: mitglied.id,
        label: mitglied.name,
    }))

    return (
        <form className="ausgabeformular" onSubmit={speichere} noValidate>
            <header className="ausgabeformular__kopf">
                <button
                    type="button"
                    className="ausgabeformular__schliessen"
                    aria-label="Schließen ohne zu speichern"
                    onClick={onSchliessen}
                >
                    <X />
                </button>
                <h1 className="ausgabeformular__titel">
                    {istBearbeitung ? 'Ausgabe bearbeiten' : 'Neue Ausgabe'}
                </h1>
            </header>

            <div className="ausgabeformular__betrag">
                <label htmlFor={betragId} className="visuell-versteckt">
                    Betrag in Euro
                </label>
                <input
                    id={betragId}
                    className="ausgabeformular__betrag-eingabe"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="0,00"
                    value={eingaben.betrag}
                    aria-invalid={fehler.betrag ? true : undefined}
                    aria-describedby={fehler.betrag ? betragFehlerId : undefined}
                    onChange={(ereignis) => aendere('betrag', ereignis.target.value)}
                />
                <span className="ausgabeformular__waehrung" aria-hidden="true">
                    €
                </span>
            </div>
            {fehler.betrag && (
                <p id={betragFehlerId} className="ausgabeformular__betragsfehler">
                    {fehler.betrag}
                </p>
            )}

            <Eingabefeld
                label="Beschreibung"
                placeholder="z. B. Rewe"
                value={eingaben.beschreibung}
                fehler={fehler.beschreibung}
                onChange={(ereignis) => aendere('beschreibung', ereignis.target.value)}
            />

            <Kategoriewahl
                kategorien={kategorien}
                gewaehlteId={eingaben.kategorieId}
                onAuswahl={(kategorieId) => aendere('kategorieId', kategorieId)}
            />

            <Eingabefeld
                label="Datum"
                type="date"
                value={eingaben.datum}
                fehler={fehler.datum}
                onChange={(ereignis) => aendere('datum', ereignis.target.value)}
            />

            <Segmentwahl
                legende="Bezahlt von"
                optionen={personenOptionen}
                gewaehlterWert={eingaben.bezahltVon}
                onAuswahl={(mitgliedId) => aendere('bezahltVon', mitgliedId)}
            />

            <Eingabefeld
                label="Notiz (optional)"
                placeholder="Notiz hinzufügen"
                value={eingaben.notiz}
                onChange={(ereignis) => aendere('notiz', ereignis.target.value)}
            />

            <Aktionsleiste>
                <Button type="submit">{istBearbeitung ? 'Änderungen speichern' : 'Speichern'}</Button>
            </Aktionsleiste>
        </form>
    )
}