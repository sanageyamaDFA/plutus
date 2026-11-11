import { CircleAlert } from 'lucide-react'
import './Fehlermeldung.css'

export function Fehlermeldung({ children }) {
    return (
        <div className="fehlermeldung" role="alert">
            <CircleAlert />
            <p>{children}</p>
        </div>
    )
}