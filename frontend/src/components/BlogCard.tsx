import { Link } from "react-router-dom"

export interface BlogCardProps{
    author:{ name : string },
    authodId:number,
    id:number,
    title:string,
    content:string,
    publishedDate:string,
}

export const BlogCard = ({author,id,title,content,publishedDate}:BlogCardProps) => {

    const formattedDate = new Date(publishedDate).toLocaleDateString('en-US', { month: 'long', day: '2-digit' });
    
    return (
        <Link to={`/blog/${id}`}>
            <div className="mt-8 pb-7 border-b cursor-pointer">


                <div className="text-2xl font-bold">{title}</div>


                <div className="mt-2 text-md font-normal text-gray-600">{content.length<150 ? content : content.slice(0,100)+"..."}</div>


                <div className="mt-5 flex gap-3">

                    <div className="flex justify-center items-center bg-slate-200 rounded-full w-9 h-9 py-1 col-span-2 ">
                    {author.name[0].toUpperCase()}
                    </div>

                    <div className="text-sm text-slate-500 flex flex-col justify-center">
                        
                        <div>
                            <div className="text-green-600 font-semibold">{author.name}</div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-normal">
                            <div>{formattedDate}</div>
                            <div className="h-0.5 w-0.5 bg-slate-400 rounded-full"></div>
                            <div>{ Math.ceil( content.length / 100 ) } min read</div>
                        </div>

                    </div>

                </div>
            </div>
        </Link> 
    )
}