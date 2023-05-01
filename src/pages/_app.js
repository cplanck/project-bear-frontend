import '@/styles/style.css'
import Layout from '../components/Layout'
import React from 'react';
import {ContextWrapper} from '../components/Context'
import { useEffect, useState } from 'react';
import { PageLoaderContext } from '@/components/Context';
import { createContext, useContext, InstrumentContext } from 'react';
import PagePreloader from '@/components/general/PagePreloader'
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  
  // const [loadingPage, setLoadingPage] = useContext(PageLoaderContext)
  // let [loadingPage, setLoadingPage] = useState(true)

  return (
        <ContextWrapper>
            <Layout>
              {/* {loadingPage?<PagePreloader />
              : */}
              <Component {...pageProps}/>
              {/* } */}
            </Layout>
      </ContextWrapper>
  )
}