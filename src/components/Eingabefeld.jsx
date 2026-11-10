import { useId } from 'react'
import './Eingabefeld.css'

export function Eingabefeld({ label, fehler, ...eingabeProps }) {
    const id = useId()
    const fehlerId = `${id}-fehler`
    const className = fehler
        ? 'eingabefeld__eingabe eingabefeld__eingabe--fehler'
        : 'eingabefeld__eingabe'

    return (
        <div className="eingabefeld">
            <label className="formularlabel" htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                className={className}
                aria-invalid={fehler ? true : undefined}
                aria-describedby={fehler ? fehlerId : undefined}
                {...eingabeProps}
            />
            {fehler && (
                <p id={fehlerId} className="eingabefeld__fehler">
                    {fehler}
                </p>
            )}
        </div>
    )
}