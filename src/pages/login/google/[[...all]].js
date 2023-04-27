import { useEffect, useState, useContext } from "react"
import { UserLoggedInContext } from '@/components/Context'
import { useRouter } from "next/router"

export default function GoogleLogin(props){

    let [accessToken, setAccessToken] = useState('')
    let [refreshToken, setRefreshToken] = useState('')
    let [userLoggedIn, setUserLoggedIn] = useContext(UserLoggedInContext);


    const router = useRouter()

    if(router.isReady){
        const url = 'http://localhost:8000/dj-rest-auth/google/'

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
            setAccessToken(data['access_token']) // NOTE: this causes a 500 error on the server because it rerenders. 
            setRefreshToken(data['refresh_token'])
            localStorage.setItem("access_token", data['access_token']);
            localStorage.setItem("refresh_token", data['refresh_token']);
            // setUserLoggedIn(true)
            // router.push('/dashboard/overview')
          });
    }

    const testRequest = ()=>{
        console.log("click is working")
        fetch('http://localhost:8000/testrequest', {
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

    const RefreshToken = ()=>{
        console.log("click is working")
        fetch('http://localhost:8000/api/token/refresh/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem("access_token")
              },
            body: JSON.stringify({refresh: refreshToken})
          })
          .then(response => {
            response.json().then(response=>{
                console.log(response);
                const access = response['access']
                localStorage.setItem('access_token', access)
                const parts = response['access'].split(".");
                const header = JSON.parse(atob(parts[0]));
                const payload = JSON.parse(atob(parts[1]));
                console.log(header)
                console.log(payload['exp'])
                const currentTime = Date.now();
                console.log(currentTime/1000)
                // if these two are less than 30 seconds apart, refresh tokens...
            })
          })
          .catch(error => {
          });
    }

    return(
        <div>
            Google Login!
            <button className="greenButton" onClick={()=>{testRequest()}}>Make Request with JWT</button>
            <button className="greyButton" onClick={()=>{RefreshToken()}}>Refresh Access Token</button>

        </div>
    )
}