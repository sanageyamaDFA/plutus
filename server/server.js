import express from 'express'
import cors from 'cors'
import { setzeBeispielhaushalt } from './middleware/haushalt.js'
import { ausgabenRouter } from './routes/ausgaben.js'
import { stammdatenRouter } from './routes/stammdaten.js'

const PORT = 3001
const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())
app.use(setzeBeispielhaushalt)

app.use('/ausgaben', ausgabenRouter)
app.use('/', stammdatenRouter)

// Kein Endpunkt hat gepasst
app.use((req, res) => {
    res.status(404).json({ fehler: 'Endpunkt nicht gefunden.' })
})

app.use((fehler, req, res, next) => {
    if (fehler.type === 'entity.parse.failed') {
        return res.status(400).json({ fehler: 'Der Anfragekörper ist kein gültiges JSON.' })
    }
    console.error(fehler)
    res.status(500).json({ fehler: 'Interner Serverfehler.' })
})

app.listen(PORT, () => {
    console.log(`Server läuft unter http://localhost:${PORT}`)
})