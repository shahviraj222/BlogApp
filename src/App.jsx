import React,{useState,useEffect} from "react"
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth' 
import {login, logout} from './store/authSlice'
import {Header,Footer} from "./components/index"
import { Outlet } from "react-router-dom"
function App() {
  const [loading,setLoading] = useState(true);
  const dispatch =useDispatch()
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) => {
      //update the state 
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  },[])
  // console.log(import.meta.env.VITE_APPRITE_URL)  Accessing the env using 
  return !loading ? (<div className="text-3xl font-bold underlinennp bg-gray-400">
    <div>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  </div>) : (<div>LogIN</div>)
}

export default App
