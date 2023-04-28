import { useEffect, useContext } from "react"
import { UserLoggedInContext } from '@/components/Context'
import { useRouter } from "next/router"

export default function ProtectedRoute({ children }){

    const router = useRouter()
    let [userLoggedIn] = useContext(UserLoggedInContext);

    useEffect(()=>{
      !userLoggedIn?router.push('/login'):''
    },[userLoggedIn])
  
    return(
        userLoggedIn?children:''
    )
  }