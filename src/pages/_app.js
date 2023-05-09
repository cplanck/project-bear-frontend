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
import toast, { Toaster } from 'react-hot-toast';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { border } from '@mui/system';

const defaultQueryFn = async ({ queryKey }) => {
  const data  = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_ROOT}/api${queryKey[0]}`,
    {method: 'GET',  
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  }}
  ).then(res=>res.json())
  return data
}

const queryClient = new QueryClient( {
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
        <ContextWrapper>
            <Layout>
              <Script beforeInteractive={true} src="https://accounts.google.com/gsi/client" />
              <Component {...pageProps}/>
            </Layout>
            <Toaster position="bottom-left "toastOptions={{
              className: '',
              success: {
                style: {
                  backgroundColor: 'rgba(var(--toast-success-background),0.8)',
                  backdropFilter: 'blur(10px)',
                  color: 'var(--dark-theme-text-main)',
                  borderRadius: '4px',
                  fontSize: '0.9em'
                },
              },
              error: {
                style: {
                  backgroundColor: 'rgba(var(--toast-error-background),0.8)',
                  backdropFilter: 'blur(10px)',
                  color: 'var(--dark-theme-text-main)',
                  borderRadius: '4px',
                  fontSize: '0.9em'
                },
              },
              duration: 5000,
            }}/>
        </ContextWrapper>
      </QueryClientProvider>
  )
}