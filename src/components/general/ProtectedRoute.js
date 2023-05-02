import { useEffect, useContext } from "react"
import { UserLoggedInContext, UserContext } from '@/components/Context'
import { useRouter } from "next/router"

export default function ProtectedRoute({ children }){

    const router = useRouter()
    // let [userLoggedIn] = useContext(UserLoggedInContext);

    let [user] = useContext(UserContext);

    // useEffect(()=>{
    //   !userLoggedIn?router.push('/login'):''
    // },[userLoggedIn])
    
    useEffect(()=>{
        console.log(user)
        !localStorage.getItem('access_token')?router.push('/login'):''
    },[user])
  
    return(
        children
    )
  }