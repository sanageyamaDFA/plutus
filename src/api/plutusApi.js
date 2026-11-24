import { anfrage } from './client'

// Server = Cent, Frontend = Euro ==> Umrechnung hier
function ausServer({ betragInCent, ...ausgabe }) {
    return { ...ausgabe, betrag: betragInCent / 100 }
}

function fuerServer({ betrag, ...daten }) {
    return { ...daten, betragInCent: Math.round(betrag * 100) }
}

export async function ladeHaushalt() {
    return anfrage('/haushalt')
}

export async function ladeKategorien() {
    return anfrage('/kategorien')
}

export async function ladeAusgaben() {
    const ausgaben = await anfrage('/ausgaben')
    return ausgaben.map(ausServer)
}

export async function legeAusgabeAn(daten) {
    const ausgabe = await anfrage('/ausgaben', { methode: 'POST', daten: fuerServer(daten) })
    return ausServer(ausgabe)
}

export async function aktualisiereAusgabe(id, daten) {
    const ausgabe = await anfrage(`/ausgaben/${id}`, { methode: 'PUT', daten: fuerServer(daten) })
    return ausServer(ausgabe)
}

export async function loescheAusgabe(id) {
    await anfrage(`/ausgaben/${id}`, { methode: 'DELETE' })
}