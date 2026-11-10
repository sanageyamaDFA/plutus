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
        <>
            <Kopfzeile haushaltsName={haushalt.name} mitglieder={mitglieder} />
            <main className="mainlayout__inhalt">{children}</main>
            <Navigationsleiste
                aktiveSeite={aktiveSeite}
                onNavigation={onNavigation}
                onNeueAusgabe={onNeueAusgabe}
            />
        </>
    )
}