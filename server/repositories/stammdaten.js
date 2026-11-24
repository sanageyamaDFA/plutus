import { haushalte, kategorien, mitglieder } from '../data/beispieldaten.js'

export const stammdatenRepository = {
    async findeHaushalt(haushaltId) {
        return haushalte.find((haushalt) => haushalt.id === haushaltId) ?? null
    },

    async findeMitglieder(haushaltId) {
        return mitglieder.filter((mitglied) => mitglied.haushaltId === haushaltId)
    },

    async findeKategorien(haushaltId) {
        return kategorien.filter((kategorie) => kategorie.haushaltId === haushaltId)
    },
}