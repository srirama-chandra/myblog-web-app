import { memo } from "react"
import { Link } from "react-router-dom"

interface FooterProps{
    label:string,
    linkText:string,
    to:string
}

export const Footer = memo(({label,linkText,to}:FooterProps) => {

    return (
        <div className="flex gap-2">
            <div>{label}</div>
            <Link className="underline" to={to}>{linkText}</Link>
        </div>
        
    )
})