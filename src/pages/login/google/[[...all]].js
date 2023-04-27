import { useEffect, useState, useContext } from "react"
import { UserLoggedInContext } from '@/components/Context'
import { useRouter } from "next/router"

export default function GoogleLogin(props){

    let [userLoggedIn, setUserLoggedIn] = useContext(UserLoggedInContext);

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
            router.push('/dashboard/overview')
            setUserLoggedIn(true)
            localStorage.setItem("access_token", data['access_token']);
            localStorage.setItem("refresh_token", data['refresh_token']);
          });
    }

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
        <div>
            Loading Dashboard....
        </div>
    )
}