import { Router } from 'express'
import { stammdatenRepository } from '../repositories/stammdaten.js'

export const stammdatenRouter = Router()

stammdatenRouter.get('/haushalt', async (req, res) => {
    const haushalt = await stammdatenRepository.findeHaushalt(req.haushaltId)
    const mitglieder = await stammdatenRepository.findeMitglieder(req.haushaltId)
    res.json({ ...haushalt, mitglieder })
})

stammdatenRouter.get('/kategorien', async (req, res) => {
    res.json(await stammdatenRepository.findeKategorien(req.haushaltId))
})