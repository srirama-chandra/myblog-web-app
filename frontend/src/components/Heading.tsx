import { memo } from "react"

interface HeadingProps{
    label:string
}

export const Heading = memo(({label}:HeadingProps) => {

    return (
        <div className="text-3xl font-bold">
            {label}
        </div>
    )
})