import { leseBetrag } from "./format"

export function pruefeEingaben(eingaben) {
    const fehler = {}
    const betrag = leseBetrag(eingaben.betrag)

    if (betrag === null) {
        fehler.betrag = 'Gib einen Betrag ein.'
    } else if (betrag === 0) {
        fehler.betrag = 'Der Betrag muss größer als 0 sein.'
    }

    if (eingaben.beschreibung.trim() === '') {
        fehler.beschreibung = 'Gib an, wofür die Ausgabe war.'
    }

    if (eingaben.datum === '') {
        fehler.datum = 'Wähle ein Datum.'
    }

    return fehler

}

function vergleicheNeuesteZuerst(a, b) {
    return b.datum.localeCompare(a.datum) || b.id - a.id
}

export function gruppiereNachDatum(ausgaben) {
    const sortiert = ausgaben.toSorted(vergleicheNeuesteZuerst)
    const gruppen = Object.groupBy(sortiert, (ausgabe) => ausgabe.datum)

    return Object.entries(gruppen).map(([datum, ausgabenDesTages]) => ({
        datum,
        ausgaben: ausgabenDesTages,
    }))
}

export function sortiereNeuesteZuerst(ausgaben) {
    return ausgaben.toSorted(vergleicheNeuesteZuerst)
}

export function ermittleNeuesteAusgaben(ausgaben, anzahl) {
    return sortiereNeuesteZuerst(ausgaben).slice(0, anzahl)
}

export function filtereNachMonat(ausgaben, jahr, monat) {
    return ausgaben.filter((ausgabe) => {
        const [ausgabeJahr, ausgabeMonat] = ausgabe.datum.split('-').map(Number)
        return ausgabeJahr === jahr && ausgabeMonat === monat
    })
}