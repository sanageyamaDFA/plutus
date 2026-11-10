import { useId } from 'react'
import './Segmentwahl.css'

export function Segmentwahl({ legende, optionen, gewaehlterWert, onAuswahl }) {
    const gruppenName = useId()

    return (
        <fieldset className="segmentwahl">
            <legend className="formularlabel">{legende}</legend>
            <div className="segmentwahl__optionen">
                {optionen.map((option) => (
                    <label key={option.wert} className="segmentwahl__option">
                        <input
                            type="radio"
                            className="visuell-versteckt"
                            name={gruppenName}
                            checked={option.wert === gewaehlterWert}
                            onChange={() => onAuswahl(option.wert)}
                        />
                        {option.label}
                    </label>
                ))}
            </div>
        </fieldset>
    )
}