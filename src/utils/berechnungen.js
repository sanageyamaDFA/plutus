export function berechneGesamtbetrag(eintraege) {
    return eintraege.reduce((summe, eintrag) => summe + eintrag.betrag, 0)
}

export function berechneAnteil(betrag, gesamtbetrag) {
    if (gesamtbetrag == 0) {
        return 0
    }
    return (betrag / gesamtbetrag) * 100
}

export function filtereNachMonat(ausgaben, jahr, monat) {
    return ausgaben.filter((ausgabe) => {
        const [ausgabeJahr, ausgabeMonat] = ausgabe.datum.split('-').map(Number)
        return ausgabeJahr === jahr && ausgabeMonat === monat
    })
}

export function berechneKategorieSummen(ausgaben, kategorien) {
    return kategorien.map((kategorie) => {
        const ausgabenDerKategorie = ausgaben.filter(
            (ausgabe) => ausgabe.kategorieId === kategorie.id,
        )
        return { ...kategorie, betrag: berechneGesamtbetrag(ausgabenDerKategorie) }
    })
}