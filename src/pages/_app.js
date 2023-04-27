import '@/styles/style.css'
import Layout from '../components/Layout'
import React from 'react';
import {ContextWrapper} from '../components/Context'
import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { TestContext } from '../components/Context';



export default function App({ Component, pageProps }) {

  let [test, setTest] = useState('context')
  
  return (
    <TestContext.Provider value={[test, setTest]}>
      <ContextWrapper>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </ContextWrapper>
    </TestContext.Provider>
  )
}