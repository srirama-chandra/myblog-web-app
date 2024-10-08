import { useRecoilValueLoadable } from "recoil";
import { AppBar } from "../components/AppBar"
import { BlogCard, BlogCardProps } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { MyBlogsAtom } from "../store/atoms/MyBlogsAtom";
import { NetworkErrorPage } from "./NetworkErrorPage";
import { ForbiddenPage } from "./ForbiddenPage";
import { SomethingWentWrongPage } from "./SomeThingWentWrongPage";

export const MyBlogs = () => {


    try{

        const response = useRecoilValueLoadable(MyBlogsAtom);

        if(response.state==="loading"){
            return <div>
                        <AppBar/>
                        <div className="mt-8 mb-4 grid grid-cols-12">
                            <div className="col-span-2"></div>

                            <div className="col-span-7">
                                <div className="border-b pb-2">
                                    My Blogs
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
        {
                if(response.contents.message=="Network Error")
                {
                    return <NetworkErrorPage/>
                }
                else if(response.contents.message==="Authentication Failed"){
                    return <ForbiddenPage/>
                }
                else{
                    return <SomethingWentWrongPage/>
                }
        }
        else if(response.state==="hasValue")
        {
            const blogData:BlogCardProps[] = response.contents;

            return (
                <div>
                    <AppBar/>
                    <div className="mt-8 mb-4 grid grid-cols-12">
                        <div className="col-span-2"></div>

                        <div className="col-span-7">
                            <div className="border-b pb-2">
                                My Blogs
                            </div>
                            <div className="mt-4">
                                {blogData.length===0 ? <div className="flex justify-center mt-8">No Blogs Posted By You</div> : blogData.map( res => <BlogCard key={res.id} id={res.id} title={res.title} author={res.author} content={res.content} authodId={res.authodId} publishedDate={res.publishedDate}/>)}
                            </div>
                        </div>

                        <div className="col-span-3"></div>
                    </div>
                </div>

            )
        }
    }
    catch(e)
    {
        console.log(e);
        return <SomethingWentWrongPage/>
    }
}