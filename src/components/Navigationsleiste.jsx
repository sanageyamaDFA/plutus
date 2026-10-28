import './Navigationsleiste.css'
export function Navigationsleiste({initial, name, farbe}){
    return (
    <nav className="navigationsleiste" aria-label="Hauptnavigation">
      <button className="navigationsleiste__eintrag navigationsleiste__eintrag--aktiv" aria-current="page">
        <House /><span>Übersicht</span>
      </button>
      <button className="navigationsleiste__eintrag"><Receipt /><span>Ausgaben</span></button>
      <button className="navigationsleiste__plus" aria-label="Neue Ausgabe hinzufügen"><Plus /></button>
      <button className="navigationsleiste__eintrag"><ChartNoAxesColumn /><span>Statistik</span></button>
      <button className="navigationsleiste__eintrag"><Users /><span>Haushalt</span></button>
    </nav>
    )
}

export default Navigationsleiste