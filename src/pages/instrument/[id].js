import AlertContext from '@/components/Context'
import { useEffect, useContext } from 'react'
import { DeploymentContext, InstrumentContext, DataAvailableContext } from '@/components/Context'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { useState } from "react";
import InstrumentDetails from '@/components/instrument/InstrumentDetails';
import SideNav from '@/components/instrument/SideNav';
import InstrumentEditModal from '@/components/instrument/InstrumentEditModal';
import { useRouter } from 'next/router'
import styles from '@/components/instrument/Instrument.module.css'
import InstrumentAvatar from '@/components/instrument/InstrumentAvatar';
import Link from 'next/link';

function InstrumentHeading(props){

  let instrumentState
  if(props.instrument.status == 'deployed'){
    instrumentState =  <div>{instrumentState}</div>
}
console.log(props)

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
        <Link href={{pathname: '/deployment/add/', query: {instrument: props.instrument?.id}}}><button className={'greenButton expandOnMedium'}>Deploy</button></Link>
      </div>
    </div>
  )
}


export default function Dashboard() {
                                                
  const [deploymentList, setDeploymentList] = useContext(DeploymentContext)
  const [instrumentList, setInstrumentList] = useContext(InstrumentContext)
  const [dataAvailable, setDataAvailable] = useContext(DataAvailableContext)

  const router = useRouter()
  let pageId = router.query.id


  useEffect(()=>{
    if(router.isReady){
      setDataAvailable(true)
    };
}, [router.isReady]);

  const instrument = dataAvailable?instrumentList.filter((instrument)=>instrument['id'] == pageId)[0]:''


  return (
    <div className={styles.instrumentContainer}>
      <SideNav/>
      <div className={styles.mainPanel}>
        <Container maxWidth={false} sx={{ maxWidth: '1800px' }}>
          <div>
            <InstrumentHeading instrument={instrument} />
          </div>
          <div style={{border: 'px solid blue', height: '100vh'}}>
            <div className='activePage'><InstrumentDetails instrument={instrument} setInstrumentList={setInstrumentList}/></div>
            </div>
        </Container>
      </div>
    </div>
  )
}