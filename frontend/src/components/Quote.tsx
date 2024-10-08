import React from "react"

export const Quote = React.memo(() => {
    
    return (
        <div className=" h-screen bg-slate-200 flex flex-col justify-center items-center gap-4">

            <div className="px-8">
                <div className="text-3xl font-bold">"The customer service I recieved was exceptional. The support team went above and beyond to address my concerns."</div>
            </div>

            <div className="w-full px-8">
                <div className="text-xl font-semibold">
                    Jules Winnfield
                </div>
                <div className="font-light text-md text-slate-400">
                    CEO, Acme Inc
                </div>
            </div>
            
        </div>
    )
})