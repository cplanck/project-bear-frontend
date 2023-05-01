import '@/styles/style.css'
import Layout from '../components/Layout'
import React from 'react';
import {ContextWrapper} from '../components/Context'
import { useEffect, useState } from 'react';
import { UserLoggedInContext, PageLoaderContext, UserContext } from '@/components/Context';
import { createContext, useContext, InstrumentContext } from 'react';
import PagePreloader from '@/components/general/PagePreloader'
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {

  let [userLoggedIn, setUserLoggedIn] = useState(false)
  let [user, setUser] = useState({})
  let [loadingPage, setLoadingPage] = useState(true)
  const [instruments, setInstruments] = useContext(InstrumentContext)

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
      console.log(data[0])
      setUser(data[0])
      setUserLoggedIn(true)
      setLoadingPage(false)
      router.push('/dashboard/overview')
    })
    .catch(error => {
        console.error('Error:', error);
});
}

const fetchUserInstruments = ()=>{
  const url = 'http://localhost:8000/api/instruments'
  fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  .then(response => response.json())
  .then(data => {
   console.log(data)
   setInstruments(data)
  })
  .catch(error => {
      console.error('Error:', error);
});
}

  function RefreshToken(refreshToken){
    fetch('http://localhost:8000/auth/token/refresh/', {
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

  const checkAuthentication = ()=>{

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
          handleAlerts('alert', 'warning', 'You\'ve been logged out for security purposes. Please log back in to continue.')
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

  useEffect(() => {

    // do some more checks here to handle when user first logs on
    // when user is logged in and navigates to a protected page
    const authenticatedUser = checkAuthentication()

    if(authenticatedUser){
      console.log('USER LOGGED IN AND THIS RAN')
      fetchUserDetails(localStorage.getItem('access_token'))
      fetchUserInstruments()
    }
    else{
      setUserLoggedIn(false)
      setLoadingPage(false)
    }

    const intervalId = setInterval(() => {
      const authenticatedUser = checkAuthentication()
      if(!authenticatedUser){
        setUserLoggedIn(false)
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  
  return (
    <PageLoaderContext.Provider value={[loadingPage, setLoadingPage]}>
      <UserLoggedInContext.Provider value={[userLoggedIn, setUserLoggedIn]}>
        <UserContext.Provider value={[user, setUser]}>
        <ContextWrapper>
          <Layout>
            {loadingPage?<PagePreloader />
            :
            <Component {...pageProps}/>
            }
          </Layout>
        </ContextWrapper>
        </UserContext.Provider>
      </UserLoggedInContext.Provider>
    </PageLoaderContext.Provider >
  )
}