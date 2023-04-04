import '@/styles/style.css'
import Layout from '../components/Layout'
import React from 'react';
import {ContextWrapper} from '../components/Context'


export default function App({ Component, pageProps }) {
  
  let userLoggedIn = true

  return (
    <ContextWrapper>
      <Layout>
      {userLoggedIn?<Component {...pageProps}/>:<div>You need to log in dude</div>}
      </Layout>
    </ContextWrapper>
  )
}