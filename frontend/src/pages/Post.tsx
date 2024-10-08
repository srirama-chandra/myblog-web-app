import { useRef, useState } from "react"
import { AppBar } from "../components/AppBar"
import { Heading } from "../components/Heading"
import { TextEditor } from "../components/TextEditor"
import { blogPostType } from "@sriramachandra/medium-common"
import axios from "axios"
import { useNavigate } from "react-router-dom"



export const Post = () => {

    const [postInput,setPostInput] = useState<blogPostType>({title:"",content:""});

    const postRef = useRef<any>();

    const navigate = useNavigate();

    async function publishPost(e:React.FormEvent){
        e.preventDefault();
        try{
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/blog`,postInput,{headers:{
                Authorization: localStorage.getItem("token"),
            }});
            navigate('/blogs');
            navigate(0);
        }
        catch(e:any)
        {
            console.log(e)
            if(e.response && e.response.data.msg==="Authentication Failed")
            {
                if(postRef.current)
                {
                    postRef.current.innerText = "Authentication Failed !! Please Login With Valid Credentials "
                }
                
            }
            else if(e.response && e.response.data.msg==="Invalid Input"){
                if(postRef.current)
                {
                    postRef.current.innerText = "Invalid Input";
                }
            }
            else if(e.message && e.message==="Network Error")
            {
                if(!window.navigator.onLine)
                {
                    postRef.current.innerText="Network Error !! Please Check Your Internet Connection"
                }
                else if(postRef.current)
                {
                    postRef.current.innerText="Backend Down !! Please Try Again Later"
                }
            }
            else{
                if(postRef.current)
                {
                    postRef.current.innerText = "Something Went Wrong !! Please Try Again Later";
                }
            }
        }

    }

    return <div>

        <AppBar/>

        <form onSubmit={publishPost}>
            <div className="mt-6 mx-40">

                <div className="flex justify-center mb-6"><Heading label="Publish A Post"></Heading></div>

                <input type="text" onChange={ (e) => {
                    setPostInput({
                        ...postInput,
                        title:e.target.value
                    })
                }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Title" required/>
                
                <div className="mt-3"> <TextEditor onChange={ (e) => {
                    setPostInput({
                        ...postInput,
                        content:e.target.value
                    })
                }}></TextEditor> </div>

                <div className="flex justify-center">
                    <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-xl text-sm px-20 py-2.5 me-2 mb-2">Publish</button>
                </div>

                <div ref={postRef} className="flex justify-center items-center mt-4 mb-4 h-3 w-min-fit text-red-500 font-semibold">

                </div>

            </div>
        </form>

    </div>
}