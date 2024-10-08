import { Link } from "react-router-dom"


export const ProfileComponent = () => {

    return <div className="absolute top-8 right-3 bg-white shadow-lg rounded-lg w-36 flex flex-col items-center">
        
        <Link className="w-full hover:bg-gray-300 hover:text-black rounded-lg flex justify-center py-2" to={'/myblogs'}>My Blogs</Link>
        <Link className="w-full hover:bg-gray-300 hover:text-black rounded-lg flex justify-center py-2" to={'/logout'}>Logout</Link>

    </div>
}