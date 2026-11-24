const API_BASIS = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

export class ApiFehler extends Error {
    constructor(status, meldung, felder = null) {
        super(meldung)
        this.name = 'ApiFehler'
        this.status = status
        this.felder = felder
    }
}

export async function anfrage(pfad, { methode = 'GET', daten } = {}) {
    const optionen = { method: methode, headers: {} }
    if (daten !== undefined) {
        optionen.headers['Content-Type'] = 'application/json'
        optionen.body = JSON.stringify(daten)
    }

    let antwort
    try {
        antwort = await fetch(`${API_BASIS}${pfad}`, optionen)
    } catch {
        throw new ApiFehler(0, 'Der Server ist nicht erreichbar.')
    }

    if (antwort.status === 204) {
        return null
    }

    const inhalt = await antwort.json().catch(() => null)
    if (!antwort.ok) {
        throw new ApiFehler(antwort.status, inhalt?.fehler ?? 'Unbekannter Fehler.', inhalt?.felder ?? null)
    }
    return inhalt
}

export function formuliereFehlermeldung(fehler) {
    if (!(fehler instanceof ApiFehler)) {
        return 'Etwas ist schiefgelaufen. Bitte versuche es erneut.'
    }
    switch (fehler.status) {
        case 0:
            return 'Der Server ist nicht erreichbar. Prüfe deine Verbindung und versuche es erneut.'
        case 400:
            return 'Der Server hat die Eingaben abgelehnt. Bitte prüfe sie und versuche es erneut.'
        case 404:
            return 'Diese Ausgabe gibt es nicht mehr. Vielleicht wurde sie inzwischen gelöscht.'
        default:
            return 'Etwas ist schiefgelaufen. Bitte versuche es später erneut.'
    }
}