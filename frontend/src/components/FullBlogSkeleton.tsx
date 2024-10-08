import { AppBar } from "./AppBar"

export const FullBlogSkeleton = () =>{

    return <div>
        
        <AppBar/>

        <div className="mt-8 grid grid-cols-12">

            <div className="ml-14 col-span-8">
                <div className="border-b pb-2">
                    <div className="h-5 bg-gray-200 rounded-xl min-w-full mb-2"></div>
                </div>
                <div className="mt-4">
                    <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-3"></div>
                    <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-3"></div>
                    <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-3"></div>
                    <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-3"></div>
                    <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-3"></div>
                    <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-3"></div>                    
                    <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-3"></div>
                    <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-3"></div>
                    <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-3"></div>
                    <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-3"></div>
                    <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-3"></div>
                    <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-3"></div>
                    <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-3"></div>
                    <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-3"></div>
                    <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-3"></div>
                    <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-3"></div>
                    <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-3"></div>
                    <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-3"></div>
                    <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-3"></div>
                    <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-3"></div>
                </div>
            </div>

            <div className="col-span-4 max-h-fit mt-12 ml-16 border mr-14 py-6 cursor-pointer rounded-xl ">

                <div className="flex justify-center font-semibold">Author</div>

                <div className="mt-4 flex justify-center">
                    <div className="flex justify-center items-center font-semibold bg-slate-200 rounded-full w-12 h-12 text-md py-1 col-span-2 ">
                        
                    </div>
                </div>

                <div className="mt-2 text-sm text-slate-500 flex flex-col justify-center gap-2">
                        
                        <div className="flex justify-center">
                            <div className="text-green-600 font-semibold"><div className="mt-2 mb-4 h-2.5 bg-gray-200 rounded-xl min-w-16"></div></div>
                        </div>

                        <div className="flex justify-center px-4">
                            <div className="h-2 bg-gray-200 rounded-xl min-w-full mb-4"></div>
                        </div>

                </div>

            </div>

        </div>

    </div>
}