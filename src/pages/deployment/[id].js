import AlertContext from '@/components/Context'
import { useContext, useEffect } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { useState } from "react";
import DeploymentDetails from '@/components/deployment/DeploymentDetails';
import SideNav from '@/components/instrument/SideNav';
import { useRouter } from 'next/router'
import InstrumentAvatar from '@/components/instrument/InstrumentAvatar';
import { DeploymentContext, InstrumentContext } from '@/components/Context'
import ProtectedRoute from '@/components/general/ProtectedRoute';
import styles from '@/components/instrument/Instrument.module.css'

function InstrumentHeading(props){

    let instrumentState
    console.log(props)
    if(props.instrument.status == 'active'){
      instrumentState = <div>Deployed</div>
    }

    return(
      <div className={styles.instrumentHeadingWrapper}>
        <div className={styles.instrumentAvatarGroup}>
          <InstrumentAvatar url={props.instrument.avatar}/>
            <div className={styles.instrumentHeadingAvatarWrapper}>
            <div className={[styles.instrumentTitle, 'mx-3'].join(' ')}>
              <h2 className={'removeHeaderMargin'}>{props.instrument.name}</h2>
            </div>
          </div>
        </div>
        <span className={'greenIndicatorOutline showOnSmall my-3'}>{instrumentState}</span>
        <div className={styles.deployButtonGroup}>
        </div>
      </div>
    )
  }

export default function Dashboard(props) {

const [deploymentList, setDeploymentList] = useContext(DeploymentContext)
const [instrumentList, setInstrumentList] = useContext(InstrumentContext)

const router = useRouter()
let pageId = router.query.id

// useEffect(()=>{
//     if(router.isReady){
//     };
// }, [router.isReady]);

console.log(deploymentList)
const deployment = deploymentList.filter((deployment)=>deployment['id'] == pageId)[0]
const instrument = instrumentList.filter((instrument)=>instrument['id'] == deployment['instrument_id'])[0]

return (
  <ProtectedRoute>
    <div className={styles.instrumentContainer}>
        <SideNav/>
        <div className={styles.mainPanel}>
        <Container maxWidth={false} sx={{ maxWidth: '1800px'}}>
            <div>
            <InstrumentHeading instrument={instrument} instrumentId={pageId}/>
            </div>
            <div style={{border: '0px solid blue', height: '100vh'}}>
            <div className='activePage'><DeploymentDetails deployment={deployment} instrument={instrument} deploymentList={deploymentList} setDeploymentList={setDeploymentList}/></div>
            </div>
        </Container>
        </div>
    </div>
  </ProtectedRoute>
)
}