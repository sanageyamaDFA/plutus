import './Kopfzeile.css'
import { Avatar } from '../ui/Avatar'
import { ChevronDown, Menu } from 'lucide-react'

export function Kopfzeile({ haushaltsName, mitglieder }) {

    return (
        <header className="kopfzeile">
            <button className="kopfzeile__menue" aria_label="Menü öffnen">
                <Menu />
            </button>

            <button className="kopfzeile__haushalt">
                {haushaltsName}<ChevronDown />
            </button>

            <div className="kopfzeile__mitglieder">
                {mitglieder.map((mitglied) => (
                    <Avatar
                        key={mitglied.id}
                        initial={mitglied.initial}
                        name={mitglied.name}
                        farbe={mitglied.farbe}
                    />
                ))}
            </div>
        </header>
    )
}