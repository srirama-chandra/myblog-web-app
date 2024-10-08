import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Blogs } from "./pages/Blogs"
import { FullBlog } from "./pages/FullBlog"
import { RecoilRoot } from "recoil"
import { MyBlogs } from "./pages/MyBlogs"
import { LandingPage } from "./pages/LandingPage"
import { PageNotFound } from "./pages/PageNotFound"
import { Post } from "./pages/Post"
import { Logout } from "./pages/Logout"


export default function App() {
  return (
    <>
        
          <RecoilRoot>
            
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LandingPage/>}></Route>
                  <Route path="/signin" element={<Signin></Signin>}></Route>
                  <Route path="/signup" element={<Signup></Signup>}></Route>
                  <Route path="/blogs" element={<Blogs></Blogs>}></Route>
                  <Route path="/blog/:id" element={<FullBlog></FullBlog>}></Route>
                  <Route path="/post" element={<Post></Post>}></Route>
                  <Route path="/myblogs" element={<MyBlogs/>}></Route>
                  <Route path="/logout" element={<Logout/>}></Route>
                  <Route path="*" element={<PageNotFound/>}></Route>
                </Routes>
              </BrowserRouter>

          </RecoilRoot>
        
    </>
  )
}