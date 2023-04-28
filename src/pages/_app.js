import '@/styles/style.css'
import Layout from '../components/Layout'
import React from 'react';
import {ContextWrapper} from '../components/Context'
import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { UserLoggedInContext, PageLoaderContext } from '@/components/Context';
import PagePreloader from '@/components/general/PagePreloader'
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {

  let [userLoggedIn, setUserLoggedIn] = useState(false)
  let [loadingPage, setLoadingPage] = useState(true)

  const router = useRouter()

  function RefreshToken(refreshToken){
    fetch('http://localhost:8000/auth/token/refresh/', {
        method: 'POST',
        // credentials: 'include',
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
      setUserLoggedIn(true)
      setLoadingPage(false)
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
        <ContextWrapper>
          <Layout>
            {loadingPage?<PagePreloader />
            :
            <Component {...pageProps}/>
            }
          </Layout>
        </ContextWrapper>
      </UserLoggedInContext.Provider>
    </PageLoaderContext.Provider >
  )
}