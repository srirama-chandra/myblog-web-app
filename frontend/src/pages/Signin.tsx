import { signInType } from "@sriramachandra/medium-common";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Quote } from "../components/Quote";



export const Signin = () => {

    const navigate = useNavigate();

    const signInRef = useRef<any>();

    const [signInInput,setSignInInput] = useState<signInType>({username:"",password:""});

    async function signInRequest(e:React.FormEvent)
    {
        e.preventDefault();
        try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signin`,signInInput);
            localStorage.setItem("token",response.data.token);
            navigate('/blogs');
        }
        catch(e:any)
        {
            if (e.response && e.response.data.msg == "Incorrect Password") {
                if (signInRef.current) {
                    signInRef.current.innerText = "Incorrect Password !!";
                }
            } else if (e.response && e.response.data.msg === "User Not Found") {
                if (signInRef.current) {
                    signInRef.current.innerText = "User Not Found !! Please Signup";
                }
            }else if (e.response && e.response.data.msg === "Invalid Input") {
                if (signInRef.current) {
                    signInRef.current.innerText = "Invalid Input";
                }
            } else {
                if (signInRef.current) {
                    signInRef.current.innerText = "Something Went Wrong";
                }
            }
        }
    }

    return (
        <div className="h-screen grid grid-cols-1 lg:grid-cols-2">
            <form onSubmit={signInRequest}>
            <div className="h-screen flex justify-center items-center bg-slate-300 ">
                <div className="flex flex-col gap-4 justify-center items-center rounded-xl px-8 py-8 bg-white">
                    <Heading label="Sign In"></Heading>
                    <InputBox label="Email" placeholder="Enter your email" type="email" onChange={(e) => {setSignInInput({...signInInput,username:e.target.value.toLowerCase().trim()})}}></InputBox>
                    <InputBox label="Password" placeholder="Enter your password" type="password" onChange={(e) => {setSignInInput({...signInInput,password:e.target.value.trim()})}}></InputBox>
                    <Button type="submit" label="Sign In"></Button>
                    <Footer label="Don't have an account? " linkText="Sign up" to="/signup"></Footer>
                    <div className="h-3 w-min-fit text-red-500 font-bold" ref={signInRef}></div>
                </div>
            </div>
            </form>
            <div>
                <Quote></Quote>
            </div>
    
        </div>
        )
}