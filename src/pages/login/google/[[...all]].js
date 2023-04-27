import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function GoogleLogin(props){

    let [accessToken, setAccessToken] = useState('')
    let [refreshToken, setRefreshToken] = useState('')

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
          });
    }

    const testRequest = ()=>{
        console.log("click is working")
        fetch('http://localhost:8000/testrequest', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + accessToken
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
            Google Login!
            <button className="greenButton" onClick={()=>{testRequest()}}>Make Request with JWT</button>
        </div>
    )
}