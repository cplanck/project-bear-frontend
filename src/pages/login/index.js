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

export default function Login(props){

    const [user, setUser] = useContext(UserContext);
    const [pageLoading, setPageLoading] = useContext(PageLoaderContext)
    const [instruments, setInstruments] = useContext(InstrumentContext)
    const [deployments, setDeployments] = useContext(DeploymentContext)
    const [context, setContext] = useContext(AppContext)
    const [loggingIn, setLoggingIn] = useState(false)

    const router = useRouter()
    const googleButton = useRef(null);

    function handleAlerts(alertType, alertSeverity, alertMessage){
        setContext(structuredClone(context.alert.status=false))
        let newContext = context
        newContext[alertType].status = true
        newContext[alertType].type = alertSeverity
        newContext[alertType].message = alertMessage
        setContext(structuredClone(newContext))
      }

    const handleCredentialResponse = (response)=>{
        setPageLoading(true)
        setLoggingIn(true)
        const url = process.env.NEXT_PUBLIC_BACKEND_ROOT + '/auth/google/login/'
        fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify(response.credential)
          })
          .then(function(response) {
            return response.json();
          }).then(data=>{
            localStorage.setItem("refresh_token", data['refresh_token']);
            localStorage.setItem("access_token", data['access_token']);
            localStorage.setItem("user_has_visited", true)
            const redirect = '/dashboard/overview'
            loginOrRefresh(setPageLoading, setInstruments, setDeployments, setUser, redirect, router) //.then(()=>handleAlerts('snackbar', 'success', 'Welcome back, ' + data.first_name + '!'))
        
          }).catch(error => {
            console.log(error);
    })
    }

    if(typeof window != 'undefined'){
        window.handleCredentialResponse = handleCredentialResponse
    }


    useEffect(() => {
        if (googleButton.current) {
          window.google?.accounts.id.initialize({
            client_id: '320101378878-ekm77duul895gmsah18nuh7cdtlv0feb.apps.googleusercontent.com',
            callback: handleCredentialResponse
          });
          window.google?.accounts.id.renderButton(googleButton.current, {
            type: "standard",
            shape: "pill",
            theme: 'filled_black'
          });
        }
        window.google?.accounts.id.prompt()
      }, [googleButton.current]);

    return(
        loggingIn?
        <PagePreloader/>
        :
        <div className={styles.loginWrapper}>
            <Image src={logo} width={50} height={50}/>
            <h2>Sign in to BitBear</h2>
            <div className={[styles.loginForm, 'modalBody'].join(' ')}>
                <div className={styles.googleButton} ref={googleButton} ></div>
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