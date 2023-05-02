import Head from "next/head"
import Script from "next/script"
import { useEffect, useContext, useState } from "react"
import { useRouter } from "next/router"
import styles from '@/components/general/General.module.css'
import { UserLoggedInContext, UserContext, PageLoaderContext, InstrumentContext } from '@/components/Context'
import { loginOrRefresh } from '@/components/ContextHelperFunctions'

export default function Login(props){

    const [userLoggedIn, setUserLoggedIn] = useContext(UserLoggedInContext);
    const [user, setUser] = useContext(UserContext);
    const [pageLoading, setPageLoading] = useContext(PageLoaderContext)
    const [instruments, setInstruments] = useContext(InstrumentContext)
    const [userLoggingIn, setUserLoggingIn] = useState(true)

    const handleCredentialResponse = (response)=>{
        setPageLoading(true)
        const url = 'http://localhost:8000/auth/google/login/'
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
              console.log('CREDDDS YO')
              console.log(data)
            localStorage.setItem("refresh_token", data['refresh_token']);
            localStorage.setItem("access_token", data['access_token']);
            const redirect = '/dashboard/overview'
            loginOrRefresh(setPageLoading, setInstruments, setUser, redirect, router)

          }).catch(error => {
            console.log(error);
    })
    }

    const router = useRouter()

    if(typeof window != 'undefined'){
        window.handleCredentialResponse = handleCredentialResponse
    }

    return(
        // <div>
        //     Hello world
        //     <div id='google_btn' style={{width: '400px', height: '400px', border: '2px solid blue'}}></div>
        //     <a href='http://localhost:8000/auth/auth/login'>Google Login</a>
        //    {loginButton}
        // </div>


        <div className={styles.loginWrapper}>
            <div 
                id="g_id_onload"
                data-client_id="320101378878-ekm77duul895gmsah18nuh7cdtlv0feb.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                data-callback="handleCredentialResponse"
                data-auto_select="true"
                data-itp_support="true"
                // data-auto_prompt="false"
                >
            </div>

            <div class="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left">
            </div>
        </div>
    )
}