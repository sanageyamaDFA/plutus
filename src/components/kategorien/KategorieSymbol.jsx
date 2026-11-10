import { alsCSSFarbe, findeSymbol } from "../../utils/darstellung";
import './KategorieSymbol.css'

export function KategorieSymbol({ symbol, farbe }) {
    const Symbol = findeSymbol(symbol)

    return (
        <span className="kategorie-symbol" style={{ backgroundColor: alsCSSFarbe(farbe) }}>
            <Symbol />
        </span>)
}