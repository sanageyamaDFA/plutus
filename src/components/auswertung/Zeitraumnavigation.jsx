import './Zeitraumnavigation.css'
import { ChevronLeft, ChevronRight } from "lucide-react";


export function Zeitraumnavigation({ beschriftung, onZurueck, onWeiter }) {
    return (
        <div className="zeitraumnavigation">
            <button className="zeitraumnavigation__pfeil" aria-label="Vorheriger Zeitraum" onClick={onZurueck}>
                <ChevronLeft />
            </button>
            <span className="zeitraumnavigation__monat" aria-live="polite">
                {beschriftung}
            </span>
            <button className="zeitraumnavigation__pfeil" aria-label="Nächster Zeitraum" onClick={onWeiter}>
                <ChevronRight />
            </button>
        </div>
    )
}