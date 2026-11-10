const TAG_UND_MONAT = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long' })

function alsIsoDatum(datum) {
    const jahr = datum.getFullYear()
    const monat = String(datum.getMonth() + 1).padStart(2, '0')
    const tag = String(datum.getDate()).padStart(2, '0')
    return `${jahr}-${monat}-${tag}`
}

function ausIsoDatum(isoDatum) {
    const [jahr, monat, tag] = isoDatum.split('-').map(Number)
    return new Date(jahr, monat - 1, tag)
}

export function heuteAlsIsoDatum() {
    return alsIsoDatum(new Date())
}

export function formatiereTagesueberschrift(isoDatum, heute) {
    if (isoDatum === heute) {
        return 'Heute'
    }

    const gestern = ausIsoDatum(heute)
    gestern.setDate(gestern.getDate() - 1)
    if (isoDatum === alsIsoDatum(gestern)) {
        return 'Gestern'
    }

    return TAG_UND_MONAT.format(ausIsoDatum(isoDatum))
}

const VOLLSTAENDIGES_DATUM = new Intl.DateTimeFormat('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
})

export function formatiereDatum(isoDatum) {
    return VOLLSTAENDIGES_DATUM.format(ausIsoDatum(isoDatum))
}