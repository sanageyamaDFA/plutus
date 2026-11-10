import { ChevronLeft } from 'lucide-react'
import './ZurueckButton.css'

export function ZurueckButton({ onClick }) {
    return (
        <button className="zurueck-button" onClick={onClick}>
            <ChevronLeft />
            Zurück
        </button>
    )
}