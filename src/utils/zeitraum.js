import { alsIsoDatum, ausIsoDatum } from './datum'

const TAG_MONAT_JAHR = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'short', year: 'numeric' })
const TAG_MONAT = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'short' })
const MONAT_JAHR = new Intl.DateTimeFormat('de-DE', { month: 'long', year: 'numeric' })
const MONAT = new Intl.DateTimeFormat('de-DE', { month: 'long' })


export const ZEITRAUMARTEN = Object.freeze({
    WOCHE: 'woche',
    MONAT: 'monat',
    JAHR: 'jahr',
})


function ermittleDaten(zeitraum) {
    const { start, ende } = berechneGrenzen(zeitraum)
    const letzterTag = ausIsoDatum(ende)
    letzterTag.setDate(letzterTag.getDate() - 1)
    return { erster: ausIsoDatum(start), letzter: letzterTag }
}

// Überschrift der Auswahl, z. B. „9.–15. Nov. 2026“, „November 2026“, „2026“
export function formatiereZeitraum(zeitraum) {
    const { erster, letzter } = ermittleDaten(zeitraum)
    if (zeitraum.art === ZEITRAUMARTEN.WOCHE) return TAG_MONAT_JAHR.formatRange(erster, letzter)
    if (zeitraum.art === ZEITRAUMARTEN.MONAT) return MONAT_JAHR.format(erster)
    return String(erster.getFullYear())
}

// Für Sätze wie „Ausgaben im November“ oder „Ausgaben vom 9.–15. Nov“
export function beschreibeZeitraum(zeitraum) {
    const { erster, letzter } = ermittleDaten(zeitraum)
    if (zeitraum.art === ZEITRAUMARTEN.WOCHE) return `vom ${TAG_MONAT.formatRange(erster, letzter)}`
    if (zeitraum.art === ZEITRAUMARTEN.MONAT) return `im ${MONAT.format(erster)}`
    return `im Jahr ${erster.getFullYear()}`
}

export function berechneGrenzen({ art, bezugsdatum }) {
    const datum = ausIsoDatum(bezugsdatum)
    const jahr = datum.getFullYear()
    const monat = datum.getMonth()

    switch (art) {
        case ZEITRAUMARTEN.WOCHE: {
            const tageSeitMontag = (datum.getDay() + 6) % 7
            const start = new Date(jahr, monat, datum.getDate() - tageSeitMontag)
            const ende = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 7)
            return { start: alsIsoDatum(start), ende: alsIsoDatum(ende) }
        }
        case ZEITRAUMARTEN.MONAT:
            return {
                start: alsIsoDatum(new Date(jahr, monat, 1)),
                ende: alsIsoDatum(new Date(jahr, monat + 1, 1)),
            }
        case ZEITRAUMARTEN.JAHR:
            return {
                start: alsIsoDatum(new Date(jahr, 0, 1)),
                ende: alsIsoDatum(new Date(jahr + 1, 0, 1)),
            }
        default:
            throw new Error(`Unbekannte Zeitraumart: ${art}`)
    }
}

export function verschiebeZeitraum(zeitraum, schritte) {
    const neu = ausIsoDatum(berechneGrenzen(zeitraum).start)

    if (zeitraum.art === ZEITRAUMARTEN.WOCHE) {
        neu.setDate(neu.getDate() + 7 * schritte)
    } else if (zeitraum.art === ZEITRAUMARTEN.MONAT) {
        neu.setMonth(neu.getMonth() + schritte)
    } else {
        neu.setFullYear(neu.getFullYear() + schritte)
    }

    return { ...zeitraum, bezugsdatum: alsIsoDatum(neu) }
}

export function wechsleZeitraumart(zeitraum, art, heute) {
    const { start, ende } = berechneGrenzen(zeitraum)
    const enthaeltHeute = heute >= start && heute < ende
    return { art, bezugsdatum: enthaeltHeute ? heute : zeitraum.bezugsdatum }
}