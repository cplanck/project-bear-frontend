import { useEffect, useState, useContext } from "react"
import { UserLoggedInContext, UserContext, PageLoaderContext } from '@/components/Context'
import PagePreloader from '@/components/general/PagePreloader'
import { useRouter } from "next/router"

export default function GoogleLogin(props){

    let [userLoggedIn, setUserLoggedIn] = useContext(UserLoggedInContext);
    let [user, setUser] = useContext(UserContext);
    let [loadingPage, setLoadingPage] = useContext(PageLoaderContext);
    let [userLoggingIn, setUserLoggingIn] = useState(true)

    const router = useRouter()

    const fetchUserDetails = (token)=>{
        const url = 'http://localhost:8000/users/profile'
        
        fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
        .then(response => response.json())
        .then(data => {
          setUser(data[0])
          setUserLoggedIn(true)
          setLoadingPage(false)
          router.push('/dashboard/overview')
        })
        .catch(error => {
            console.error('Error:', error);
    });
    }

    if(router.isReady){
        const url = 'http://localhost:8000/auth/dj-rest-auth/google/'

        function decodeQueryParam(p) {
            return decodeURIComponent(p.replace(/\+/g, " "));
          }

        let code = decodeQueryParam(router.asPath).split('&')[1].slice(5)

        const codeParams = {
            code : code
        }
        
        fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify(codeParams)
          })
          .then(function(response) {
              console.log(response)
            return response.json();
          }).then(function(data) {
            localStorage.setItem("refresh_token", data['refresh_token']);
            localStorage.setItem("access_token", data['access_token']);
            fetchUserDetails(data['access_token'])
            setUserLoggingIn(false)

          });
    }

    // useEffect(()=>{
    //     setUserLoggedIn(true)
    //     setLoadingPage(false)
    //     router.push('/dashboard/overview')
    // },[user])

    useEffect(()=>{
        setUser({})
    },[])

    return(
       <PagePreloader/>
    )
}