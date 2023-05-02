import '@/styles/style.css'
import Layout from '../components/Layout'
import React from 'react';
import {ContextWrapper} from '../components/Context'
import { useEffect, useState } from 'react';
import { PageLoaderContext } from '@/components/Context';
import { createContext, useContext, InstrumentContext } from 'react';
import PagePreloader from '@/components/general/PagePreloader'
import { useRouter } from 'next/router';
import Script from 'next/script';

export default function App({ Component, pageProps }) {

  return (
        <ContextWrapper>
            <Layout>
              <Script beforeInteractive={true} src="https://accounts.google.com/gsi/client" />
              <Component {...pageProps}/>
            </Layout>
      </ContextWrapper>
  )
}