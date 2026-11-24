// Platzhalter -- Alle Anfragen gehören zum Beispielhaushalt
export function setzeBeispielhaushalt(req, res, next) {
    req.haushaltId = 'h1'
    next()
}