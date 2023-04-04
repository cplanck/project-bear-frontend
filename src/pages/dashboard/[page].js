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
import { maxWidth } from '@mui/system';


export default function Dashboard(props) {

  let [instruments, setInstruments] = useContext(InstrumentContext);
  let [page, setPage] = useState('')

  let userOverview = {'instruments': 3, 'deployments': 13, 'projects': 2, 'data_models': 4}

  const router = useRouter()

  let pageId = router.query.page

  function updatePage(page_id){
    setPage(page_id)
    console.log(page_id)
    let origin = router.asPath.split('/')
    router.push(origin[0] + '/' + origin[1] + '/' + page_id)
  }

  useEffect(() => {
    setPage(router.query.page)
    console.log(router.query.page)
  },[pageId])

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
      {/* <SideNav/> */}
      <div className={styles.mainPanel} style={{border: '0px solid blue', width: '100%'}}>
        <DashboardTabs page={page} updatePage={updatePage} userOverview={userOverview} className={'hideOnSmall'}/>
        <Container className={styles.mainPageContainer} maxWidth={false} style={{maxWidth: '1200px'}}>
            {activePage}
        </Container>
      </div>
    </div>
  )
}