import { formatiereEuro } from '../utils/format'
import { KategorieSymbol } from './KategorieSymbol'
import './AusgabeEintrag.css'

export function AusgabeEintrag({
    beschreibung,
    betrag,
    kategorieName,
    symbol,
    farbe,
    personName,
    onClick,
}) {
    return (
        <button className="ausgabe-eintrag" onClick={onClick}>
            <KategorieSymbol symbol={symbol} farbe={farbe} />
            <span className="ausgabe-eintrag__text">
                <span className="ausgabe-eintrag__beschreibung">{beschreibung}</span>
                <span className="ausgabe-eintrag__details">
                    {kategorieName} · {personName}
                </span>
            </span>
            <span className="ausgabe-eintrag__betrag">{formatiereEuro(betrag)}</span>
        </button>
    )
}