import './Ringdiagramm.css'
import formatiereEuro from "../utils/format"

export function Ringdiagramm({ gesamtbetrag, beschriftung }) {
  return (
    <div className="ringdiagramm">
      <p className="ringdiagramm__betrag">{formatiereEuro(gesamtbetrag)}</p>
      <p className="ringdiagramm__beschriftung">{beschriftung}</p>
    </div>
  )
}

export default Ringdiagramm