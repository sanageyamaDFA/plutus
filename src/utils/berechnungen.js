export function berechneGesamtbetrag(eintraege) {
    return eintraege.reduce((summe, eintrag) => summe + eintrag.betrag, 0)
}

export function berechneAnteil(betrag, gesamtbetrag) {
    if (gesamtbetrag == 0) {
        return 0
    }
    return (betrag / gesamtbetrag) * 100
}

export function berechneKategorieSummen(ausgaben, kategorien) {
    return kategorien.map((kategorie) => {
        const ausgabenDerKategorie = ausgaben.filter(
            (ausgabe) => ausgabe.kategorieId === kategorie.id,
        )
        return { ...kategorie, betrag: berechneGesamtbetrag(ausgabenDerKategorie) }
    })
}