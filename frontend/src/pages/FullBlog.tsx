import { AppBar } from "../components/AppBar"
import { Heading } from "../components/Heading"
import { useParams } from "react-router-dom"
import { BlogCardProps } from "../components/BlogCard"
import { useRecoilValueLoadable } from "recoil"
import { BlogWithIdAtomFamily } from "../store/atoms/BlogWithIdAtomFamily"
import { FullBlogSkeleton } from "../components/FullBlogSkeleton"
import { ForbiddenPage } from "./ForbiddenPage"
import { SomethingWentWrongPage } from "./SomeThingWentWrongPage"

export const FullBlog = () => {

    const { id } =  useParams<{id:string}>();

    const response = useRecoilValueLoadable<BlogCardProps>(BlogWithIdAtomFamily(Number(id)));

    if(response.state==="loading"){
        return <FullBlogSkeleton/>
    }
    else if(response.state==="hasError")
    {
        if(response.contents.message=="Network Error")
        {
            return <div>Network Error !! Please Check Your Internet Connection</div>
        }
        else if(response.contents.message==="Authentication Failed"){
            return <ForbiddenPage/>
        }
        else{
            return <SomethingWentWrongPage/>
        }
    }
    else if(response.state==="hasValue"){
        
        const fullBlogData = response.contents;

        return <div className="mb-6">

            <AppBar/>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12">

                <div className="ml-14 col-span-8 mr-10">
                    <div className="border-b pb-2">
                        <Heading label={fullBlogData.title}></Heading>
                    </div>
                    <div className="mt-4">
                        {fullBlogData.content.split('\n\n').map((data:string,index:number) => <div key={index}>{data}<br/><br/></div>)}
                    </div>
                </div>

                <div className="col-span-4 max-h-fit mt-12 ml-16 border mr-14 py-6 cursor-pointer rounded-xl ">

                    <div className="flex justify-center font-semibold">Author</div>

                    <div className="mt-4 flex justify-center">
                        <div className="flex justify-center items-center font-semibold bg-slate-200 rounded-full w-12 h-12 text-md py-1 col-span-2 ">
                            { fullBlogData.author.name.charAt(0).toUpperCase() }
                        </div>
                    </div>

                    <div className="mt-2 text-sm text-slate-500 flex flex-col justify-center gap-2">
                            
                            <div className="flex justify-center">
                                <div className="text-green-600 font-semibold">{fullBlogData.author.name}</div>
                            </div>

                            <div className="flex justify-center px-4 text-xs font-normal">
                                <div>
                                    Random catch phrase about the author's ability to grab the user's attention
                                </div>
                            </div>

                    </div>

                </div>

            </div>

                        
        </div>
    }
}