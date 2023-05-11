import Head from "next/head"
import Script from "next/script"
import Image from "next/image"
import { useEffect, useContext, useState, useRef } from "react"
import { useRouter } from "next/router"
import styles from '@/components/general/General.module.css'
import { UserLoggedInContext, UserContext, PageLoaderContext, InstrumentContext, DeploymentContext, AppContext } from '@/components/Context'
import PagePreloader from '@/components/general/PagePreloader'
import { loginOrRefresh } from '@/components/ContextHelperFunctions'
import logo from '@/images/bit-bear-logo-dark.png'
import { toast } from 'react-toastify';

export default function Login(props){

    const [user, setUser] = useContext(UserContext);
    const [pageLoading, setPageLoading] = useContext(PageLoaderContext)
    const [instruments, setInstruments] = useContext(InstrumentContext)
    const [deployments, setDeployments] = useContext(DeploymentContext)
    const [context, setContext] = useContext(AppContext)
    const [loggingIn, setLoggingIn] = useState(false)

    const router = useRouter()

    const handleCredentialResponse = (response)=>{
        setPageLoading(true)
        setLoggingIn(true)
        const url = process.env.NEXT_PUBLIC_BACKEND_ROOT + '/auth/google/login/'
        fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", 
            },
            credentials: "include",
            body: JSON.stringify(response.credential)
          })
          .then(function(response) {
            return response.json();
          }).then(data=>{
            console.log(data)
            localStorage.setItem("refresh_token", data['refresh_token']);
            localStorage.setItem("access_token", data['access_token']);
            localStorage.setItem("user_has_visited", true)
            localStorage.setItem('user', JSON.stringify(data['user']))
            const redirect = '/dashboard/overview'
            loginOrRefresh(setPageLoading, setInstruments, setDeployments, setUser, redirect, router)
            // setLoggingIn(false)
        
          }).catch(error => {
            console.log(error);
    })
    }

    if(typeof window != 'undefined'){
        window.handleCredentialResponse = handleCredentialResponse
    }

    return(
        loggingIn?
        <PagePreloader/>
        :
        <div className={styles.loginWrapper}>
            <Image src={logo} width={50} height={50} priority={true}/>
            <h2>Sign in to BitBear</h2>
            <div className={[styles.loginForm, 'modalBody'].join(' ')}>
                <GoogleButton/>
                <p>Or</p>
                <div className="inputWrapper">
                    <span className="inputHelpText boldText">Email</span>
                    <input className="styledInput small" placeholder="email"></input>
                </div>
                <div className="inputHelpText boldText">
                    <span className="inputLabel">Password</span>
                    <input className="styledInput small" placeholder="password"></input>
                </div>
            </div>
        </div>
    )
}


function GoogleButton(){

    useEffect(() => {
        const script = document.createElement('script');
    
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
    
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);
    
      return (
        <div style={{height: '44px'}}>
          <div
            id='g_id_onload'
            data-client_id='320101378878-ekm77duul895gmsah18nuh7cdtlv0feb.apps.googleusercontent.com'
            data-callback="handleCredentialResponse"
            data-auto_select="true"
            data-itp_support="true"
          />
          <div
            className='g_id_signin'
            data-type='standard'
            data-size='large'
            data-theme='filled_black'
            data-text='sign_in_with'
            data-shape='pill'
            data-logo_alignment='center'
          />
        </div>
      );
}