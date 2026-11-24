import './Ladeanzeige.css'

export function Ladeanzeige({ text }) {
    return (
        <div className="ladeanzeige" role="status">
            <div className="ladeanzeige__ring" aria-hidden="true" />
            <p className="ladeanzeige__text">{text}</p>
        </div>
    )
}