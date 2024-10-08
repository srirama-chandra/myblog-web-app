import { atom , selector } from "recoil";
import { BlogCardProps } from "../../components/BlogCard";
import axios from "axios";




export const AllBlogsAtom = atom<BlogCardProps[]>({

    key:"AllBlogsAtom",
    default: selector<BlogCardProps[]>({
        key:"AllBlogsSelectorData",
        get: async () =>{
            try{
                
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blog/bulk`,{headers:{Authorization:localStorage.getItem("token") || ""}});
                return response.data.posts;
            }
            catch(e:any)
            {
                throw new Error(e.response?.data?.msg || e.message);
            }
        
        }
    })
})