const euroFormat = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
})

export function formatiereEuro(betrag) {
    return euroFormat.format(betrag)
}