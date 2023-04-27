import '@/styles/style.css'
import Layout from '../components/Layout'
import React from 'react';
import {ContextWrapper} from '../components/Context'
import { useEffect, useState } from 'react';


export default function App({ Component, pageProps }) {
  
  const [userLoggedIn, setUserLoggedIn] = useState(true)

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('Checking login credentials....');
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ContextWrapper>
      <Layout>
      {userLoggedIn?<Component {...pageProps}/>:<div>You need to log in dude</div>}
      </Layout>
    </ContextWrapper>
  )
}