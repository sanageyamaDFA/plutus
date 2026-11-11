export function pruefeAnmeldeeingaben(eingaben) {
    const fehler = {}

    if (eingaben.email.trim() === '') {
        fehler.email = 'Gib deine E-Mail-Adresse ein.'
    }
    if (eingaben.passwort === '') {
        fehler.passwort = 'Gib dein Passwort ein.'
    }

    return fehler
}

export function pruefeZugangsdaten(zugaenge, email, passwort) {
    const normalisierteEmail = email.trim().toLowerCase()
    const zugang = zugaenge.find(
        (eintrag) => eintrag.email === normalisierteEmail && eintrag.passwort === passwort,
    )
    return zugang ? zugang.mitgliedId : null
}