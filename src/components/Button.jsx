import './Button.css'

export function Button({ variante = 'primaer', type = 'button', children, ...weitereProps }) {
    return (
        <button type={type} className={`button button--${variante}`} {...weitereProps}>
            {children}
        </button>
    )
}