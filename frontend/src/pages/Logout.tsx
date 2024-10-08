import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VerySmallSpinner } from "../components/Spinners";
import { useResetRecoilState } from "recoil";
import { AllBlogsAtom } from "../store/atoms/AllBlogsAtom";
import { MyBlogsAtom } from "../store/atoms/MyBlogsAtom";



export const Logout = () => {
    
    const navigate = useNavigate();

    const resetAllBlogsAtom = useResetRecoilState(AllBlogsAtom);
    const resetMyBlogsAtom = useResetRecoilState(MyBlogsAtom);

    useEffect(()=>{
        
        resetAllBlogsAtom();
        resetMyBlogsAtom();
        
        localStorage.removeItem("token");
        
        const timeOutId = setTimeout(()=>{navigate('/signin');navigate(0)},3000);

        return () => {
            clearTimeout(timeOutId);
        }

    },[])

    return <div className='h-screen flex justify-center items-center '>
        <div className="border border-gray-400 p-12 text-md font-semibold">
            <div className="flex justify-center">Logout Successful</div>
            <div className="flex justify-center gap-2">
                <VerySmallSpinner/>
                <div>Redirecting To Login Page In 3 Sec</div>
            </div>
        </div>
    </div>
}