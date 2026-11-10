const euroFormat = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
})

export function formatiereEuro(betrag) {
    return euroFormat.format(betrag)
}

// Regex-Expression -> Ziffern optional mit Komma oder Punkt sowie 2 Nachkommastellen
const BETRAGSMUSTER = /^\d+([.,]\d{1,2})?$/


export function leseBetrag(text) {
    const bereinigt = text.trim()
    if (!BETRAGSMUSTER.test(bereinigt)) {
        return null
    }
    return Number(bereinigt.replace(',', '.'))
}

export function betragAlsEingabe(betrag) {
    return betrag.toFixed(2).replace('.', ',')
}
