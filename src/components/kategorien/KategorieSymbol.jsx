import { alsCSSFarbe, findeSymbol } from "../../utils/darstellung";
import './KategorieSymbol.css'

export function KategorieSymbol({ symbol, farbe, groesse = 'normal' }) {
    const Symbol = findeSymbol(symbol)

    return (
        <span className="kategorie-symbol kategorie-symbol--${groesse}" style={{ backgroundColor: alsCSSFarbe(farbe) }}>
            <Symbol />
        </span>)
}