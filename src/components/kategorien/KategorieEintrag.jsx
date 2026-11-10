import './KategorieEintrag.css'
import { ChevronRight } from "lucide-react"
import { formatiereEuro } from "../../utils/format"
import { KategorieSymbol } from './KategorieSymbol'
import { alsCSSFarbe, findeSymbol } from '../../utils/darstellung'


export function KategorieEintrag({ name, symbol, farbe, betrag, anteil }) {
    return (
        <button className="kategorie-eintrag" style={{ '--kategorie-farbe': alsCSSFarbe(farbe) }}>
            <KategorieSymbol symbol={symbol} farbe={farbe} />
            <span className="kategorie-eintrag__text">
                <span className="kategorie-eintrag__name">{name}</span>
                <span className="kategorie-eintrag__balken">
                    <span className="kategorie-eintrag__fuellung" style={{ width: `${anteil}%` }} />
                </span>
            </span>
            <span className="kategorie-eintrag__werte">
                <span className="kategorie-eintrag__betrag">{formatiereEuro(betrag)}</span>
                <span className="kategorie-eintrag__anteil">{Math.round(anteil)} %</span>
            </span>
            <ChevronRight className="kategorie-eintrag__pfeil" />
        </button>

    )
}