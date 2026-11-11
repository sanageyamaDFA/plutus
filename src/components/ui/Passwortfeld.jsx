import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Eingabefeld } from './Eingabefeld'
import './Passwortfeld.css'

export function Passwortfeld(props) {
    const [istSichtbar, setIstSichtbar] = useState(false)

    const umschalter = (
        <button
            type="button"
            className="passwortfeld__umschalter"
            aria-label={istSichtbar ? 'Passwort verbergen' : 'Passwort anzeigen'}
            aria-pressed={istSichtbar}
            onClick={() => setIstSichtbar((bisher) => !bisher)}
        >
            {istSichtbar ? <EyeOff /> : <Eye />}
        </button>
    )

    return <Eingabefeld {...props} type={istSichtbar ? 'text' : 'password'} zusatz={umschalter} />
}