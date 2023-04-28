import { useEffect, useState, useContext } from "react"
import { UserLoggedInContext, PageLoaderContext } from '@/components/Context'
import PagePreloader from '@/components/general/PagePreloader'
import { useRouter } from "next/router"

export default function GoogleLogin(props){

    let [userLoggedIn, setUserLoggedIn] = useContext(UserLoggedInContext);
    let [loadingPage, setLoadingPage] = useContext(PageLoaderContext);


    let [userLoggingIn, setUserLoggingIn] = useState(true)

    const router = useRouter()

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
            setUserLoggingIn(false)
          });
    }

    useEffect(()=>{
        setUserLoggedIn(true)
        setLoadingPage(false)
        router.push('/dashboard/overview')
    },[userLoggingIn])

    const testRequest = ()=>{
        console.log("click is working")
        fetch('http://localhost:8000/auth/testrequest', {
            method: 'GET',
            credentials: 'include',
            headers: {

                'Authorization': 'Bearer ' + localStorage.getItem("access_token")
              }
          })
          .then(response => {
            response.json().then(response=>console.log(response))
          })
          .catch(error => {
          });
    }

    return(
       <PagePreloader/>
    )
}