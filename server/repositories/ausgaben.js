import { randomUUID } from 'node:crypto'
import { ausgaben as beispielAusgaben } from '../data/beispieldaten.js'

let ausgaben = structuredClone(beispielAusgaben)

function gehoertZu(haushaltId, id) {
    return (ausgabe) => ausgabe.haushaltId === haushaltId && ausgabe.id === id
}

export const ausgabenRepository = {
    async findeAlle(haushaltId) {
        return ausgaben.filter((ausgabe) => ausgabe.haushaltId === haushaltId)
    },

    async finde(haushaltId, id) {
        return ausgaben.find(gehoertZu(haushaltId, id)) ?? null
    },

    async legeAn(haushaltId, daten) {
        const ausgabe = { ...daten, id: randomUUID(), haushaltId, erstelltAm: new Date().toISOString() }
        ausgaben.push(ausgabe)
        return ausgabe
    },

    async aktualisiere(haushaltId, id, daten) {
        const index = ausgaben.findIndex(gehoertZu(haushaltId, id))
        if (index === -1) {
            return null
        }
        ausgaben[index] = { ...ausgaben[index], ...daten }
        return ausgaben[index]
    },

    async loesche(haushaltId, id) {
        const anzahlVorher = ausgaben.length
        ausgaben = ausgaben.filter((ausgabe) => !gehoertZu(haushaltId, id)(ausgabe))
        return ausgaben.length < anzahlVorher
    },
}