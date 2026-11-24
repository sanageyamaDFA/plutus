import { Button } from '../components/ui/Button'
import { Fehlermeldung } from '../components/ui/Fehlermeldung'
import './Ladefehlerseite.css'

export function Ladefehlerseite({ onErneutVersuchen }) {
    return (
        <div className="ladefehlerseite">
            <Fehlermeldung>
                Deine Daten konnten nicht geladen werden. Der Server ist vermutlich nicht erreichbar.
            </Fehlermeldung>
            <Button onClick={onErneutVersuchen}>Erneut versuchen</Button>
        </div>
    )
}