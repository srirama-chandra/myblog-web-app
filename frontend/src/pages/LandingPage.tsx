import { useNavigate } from "react-router-dom"



export const LandingPage = () => {

    const navigate = useNavigate();
    
    return <div className="h-screen mt-32">
                <div className=" bg-white bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')]s">

                        <div className="py-12 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
                            
                            <h1 className="mb-12 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl ">We Believe in Your Ideas.</h1>
                            <p className=" text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 ">Your Story Matters. Join us, and turn your ideas into conversations that can reach across the globe. Let's build a space where knowledge, creativity, and experiences are shared with everyone.</p>
                        
                        </div>

                        <div className="flex justify-center">
                            
                            <button type="button" onClick={() => navigate('/signup')} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center">
                                Get Started
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </button>

                        </div>

                </div>
            </div>

}