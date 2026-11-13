import './Monatsauswahl.css'
import { ChevronLeft, ChevronRight } from "lucide-react";


export function Monatsauswahl({ beschriftung, onZurueck, onWeiter }) {
    return (
        <div className="monatsauswahl">
            <button className="monatsauswahl__pfeil" aria-label="Vorheriger Monat" onClick={onZurueck}>
                <ChevronLeft />
            </button>
            <span className="monatsauswahl__monat" aria-live="polite">
                {beschriftung}
            </span>
            <button className="monatsauswahl__pfeil" aria-label="Nächster Monat" onClick={onWeiter}>
                <ChevronRight />
            </button>
        </div>
    )
}