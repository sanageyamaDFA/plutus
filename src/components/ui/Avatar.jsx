import './Avatar.css'
import { alsCSSFarbe } from '../../utils/darstellung'

export function Avatar({ initial, name, farbe }) {
    return (
        <span className="avatar" title={name} style={{ backgroundColor: alsCSSFarbe(farbe) }}>{initial}</span>
    )
}