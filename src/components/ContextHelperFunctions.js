import { useRouter } from "next/router";

function fetchUserDetails(token, setUser, router){

    const url =  process.env.NEXT_PUBLIC_BACKEND_ROOT + '/users/profile'
    fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
    .then(response => {
        if(response.status == 401){
            console.log('WELP THIS IS WORKING')
            router.push('/login')
            return
             
        }else{
            return response.json()
        }
    })
    .then(data => {
      setUser({user: data[0], loading: false})
      localStorage.setItem('user',JSON.stringify(data[0]))
    })
    .catch(error => {
        console.error('Error:', error);
        console.log(error)
});
}

function fetchUserInstruments(setInstruments){
    const url = process.env.NEXT_PUBLIC_BACKEND_ROOT + '/api/instruments'
    return fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
    .then(response => response.json())
    .then(data => {
     setInstruments(data.results)
     return true
    })
    .catch(error => {
        console.error('Error loading instruments:', error);
        return false
  });
  }

  function fetchUserDeployments(setDeployments){
    const url = process.env.NEXT_PUBLIC_BACKEND_ROOT + '/api/deployments'
    return fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
    .then(response => response.json())
    .then(data => {
     setDeployments(data)
     console.log(data)
     return true
    })
    .catch(error => {
        console.error('Error loading deployments:', error);
        return false
  });
  }


export function RefreshToken(refreshToken){
    fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + '/auth/token/refresh/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({refresh: refreshToken})
      })
      .then(response => {
        response.json().then(response=>{
            console.log(response)
            const accessCode = response['access']
            console.log(accessCode)
            localStorage.setItem('access_token', accessCode)
        })
      })
      .catch(error => {
        console.log('THERE WAS AN ERROR GETTING THE TOKEN')
      });
  }

export const checkAuthentication = (context, setContext)=>{

    function handleAlerts(alertType, alertSeverity, alertMessage){
        let newContext = context
        newContext[alertType].status = true
        newContext[alertType].type = alertSeverity
        newContext[alertType].message = alertMessage
        console.log(newContext)
        setContext(structuredClone(newContext))
      }

    console.log('Checking login credentials....');
    let accessToken = localStorage.getItem('access_token')
    let refreshToken = localStorage.getItem('refresh_token')

    // take care of undefined tokens
    accessToken = accessToken != 'undefined'?accessToken:null
    refreshToken = refreshToken != 'undefined'?refreshToken:null

    // if both tokens are present, check them
    if(refreshToken && accessToken){
      console.log('ACCESS AND REFRESH TOKENS FOUND')
      const refreshParts = refreshToken.split(".");
      const refreshPayload = JSON.parse(atob(refreshParts[1]));
      const refreshTokenExpirationTime = refreshPayload['exp']
      const currentTime = Date.now()/1000;

        if(refreshTokenExpirationTime < currentTime){ 
          // refresh token is expired and user needs to relogin
          console.log('REFRESH TOKEN IS EXPIRED')
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('user')
          handleAlerts('alert', 'info', 'You\'ve been logged out for security purposes. Please login again to continue.')
          return false
        }
        else if(refreshPayload['exp'] > currentTime){
          // refresh token is valid, now checking access_token
          console.log('REFRESH TOKEN IS VALID, CHECKING ACCESS TOKEN...')
          const accessParts = accessToken.split(".");
          const accessPayload = JSON.parse(atob(accessParts[1]));
          const accessTokenExpirationTime = accessPayload['exp']

            if(accessTokenExpirationTime + 12 < currentTime){ 
              // access token is expired, but refresh token is good so we can exchange it for a new one
              // modified -- access token is about to expire, so get a new one
              console.log('ACCESS TOKEN INVALID, GETTING A NEW ONE FROM API')
              RefreshToken(refreshToken)
              return true
            }
            else{
              // user has a good access_token and refresh_token. Good to go. 
              return true
            }
        }
    }
    else{
      // no acces tokens present, user == false
      console.log('NO ACCESS TOKENS FOUND')
      return false
    }
  }

  export const loginOrRefresh = (setLoadingPage, setInstruments, setDeployments, setUser, redirect, router) =>{

    const userHasVisited = localStorage.getItem('user_has_visited')??false
    const accessToken = localStorage.getItem('access_token')??false
    const refreshToken = localStorage.getItem('refresh_token')??false
    const user = {user:JSON.parse(localStorage.getItem('user')), loading:false}

    function redirectUser(router, redirect, setLoadingPage) {        
        // this function is to prevent page flickering after login
        redirect?router.push(redirect, redirect, { shallow: true }):'';
        setTimeout(() => {
          setLoadingPage(false);
        }, 500);
      }

    if(!userHasVisited || !accessToken || !refreshToken){
        setUser({user: false, loading: false})
    }
    else{
        console.log('USER INSIDE LOGIN OR REFRESH')
        console.log(user)
        setUser({user: user.user, loading: false}) // set user from localstorage

        const authenticatedUser = checkAuthentication(setLoadingPage)
        if(authenticatedUser){
            setLoadingPage(true)
            // fetch everything to populate page:
            fetchUserDetails(localStorage.getItem('access_token'), setUser, router)
            fetchUserDeployments(setDeployments).then(()=>fetchUserInstruments(setInstruments)).then(()=>redirectUser(router, redirect, setLoadingPage))
            // fetchUserInstruments(setInstruments).then(()=>redirectUser(router, redirect, setLoadingPage))
        }
        else{
            setLoadingPage(false)
            setUser({user: false, loading: false})
        }
    }    
  }