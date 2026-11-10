export function findeNachId(liste, id) {
    return liste.find((eintrag) => eintrag.id === id)
}

export function ermittleNaechsteId(liste) {
    return Math.max(0, ...liste.map((eintrag) => eintrag.id)) + 1
}