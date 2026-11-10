import { useId } from 'react'
import { KategorieSymbol } from './KategorieSymbol'
import './Kategoriewahl.css'

export function Kategoriewahl({ kategorien, gewaehlteId, onAuswahl }) {
    const gruppenName = useId()

    return (
        <fieldset className="kategoriewahl">
            <legend className="formularlabel">Kategorie</legend>
            <div className="kategoriewahl__raster">
                {kategorien.map((kategorie) => (
                    <label key={kategorie.id} className="kategoriewahl__option">
                        <input
                            type="radio"
                            className="visuell-versteckt"
                            name={gruppenName}
                            checked={kategorie.id === gewaehlteId}
                            onChange={() => onAuswahl(kategorie.id)}
                        />
                        <KategorieSymbol symbol={kategorie.symbol} farbe={kategorie.farbe} />
                        <span className="kategoriewahl__name">{kategorie.name}</span>
                    </label>
                ))}
            </div>
        </fieldset>
    )
}