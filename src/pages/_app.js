import '@/styles/style.css'
import Layout from '../components/Layout'
import React from 'react';
import {ContextWrapper} from '../components/Context'
import { useEffect, useState } from 'react';


export default function App({ Component, pageProps }) {
  
  return (
    <ContextWrapper>
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    </ContextWrapper>
  )
}