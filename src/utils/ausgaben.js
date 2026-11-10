function vergleicheNeuesteZuerst(a, b) {
    return b.datum.localeCompare(a.datum) || b.id - a.id
}

export function gruppiereNachDatum(ausgaben) {
    const sortiert = ausgaben.toSorted(vergleicheNeuesteZuerst)
    const gruppen = Object.groupBy(sortiert, (ausgabe) => ausgabe.datum)

    return Object.entries(gruppen).map(([datum, ausgabenDesTages]) => ({
        datum,
        ausgaben: ausgabenDesTages,
    }))
}