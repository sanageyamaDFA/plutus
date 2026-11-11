import { useId } from 'react'
import './Eingabefeld.css'

export function Eingabefeld({ label, fehler, zusatz, ...eingabeProps }) {
    const id = useId()
    const fehlerId = `${id}-fehler`
    const klassen = ['eingabefeld__eingabe']
    if (fehler) klassen.push('eingabefeld__eingabe--fehler')
    if (zusatz) klassen.push('eingabefeld__eingabe--mit-zusatz')

    return (
        <div className="eingabefeld">
            <label className="formularlabel" htmlFor={id}>
                {label}
            </label>
            <div className="eingabefeld__rahmen">
                <input
                    id={id}
                    className={klassen.join(' ')}
                    aria-invalid={fehler ? true : undefined}
                    aria-describedby={fehler ? fehlerId : undefined}
                    {...eingabeProps}
                />
                {zusatz && <div className="eingabefeld__zusatz">{zusatz}</div>}
            </div>
            {fehler && (
                <p id={fehlerId} className="eingabefeld__fehler">
                    {fehler}
                </p>
            )}
        </div>
    )
}