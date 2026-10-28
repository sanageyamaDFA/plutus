import './Monatsauswahl.css'
import { ChevronLeft, ChevronRight } from "lucide-react";


export function Monatsauswahl({ monat }) {

    return (
        <div className="monatsauswahl">
            <button className="monatsauswahl__pfeil" aria-label="Vorheriger Monat"><ChevronLeft /></button>
            <span className="monatsauswahl__monat">{monat}</span>
            <button className="monatsauswahl__pfeil" aria-label="Nächster Monat"><ChevronRight /></button>
        </div>
    )
}

export default Monatsauswahl