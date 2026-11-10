import { Car, Circle, Coffee, Heart, House, ShoppingBasket } from 'lucide-react'

const SYMBOLE = {
    einkaufskorb: ShoppingBasket,
    haus: House,
    tasse: Coffee,
    auto: Car,
    herz: Heart,
    kreis: Circle,
}

export function findeSymbol(schluessel) {
    return SYMBOLE[schluessel] ?? Circle
}

export function alsCSSFarbe(paletteName) {
    return `var(--farbe-${paletteName})`
}