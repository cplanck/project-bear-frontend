import AlertContext from '../../components/Context'
import { useEffect, useContext } from 'react'
import { DeploymentContext, InstrumentContext, DataAvailableContext } from '../../components/Context'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { useState } from "react";
import InstrumentDetails from '../../components/instrument/InstrumentDetails';
import SideNav from '../../components/instrument/SideNav';
import InstrumentEditModal from '../../components/instrument/InstrumentEditModal';
import { useRouter } from 'next/router'
import styles from '../../components/instrument/Instrument.module.css'
import InstrumentAvatar from '../../components/instrument/InstrumentAvatar';

function InstrumentHeading(props){

  let instrumentState
  if(props.instrument.status == 'deployed'){
    instrumentState =  <div>{instrumentState}</div>
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
                                              
  // let [instrument, setInstrument] = useState({'name': 'SIMB3 2019 #1','id': '1112131415', 'data-model': 'Standard UpTempO', 'description': 'Standard UpTempo Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.', 'notes': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' ,'shortname': 'UpTempO', 'color': '#b80606','avatar': 'https://nyc3.digitaloceanspaces.com/ci-webapp-space/static/simb3/img/simb3.png', 'status': 'deployed','starred': true, 'starred_date': '2023-03-03 17:11:43.776674', 'purchase_date': '2023-05-03 17:11:43.776674', 'deployment_num': '2'})
  
  const [deploymentList, setDeploymentList] = useContext(DeploymentContext)
  const [instrumentList, setInstrumentList] = useContext(InstrumentContext)
  const [dataAvailable, setDataAvailable] = useContext(DataAvailableContext)

  const router = useRouter()
  // const instrumentId = router.asPath.split('/')[2]
  let pageId = router.query.id


  useEffect(()=>{
    if(router.isReady){
      setDataAvailable(true)
    };
}, [router.isReady]);

  // const deployment = dataAvailable?deploymentList.filter((deployment)=>deployment['id'] == pageId)[0]:''
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