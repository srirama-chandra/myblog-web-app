interface buttonInput {
    label:string,
    type: "button" | "submit"
}

export const Button = ({label,type}:buttonInput) => {

    return (
        <div>
            <button type = {type} className="text-white w-full bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-28 py-2.5 me-2 mb-2">{label}</button>
        </div>
    )
}