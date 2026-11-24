import { Router } from 'express'
import { ausgabenRepository } from '../repositories/ausgaben.js'
import { stammdatenRepository } from '../repositories/stammdaten.js'
import { bereinigeAusgabe, pruefeAusgabe } from '../validation/ausgaben.js'

export const ausgabenRouter = Router()

const NICHT_GEFUNDEN = { fehler: 'Ausgabe nicht gefunden.' }

async function pruefeAnfrage(req) {
    const kategorien = await stammdatenRepository.findeKategorien(req.haushaltId)
    const mitglieder = await stammdatenRepository.findeMitglieder(req.haushaltId)
    return pruefeAusgabe(req.body, {
        kategorieIds: kategorien.map((kategorie) => kategorie.id),
        mitgliedIds: mitglieder.map((mitglied) => mitglied.id),
    })
}

function hatFehler(fehler) {
    return Object.keys(fehler).length > 0
}

ausgabenRouter.get('/', async (req, res) => {
    res.json(await ausgabenRepository.findeAlle(req.haushaltId))
})

ausgabenRouter.get('/:id', async (req, res) => {
    const ausgabe = await ausgabenRepository.finde(req.haushaltId, req.params.id)
    if (!ausgabe) {
        return res.status(404).json(NICHT_GEFUNDEN)
    }
    res.json(ausgabe)
})

ausgabenRouter.post('/', async (req, res) => {
    const fehler = await pruefeAnfrage(req)
    if (hatFehler(fehler)) {
        return res.status(400).json({ fehler: 'Ungültige Eingaben.', felder: fehler })
    }
    const ausgabe = await ausgabenRepository.legeAn(req.haushaltId, bereinigeAusgabe(req.body))
    res.status(201).json(ausgabe)
})

ausgabenRouter.put('/:id', async (req, res) => {
    const vorhanden = await ausgabenRepository.finde(req.haushaltId, req.params.id)
    if (!vorhanden) {
        return res.status(404).json(NICHT_GEFUNDEN)
    }
    const fehler = await pruefeAnfrage(req)
    if (hatFehler(fehler)) {
        return res.status(400).json({ fehler: 'Ungültige Eingaben.', felder: fehler })
    }
    const ausgabe = await ausgabenRepository.aktualisiere(
        req.haushaltId,
        req.params.id,
        bereinigeAusgabe(req.body),
    )
    res.json(ausgabe)
})

ausgabenRouter.delete('/:id', async (req, res) => {
    const wurdeGeloescht = await ausgabenRepository.loesche(req.haushaltId, req.params.id)
    if (!wurdeGeloescht) {
        return res.status(404).json(NICHT_GEFUNDEN)
    }
    res.status(204).end()
})