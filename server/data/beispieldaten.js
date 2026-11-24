export const haushalte = [{ id: 'h1', name: 'Unser Haushalt' }]

export const mitglieder = [
    { id: 'm1', haushaltId: 'h1', name: 'Leandro', initial: 'L', farbe: 'salbei', email: 'leandro@beispiel.de' },
    { id: 'm2', haushaltId: 'h1', name: 'Max', initial: 'M', farbe: 'sand', email: 'max@beispiel.de' },
]

export const kategorien = [
    { id: 'k1', haushaltId: 'h1', name: 'Lebensmittel', symbol: 'einkaufskorb', farbe: 'salbei' },
    { id: 'k2', haushaltId: 'h1', name: 'Wohnen & Haushalt', symbol: 'haus', farbe: 'sand' },
    { id: 'k3', haushaltId: 'h1', name: 'Freizeit', symbol: 'tasse', farbe: 'altrosa' },
    { id: 'k4', haushaltId: 'h1', name: 'Mobilität', symbol: 'auto', farbe: 'nebelblau' },
    { id: 'k5', haushaltId: 'h1', name: 'Gesundheit', symbol: 'herz', farbe: 'taupe' },
    { id: 'k6', haushaltId: 'h1', name: 'Sonstiges', symbol: 'kreis', farbe: 'hellgrau' },
]

function ausgabe(nummer, beschreibung, betragInCent, kategorieId, datum, bezahltVon, notiz = '') {
    return {
        id: `a${nummer}`,
        haushaltId: 'h1',
        beschreibung,
        betragInCent,
        kategorieId,
        datum,
        bezahltVon,
        notiz,
        erstelltAm: `${datum}T12:${String(nummer).padStart(2, '0')}:00.000Z`,
    }
}

export const ausgaben = [
    ausgabe(1, 'Rewe', 4780, 'k1', '2026-10-12', 'm1', 'Wocheneinkauf'),
    ausgabe(2, 'Kino', 2400, 'k3', '2026-10-12', 'm2'),
    ausgabe(3, 'Tankstelle', 5830, 'k4', '2026-10-11', 'm2'),
    ausgabe(4, 'dm', 1845, 'k2', '2026-10-11', 'm1'),
    ausgabe(5, 'Apotheke', 1290, 'k5', '2026-10-10', 'm1'),
    ausgabe(6, 'Aldi', 3215, 'k1', '2026-10-09', 'm2'),
    ausgabe(7, 'Bäckerei', 860, 'k1', '2026-10-09', 'm1'),
    ausgabe(8, 'Edeka', 6120, 'k1', '2026-10-08', 'm2'),
    ausgabe(9, 'Restaurant', 7505, 'k3', '2026-10-08', 'm1', 'Geburtstagsessen'),
    ausgabe(10, 'Rewe', 5430, 'k1', '2026-10-07', 'm1'),
    ausgabe(11, 'Optiker', 3210, 'k5', '2026-10-07', 'm2'),
    ausgabe(12, 'IKEA', 6490, 'k2', '2026-10-06', 'm1', 'Regal'),
    ausgabe(13, 'Bowling', 2485, 'k3', '2026-10-05', 'm2'),
    ausgabe(14, 'Lidl', 3895, 'k1', '2026-10-05', 'm2'),
    ausgabe(15, 'Parkhaus', 1270, 'k4', '2026-10-04', 'm1'),
    ausgabe(16, 'Wochenmarkt', 2640, 'k1', '2026-10-04', 'm1'),
    ausgabe(17, 'Café', 2500, 'k3', '2026-10-03', 'm1'),
    ausgabe(18, 'Geschenk', 3000, 'k6', '2026-10-03', 'm1', 'Für Oma'),
    ausgabe(19, 'Rewe', 4300, 'k1', '2026-10-02', 'm2'),
    ausgabe(20, 'Internet', 4165, 'k2', '2026-10-02', 'm2'),
    ausgabe(21, 'Fahrradreparatur', 2500, 'k4', '2026-10-01', 'm1'),
    ausgabe(22, 'Stromabschlag', 8500, 'k2', '2026-10-01', 'm1'),
    ausgabe(23, 'Rewe', 3990, 'k1', '2026-09-29', 'm1'),
    ausgabe(24, 'Tankstelle', 6140, 'k4', '2026-09-28', 'm2'),
]