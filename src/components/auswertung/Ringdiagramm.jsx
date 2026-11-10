import './Ringdiagramm.css'
import { formatiereEuro } from '../../utils/format'
import { berechneAnteil, berechneGesamtbetrag } from '../../utils/berechnungen'
import { alsCSSFarbe } from '../../utils/darstellung'

const MITTE = 100
const RADIUS = 88
const STRICHSTAERKE = 12
const UMFANG = 2 * Math.PI * RADIUS
const LUECKE = 4

function berechneSegmente(eintraege) {
  const gesamtbetrag = berechneGesamtbetrag(eintraege)
  const segmente = []
  let start = 0

  for (const eintrag of eintraege) {
    const laenge = (berechneAnteil(eintrag.betrag, gesamtbetrag) / 100) * UMFANG
    segmente.push({ id: eintrag.id, farbe: eintrag.farbe, start, laenge })
    start += laenge
  }

  return segmente
}

function RingSegment({ farbe, start, laenge }) {
  const sichtbareLaenge = Math.max(laenge - LUECKE, 0)

  return (
    <circle
      cx={MITTE}
      cy={MITTE}
      r={RADIUS}
      fill="none"
      strokeWidth={STRICHSTAERKE}
      strokeDasharray={`${sichtbareLaenge} ${UMFANG}`}
      strokeDashoffset={-(start + LUECKE / 2)}
      style={{ stroke: alsCSSFarbe(farbe) }}
    />
  )
}

export function Ringdiagramm({ eintraege, beschriftung }) {
  const gesamtbetrag = berechneGesamtbetrag(eintraege)
  const segmente = berechneSegmente(eintraege)
  const istLeer = gesamtbetrag === 0

  return (
    <div className="ringdiagramm">
      <svg className="ringdiagramm__grafik" viewBox="0 0 200 200" aria-hidden="true">
        {istLeer && (
          <circle
            cx={MITTE}
            cy={MITTE}
            r={RADIUS}
            fill="none"
            strokeWidth={STRICHSTAERKE}
            style={{ stroke: alsCSSFarbe('beige') }}
          />
        )}
        <g transform={`rotate(-90 ${MITTE} ${MITTE})`}>
          {segmente.map((segment) => (
            <RingSegment
              key={segment.id}
              farbe={segment.farbe}
              start={segment.start}
              laenge={segment.laenge}
            />
          ))}
        </g>
      </svg>

      <div className="ringdiagramm__mitte">
        <p className="ringdiagramm__betrag">{formatiereEuro(gesamtbetrag)}</p>
        <p className="ringdiagramm__beschriftung">{beschriftung}</p>
      </div>
    </div>
  )
}