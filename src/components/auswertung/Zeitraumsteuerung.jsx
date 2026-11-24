import { heuteAlsIsoDatum } from '../../utils/datum'
import { formatiereZeitraum, verschiebeZeitraum, wechsleZeitraumart } from '../../utils/zeitraum'
import { Zeitraumauswahl } from './Zeitraumauswahl'
import { Zeitraumnavigation } from './Zeitraumnavigation'

export function Zeitraumsteuerung({ zeitraum, onAenderung }) {
    return (
        <div className="zeitraumsteuerung">
            <Zeitraumauswahl
                aktiveArt={zeitraum.art}
                onAuswahl={(art) => onAenderung(wechsleZeitraumart(zeitraum, art, heuteAlsIsoDatum()))}
            />
            <Zeitraumnavigation
                beschriftung={formatiereZeitraum(zeitraum)}
                onZurueck={() => onAenderung(verschiebeZeitraum(zeitraum, -1))}
                onWeiter={() => onAenderung(verschiebeZeitraum(zeitraum, 1))}
            />
        </div>
    )
}