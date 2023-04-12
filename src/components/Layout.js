import TopNav from './general/TopNav'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useContext } from 'react'
import { AppContext } from '../components/Context'
import Container from '@mui/material/Container';
import React, { useState, useEffect } from "react";
import MUITheme from '@/MUITheme'


export default function Layout({ children }) {

const [context, setContext] = useContext(AppContext)

function closeAlert(alertType){
        let newContext = context
        newContext[alertType].status = false
        setContext( JSON.parse(JSON.stringify(newContext)))
}

function UserAlerts(){

    // Alerts will disappear 5 seconds after user movement is detected

    let [context, setContext] = useContext(AppContext)
    let [mouseMovementDetected, setMouseMovementDetected] = useState(false)

    if (typeof window != "undefined") {
        const hasMouseCheck = () => {
            setMouseMovementDetected(true)
            window.removeEventListener('mousemove', hasMouseCheck, false);
        };
        window.addEventListener('mousemove', hasMouseCheck, false);
    }   

    useEffect(() => {
        if(mouseMovementDetected){
            const timeId = setTimeout(() => {
            if(context.alert.status){
                closeAlert('alert'), setMouseMovementDetected(false)
            }
            }, 5000)
            return () => {
            clearTimeout(timeId)
            }
        }
        });

    let activeAlert
    if(context.alert.status){
        if(context.alert.type == 'success'){
            activeAlert = <Alert className='alert success' variant="filled"onClose={() => {closeAlert('alert')}} severity="success">{context.alert.message}</Alert>
        }else if(context.alert.type == 'error'){
            activeAlert = <Alert className='alert error' variant="filled" severity="error" onClose={() => {closeAlert('alert')}}>{context.alert.message}</Alert>
        }
    }
    return(
        <Container className='alertContainer'>
            <div className='alertWrapper'>
                {activeAlert}
            </div>
        </Container>
        )
}


  function UserSnackbar(){

    // Snacks will disappear 5 seconds after user movement is detected

    let [context, setContext] = useContext(AppContext)
    let [mouseMovementDetected, setMouseMovementDetected] = useState(false)

    if (typeof window != "undefined") {
        const hasMouseCheck = () => {
            setMouseMovementDetected(true)
            window.removeEventListener('mousemove', hasMouseCheck, false);
        };
        window.addEventListener('mousemove', hasMouseCheck, false);
    }   

    useEffect(() => {
        if(mouseMovementDetected){
            const timeId = setTimeout(() => {
            if(context.alert.status){
                setContext({alert: {status: false, type: '', message: ''}}), setMouseMovementDetected(false)
            }
            }, 5000)
            return () => {
            clearTimeout(timeId)
            }
        }
        });

    let activeAlert
    if(context.snackbar.status){
        if(context.snackbar.type == 'success'){
            activeAlert = <Snackbar open={open} autoHideDuration={6000} onClose={() => closeAlert('snackbar')}>
                                <Alert variant="filled" onClose={() => closeAlert('snackbar')} severity="success" sx={{ width: '100%' }}>
                                {context.snackbar.message}
                                </Alert>
                            </Snackbar>
        }else if(context.snackbar.type == 'error'){
            activeAlert = <Snackbar open={open} autoHideDuration={6000} onClose={() => closeAlert('snackbar')}>
                                <Alert variant="filled" onClose={() => closeAlert('snackbar')} severity="error" sx={{ width: '100%' }}>
                                {context.snackbar.message}
                                </Alert>
                            </Snackbar>
        }else if(context.snackbar.type == 'warning'){
            activeAlert = <Snackbar open={open} autoHideDuration={6000} onClose={() => closeAlert('snackbar')}>
                                <Alert variant="filled" onClose={() => closeAlert('snackbar')} severity="warning" sx={{ width: '100%' }}>
                                {context.snackbar.message}
                                </Alert>
                            </Snackbar>
        }else if(context.snackbar.type == 'info'){
            activeAlert = <Snackbar open={open} autoHideDuration={6000} onClose={() => closeAlert('snackbar')}>
                                <Alert variant="filled" onClose={() => closeAlert('snackbar')} severity="info" sx={{ width: '100%' }}>
                                {context.snackbar.message}
                                </Alert>
                            </Snackbar>
        }
    }
    return(
        <Container className='alertContainer'>
            <div className='alertWrapper'>
                {activeAlert}
            </div>
        </Container>
        )
}

  return (
    <>
      <TopNav />
      <div className='pageContent'>
      <UserAlerts/>
      <UserSnackbar />
          <main>{children}</main>
      </div>
    </>
  )
}

