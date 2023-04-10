// import AlertContext from '../components/Context'
// import { useContext } from 'react'
// import { AppContext } from '../components/Context'
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';


// export default function Index() {

//   // const [context, setContext] = useContext(AppContext)

//   // function handleAlerts(alertType, alertSeverity, alertMessage){
//   //   let newContext = context
//   //   newContext[alertType].status = true
//   //   newContext[alertType].type = alertSeverity
//   //   newContext[alertType].message = alertMessage
//   //   setContext( JSON.parse(JSON.stringify(newContext)))
//   // }

//   return (
//     <Container maxWidth="xl">
//         <div style={{border: '2px solid blue', height: '100vh'}}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={4}>
//               <div style={{border: '2px solid red', height: '50px'}}></div>
//             </Grid>
//             <Grid item xs={12} md={8}>
//               <div style={{border: '2px solid red', height: '50px'}}></div>
//             </Grid>
//         </Grid>
//         </div>
//         <button onClick={() => handleAlerts('alert', 'success', 'Success! Your account was created!')}>Success</button>
//         <button onClick={() => handleAlerts('alert', 'error', 'There was a problem creating your account')}>Error alert</button>
//         <button onClick={() => handleAlerts('snackbar', 'success', 'Profile updated!')}>Success snackbar</button>
//         <button onClick={() => handleAlerts('snackbar', 'error', 'There was an error processing your request')}>Error snackbar</button>
//         <button onClick={() => handleAlerts('snackbar', 'info', 'New products available!')}>Info snackbar</button>
//         <button onClick={() => handleAlerts('snackbar', 'warning', 'You are almost out of storage. Upgrade now!')}>Warning snackbar</button>

//     </Container>
//   )
// }










import { useContext } from 'react'
import { AppContext } from '../components/Context'
import { useEffect } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { useState } from "react";
import InstrumentDetails from '../components/instrument/InstrumentDetails';
import SideNav from '../components/instrument/SideNav';
import InstrumentEditModal from '../components/instrument/InstrumentEditModal';
import { useRouter } from 'next/router'
import styles from '../components/instrument/Instrument.module.css'


function InstrumentAvatar(props){
  return(
    <div className={styles.instrumentAvatarWrapper}>
      <div style={{backgroundImage: `url(${props.url})`}} className={styles.instrumentAvatar}></div>
    </div>
  )
}

function InstrumentHeading(props){

  let instrumentState
  if(props.instrument.status == 'deployed'){
    instrumentState = <div>Deployed</div>
}
  return(
    <div className={styles.instrumentHeadingWrapper}>
      <div className={styles.instrumentAvatarGroup}>
        <InstrumentAvatar url={props.instrument.avatar}/>
          <div className={styles.instrumentHeadingAvatarWrapper}>
          <div className={[styles.instrumentTitle, 'mx-3'].join(' ')}>
            <h2 className={'removeHeaderMargin'}>{props.instrument.name}</h2>
            <span className={'greenIndicatorOutline ms-3 hideOnSmall'}>{instrumentState}</span>
          </div>
            {/* <h4 className={'ms-3 my-2 hideOnSmall'}>{props.instrumentId}</h4> */}
        </div>
      </div>
      <span className={'greenIndicatorOutline showOnSmall my-3'}>{instrumentState}</span>
      <div className={styles.deployButtonGroup}>
        <button className={'greenButton expandOnMedium'}>Deploy</button>
        <button className={'textButton expandOnMedium hideOnMedium'}>Copy</button>
        <button className={'greyButton expandOnMedium showOnMedium'}>Copy</button>
      </div>
    </div>
  )
}

function updatePage(page_id){
  setPage(page_id)
  router.push('/instrument/' + page_id)
}

export default function Dashboard() {
                                              
  let [instrument, setInstrument] = useState({'name': 'SIMB3 2019 #1','id': '1112131415', 'data-model': 'Standard UpTempO', 'description': 'Standard UpTempo Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.', 'notes': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' ,'shortname': 'UpTempO', 'color': '#b80606','avatar': 'https://nyc3.digitaloceanspaces.com/ci-webapp-space/static/simb3/img/simb3.png', 'status': 'deployed','starred': true, 'starred_date': '2023-03-03 17:11:43.776674', 'purchase_date': '2023-05-03 17:11:43.776674', 'deployment_num': '2'})
  let [page, setPage] = useState('')

  const router = useRouter()
  const instrumentId = router.asPath.split('/')[2]

  useEffect(()=>{
    if(router.isReady){
      router.push('/dashboard/overview')
    };
  }, [router.isReady]);


  return (
    <div className={styles.instrumentContainer}>
    </div>
  )
}