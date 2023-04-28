import { useEffect } from 'react'
import React, { useState } from "react";
import Overview from '@/components/dashboard/Overview';
import Deployments from '@/components/dashboard/Deployments';
import Instruments from '@/components/dashboard/Instruments';
import DashboardTabs from '@/components/dashboard/DashboardTabs'
import { Container } from '@mui/system';
import { useRouter } from 'next/router'
import styles from '@/components/instrument/Instrument.module.css'
import { useContext } from 'react';
import { InstrumentContext, DeploymentContext, DataAvailableContext, UserLoggedInContext } from '@/components/Context'
import { maxWidth } from '@mui/system';
import SideNav from '@/components/instrument/SideNav';
import ProtectedRoute from '@/components/general/ProtectedRoute';


export default function Dashboard(props) {

  let [instruments, setInstruments] = useContext(InstrumentContext);
  let [userLoggedIn, setUserLoggedIn] = useContext(UserLoggedInContext);
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
    <ProtectedRoute>
    <div className={styles.instrumentContainer}>
      <SideNav/>
      <div className={styles.mainPanel} style={{border: '0px solid blue', width: '100%'}}>
        <DashboardTabs page={page} updatePage={updatePage} userOverview={userOverview} className={'hideOnSmall'}/>
        <Container className={styles.mainPageContainer} maxWidth={false} style={{maxWidth: '1800px'}}>
            {activePage}
        </Container>
      </div>
    </div>
    </ProtectedRoute>
  )
}
