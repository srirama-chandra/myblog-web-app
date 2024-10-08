import { ChangeEvent } from "react"

interface inputData{
    label:string,
    placeholder:string,
    type:string
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void
}

export const InputBox = ({label,placeholder,type,onChange}:inputData) => {

    return (
        <div className="text-left">
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input type={type} onChange={onChange} className="pr-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder={placeholder} required />
        </div>
    )
}