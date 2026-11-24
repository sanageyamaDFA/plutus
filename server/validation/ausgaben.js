const ISO_DATUM = /^\d{4}-\d{2}-\d{2}$/
const MAX_LAENGE_BESCHREIBUNG = 100
const MAX_LAENGE_NOTIZ = 500

function istGueltigesDatum(text) {
    return typeof text === 'string' && ISO_DATUM.test(text) && !Number.isNaN(Date.parse(text))
}

export function pruefeAusgabe(daten, { kategorieIds, mitgliedIds }) {
    if (typeof daten !== 'object' || daten === null || Array.isArray(daten)) {
        return { allgemein: 'Erwartet wird ein Objekt mit den Daten der Ausgabe.' }
    }

    const fehler = {}

    if (!Number.isInteger(daten.betragInCent) || daten.betragInCent <= 0) {
        fehler.betragInCent = 'Muss eine ganze Zahl größer als 0 sein.'
    }
    if (typeof daten.beschreibung !== 'string' || daten.beschreibung.trim() === '') {
        fehler.beschreibung = 'Darf nicht leer sein.'
    } else if (daten.beschreibung.length > MAX_LAENGE_BESCHREIBUNG) {
        fehler.beschreibung = `Darf höchstens ${MAX_LAENGE_BESCHREIBUNG} Zeichen lang sein.`
    }
    if (!kategorieIds.includes(daten.kategorieId)) {
        fehler.kategorieId = 'Unbekannte Kategorie.'
    }
    if (!istGueltigesDatum(daten.datum)) {
        fehler.datum = 'Muss ein gültiges Datum im Format JJJJ-MM-TT sein.'
    }
    if (!mitgliedIds.includes(daten.bezahltVon)) {
        fehler.bezahltVon = 'Unbekanntes Mitglied des Haushalts.'
    }
    if (daten.notiz !== undefined && typeof daten.notiz !== 'string') {
        fehler.notiz = 'Muss ein Text sein.'
    } else if (daten.notiz?.length > MAX_LAENGE_NOTIZ) {
        fehler.notiz = `Darf höchstens ${MAX_LAENGE_NOTIZ} Zeichen lang sein.`
    }

    return fehler
}

export function bereinigeAusgabe(daten) {
    return {
        betragInCent: daten.betragInCent,
        beschreibung: daten.beschreibung.trim(),
        kategorieId: daten.kategorieId,
        datum: daten.datum,
        bezahltVon: daten.bezahltVon,
        notiz: (daten.notiz ?? '').trim(),
    }
}