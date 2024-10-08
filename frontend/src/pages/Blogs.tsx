import { useRecoilValueLoadable } from "recoil";
import { AppBar } from "../components/AppBar"
import { BlogCard, BlogCardProps } from "../components/BlogCard"
import { AllBlogsAtom } from "../store/atoms/AllBlogsAtom";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { ForbiddenPage } from "./ForbiddenPage";
import { NetworkErrorPage } from "./NetworkErrorPage";
import { SomethingWentWrongPage } from "./SomeThingWentWrongPage";

export const Blogs = () => {


    try{

        const response = useRecoilValueLoadable(AllBlogsAtom);

        
        if(response.state==="loading"){
            return <div>
                        <AppBar/>
                        <div className="mt-8 mb-4 grid grid-cols-12">
                            <div className="col-span-2"></div>
    
                            <div className="col-span-7">
                                <div className="border-b pb-2">
                                    Latest
                                </div>
                                <div className="mt-4">
                                    <BlogSkeleton></BlogSkeleton>
                                    <BlogSkeleton></BlogSkeleton>
                                    <BlogSkeleton></BlogSkeleton>
                                    <BlogSkeleton></BlogSkeleton>
                                    
                                </div>
                            </div>
    
                            <div className="col-span-3"></div>
                        </div>
                    </div>
        }
        else if(response.state==="hasError")
        {   if(response.contents.message=="Network Error")
            {
                return <NetworkErrorPage/>
            }
            else if(response.contents.message==="Authentication Failed"){
                return <ForbiddenPage></ForbiddenPage>
            }
            else{
                return <SomethingWentWrongPage/>
            }
        }
        else if(response.state==="hasValue"){
    
            const blogData:BlogCardProps[] = response.contents;

            return (
                <div>
                    
                    <AppBar/>
                    <div className="mt-8 mb-4 grid grid-cols-12">
                        <div className="col-span-1 lg:col-span-2"></div>
    
                        <div className="col-span-10 lg:col-span-7">
                            <div className="border-b pb-2">
                                Latest
                            </div>
                            <div className="mt-4">
                                
                                { blogData.length === 0 ? <div className="flex justify-center mt-8"> No Blogs Found</div> : blogData.map ( res => <BlogCard key={res.id} id={res.id} title={res.title} author={res.author} content={res.content} authodId={res.authodId} publishedDate={res.publishedDate}/>)}

                            </div>
                        </div>
    
                        <div className="col-span-1 lg:col-span-3"></div>
                    </div>
    
                </div>
            )
        }

    }
    catch(e:any)
    {
        return <SomethingWentWrongPage/>
    }

    
}