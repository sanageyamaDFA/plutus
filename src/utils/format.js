const euroFormat = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
})

function formatiereEuro(betrag){
    return euroFormat.format(betrag)
}

export default formatiereEuro