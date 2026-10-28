import './Avatar.css'
export function Avatar({initial, name, farbe}){
    return (
        <span className="avatar" title={name} style={{ backgroundColor: farbe }}>{initial}</span>
    )
}

export default Avatar