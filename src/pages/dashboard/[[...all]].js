import AlertContext from '../../components/Context'
import { useEffect } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { useState } from "react";
// import InstrumentDetails from '../../components/instrument/InstrumentDetails';
import DeploymentDetails from '../../components/deployment/DeploymentDetails';
import SideNav from '../../components/instrument/SideNav';
import Overview from '../../components/dashboard/Overview';
import Deployments from '../../components/dashboard/Deployments';
import Instruments from '../../components/dashboard/Instruments';
import DashboardTabs from '../../components/dashboard/DashboardTabs'
import { useRouter } from 'next/router'
import styles from '../../components/instrument/Instrument.module.css'
import { useContext } from 'react';
import { InstrumentContext, DeploymentContext, DataAvailableContext } from '../../components/Context'

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

export default function Dashboard(props) {

  let [instruments, setInstruments] = useContext(InstrumentContext);

  let [page, setPage] = useState('')

  let userOverview = {'instruments': 3, 'deployments': 13, 'projects': 2, 'data_models': 4}

  const router = useRouter()

  function updatePage(page_id){
    setPage(page_id)
    console.log(page_id)
    let origin = router.asPath.split('/')
    router.push(origin[0] + '/' + origin[1] + '/' + page_id)
  }

  useEffect(() => {
    // console.log(location.href.split('/'))
    setPage(router.query.page)
    // router.push(router.query.page)
  })

  let activePage
  if(page == 'overview'){
    activePage = <Overview />
  }
  else if (page == 'deployments'){
    activePage = <Deployments searchBar={true} listAll={true}/>
  }
  else if (page == 'instruments'){
    activePage = <Instruments instruments={instruments}/>
  }
  else if (page == 'projects'){
    activePage = <div>Projects</div>
  }

  return (
    <div className={styles.instrumentContainer}>
      <SideNav/>
      <div className={styles.mainPanel}>
        <DashboardTabs page={page} updatePage={updatePage} userOverview={userOverview} className={'hideOnSmall'}/>
        <Container className={styles.mainPageContainer} maxWidth={false}>
            {activePage}
        </Container>
      </div>
    </div>
  )
}