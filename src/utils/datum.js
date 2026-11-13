const TAG_UND_MONAT = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long' })
const MONAT_UND_JAHR = new Intl.DateTimeFormat('de-DE', { month: 'long', year: 'numeric' })
const VOLLSTAENDIGES_DATUM = new Intl.DateTimeFormat('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
})

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

export function ermittleAktuellenMonat() {
    const heute = new Date()
    return { jahr: heute.getFullYear(), monat: heute.getMonth() + 1 }
}

export function verschiebeMonat({ jahr, monat }, schritte) {
    const datum = new Date(jahr, monat - 1 + schritte)
    return { jahr: datum.getFullYear(), monat: datum.getMonth() + 1 }
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


export function formatiereDatum(isoDatum) {
    return VOLLSTAENDIGES_DATUM.format(ausIsoDatum(isoDatum))
}

const MONATSNAME = new Intl.DateTimeFormat('de-DE', { month: 'long' })

export function formatiereMonatsname(jahr, monat) {
    return MONATSNAME.format(new Date(jahr, monat - 1))
}


export function formatiereMonatUndJahr(jahr, monat) {
    return MONAT_UND_JAHR.format(new Date(jahr, monat - 1))
}