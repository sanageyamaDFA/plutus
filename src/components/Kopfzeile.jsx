import './Kopfzeile.css'
import Avatar from './Avatar'
import { ChevronDown, Menu } from 'lucide-react'

export function Kopfzeile({haushaltsName}){

    return(      
    <header className="kopfzeile">
        <button className="kopfzeile__menue" aria_label="Menü öffnen">
            <Menu />
        </button>

        <button className="kopfzeile__haushalt">
            {haushaltsName}<ChevronDown />
        </button>

        <div className="kopfzeile__mitglieder">
            <Avatar initial="L" name="Leandro" farbe="var(--farbe-salbei)"/>
            <Avatar initial="M" name="Max" farbe="var(--farbe-sand)"/>
        </div>
    </header>
    )
}

export default Kopfzeile