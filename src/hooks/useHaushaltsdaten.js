import { useEffect, useState } from 'react'
import * as api from '../api/plutusApi'

export const LADESTATUS = Object.freeze({
    LAEDT: 'laedt',
    BEREIT: 'bereit',
    FEHLER: 'fehler',
})

export function useHaushaltsdaten(istAktiv) {
    const [daten, setDaten] = useState({ haushalt: null, kategorien: [], ausgaben: [] })
    const [status, setStatus] = useState(LADESTATUS.LAEDT)
    const [ladeversuch, setLadeversuch] = useState(0)

    useEffect(() => {
        if (!istAktiv) {
            return
        }

        let istVeraltet = false

        Promise.all([api.ladeHaushalt(), api.ladeKategorien(), api.ladeAusgaben()])
            .then(([haushalt, kategorien, ausgaben]) => {
                if (istVeraltet) return
                setDaten({ haushalt, kategorien, ausgaben })
                setStatus(LADESTATUS.BEREIT)
            })
            .catch(() => {
                if (istVeraltet) return
                setStatus(LADESTATUS.FEHLER)
            })

        return () => {
            istVeraltet = true
        }
    }, [istAktiv, ladeversuch])

    function ladeErneut() {
        setStatus(LADESTATUS.LAEDT)
        setLadeversuch((bisher) => bisher + 1)
    }

    async function legeAusgabeAn(werte) {
        const neu = await api.legeAusgabeAn(werte)
        setDaten((bisher) => ({ ...bisher, ausgaben: [...bisher.ausgaben, neu] }))
    }

    async function aktualisiereAusgabe(id, werte) {
        const geaendert = await api.aktualisiereAusgabe(id, werte)
        setDaten((bisher) => ({
            ...bisher,
            ausgaben: bisher.ausgaben.map((ausgabe) => (ausgabe.id === id ? geaendert : ausgabe)),
        }))
    }

    async function loescheAusgabe(id) {
        await api.loescheAusgabe(id)
        setDaten((bisher) => ({
            ...bisher,
            ausgaben: bisher.ausgaben.filter((ausgabe) => ausgabe.id !== id),
        }))
    }

    return {
        status,
        haushalt: daten.haushalt,
        mitglieder: daten.haushalt?.mitglieder ?? [],
        kategorien: daten.kategorien,
        ausgaben: daten.ausgaben,
        ladeErneut,
        legeAusgabeAn,
        aktualisiereAusgabe,
        loescheAusgabe,
    }
}