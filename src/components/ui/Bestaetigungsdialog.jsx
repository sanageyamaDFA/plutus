import { useEffect, useId, useRef } from 'react'
import { Button } from './Button'
import './Bestaetigungsdialog.css'

export function Bestaetigungsdialog({
    offen,
    titel,
    text,
    bestaetigung,
    istBeschaeftigt = false,
    onBestaetigen,
    onSchliessen,
}) {
    const dialogRef = useRef(null)
    const titelId = useId()

    useEffect(() => {
        const dialog = dialogRef.current
        if (offen && !dialog.open) {
            dialog.showModal()
        } else if (!offen && dialog.open) {
            dialog.close()
        }
    }, [offen])

    return (
        <dialog
            ref={dialogRef}
            className="bestaetigungsdialog"
            aria-labelledby={titelId}
            onClose={onSchliessen}
        >
            <h2 id={titelId} className="bestaetigungsdialog__titel">
                {titel}
            </h2>
            <p className="bestaetigungsdialog__text">{text}</p>
            <div className="bestaetigungsdialog__aktionen">
                <Button variante="sekundaer" onClick={onSchliessen} disabled={istBeschaeftigt}>
                    Abbrechen
                </Button>
                <Button variante="destruktiv" onClick={onBestaetigen} disabled={istBeschaeftigt}>
                    {istBeschaeftigt ? 'Wird gelöscht …' : bestaetigung}
                </Button>
            </div>
        </dialog>
    )
}