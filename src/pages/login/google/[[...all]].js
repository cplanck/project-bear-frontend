import { useEffect } from "react"
import { useRouter } from "next/router"

export default function GoogleLogin(props){

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
            return response.text();
          }).then(function(data) {
            console.log(data); // this will be a string
          });
    }

    const testBackend = ()=>{
        console.log("click is working")
        fetch('http://localhost:8000/test', {
            method: 'GET',
            credentials: 'include'
          })
          .then(response => {
            response.json().then(response=>console.log(response))
          })
          .catch(error => {
            // Handle the error
          });
    }

    return(
        <div>
            Google Login!
            <button className="greenButton" onClick={()=>{testBackend()}}>Test Request!</button>
        </div>
    )
}