import { Kopfzeile } from "./Kopfzeile";
import { Navigationsleiste } from "./Navigationsleiste";
import './Mainlayout.css'

export function Mainlayout({
    haushalt,
    mitglieder,
    aktiveSeite,
    onNavigation,
    onNeueAusgabe,
    children
}) {
    return (
        <div className="mainlayout">
            <div className="mainlayout__kopf">
                <Kopfzeile haushaltsName={haushalt.name} mitglieder={mitglieder} />
            </div>
            <main className="mainlayout__inhalt">{children}</main>
            <div className="mainlayout__navigation">
                <Navigationsleiste
                    aktiveSeite={aktiveSeite}
                    onNavigation={onNavigation}
                    onNeueAusgabe={onNeueAusgabe}
                />
            </div>
        </div>
    )

}