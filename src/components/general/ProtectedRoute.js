import { useEffect, useContext } from "react"
import { UserLoggedInContext, UserContext, PageLoaderContext } from '@/components/Context'
import { useRouter } from "next/router"
import PagePreloader from '@/components/general/PagePreloader'

export default function ProtectedRoute({ children }){

    const router = useRouter()
    let [user] = useContext(UserContext);
    
    useEffect(()=>{
        !localStorage.getItem('access_token')?router.push('/'):''
    },[user])
  
    return(
       !user.user?<div></div>:children
        
    )
  }