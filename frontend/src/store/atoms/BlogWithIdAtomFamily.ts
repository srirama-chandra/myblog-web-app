import { atomFamily, selectorFamily } from "recoil";
import { BlogCardProps } from "../../components/BlogCard";
import axios from "axios";



export const BlogWithIdAtomFamily = atomFamily<BlogCardProps,number>({
    key:"BlogWithIdAtomFamily",
    default: selectorFamily<BlogCardProps,number>({
            key:"BlogWithIdSelectorFamily",
            get: (id:number) => async () =>{
                try{
                    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blog/${id}`,{headers:{Authorization:localStorage.getItem("token")}});
                    return response.data.post;
                }
                catch(e:any){
                    throw new Error(e.response?.data?.msg || e.message);
                }
            }
    })
});