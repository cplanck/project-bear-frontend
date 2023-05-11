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
import { useQuery } from '@tanstack/react-query'


function InstrumentHeading(props){

  console.log(props.instrument)
    return(
      <div className={styles.instrumentHeadingWrapper}>
        <div className={styles.instrumentAvatarGroup}>
          <InstrumentAvatar url={props.instrument?.avatar}/>
            <div className={styles.instrumentHeadingAvatarWrapper}>
            <div className={[styles.instrumentTitle, 'mx-3'].join(' ')}>
              <h2 className={'removeHeaderMargin'}>{props.instrument?.name}</h2>
            </div>
          </div>
        </div>
        {/* <span className={'greenIndicatorOutline showOnSmall my-3'}>{instrumentState}</span> */}
        <div className={styles.deployButtonGroup}>
        </div>
      </div>
    )
  }

export default function Deployment(props) {

let { isLoading: deploymentsLoading, error: deploymentError, data: deploymentList } = useQuery({ queryKey: ['/deployments'] })
let { isLoading: instrumentsLoading, error: instrumentError, data: instrumentList } = useQuery({ queryKey: ['/instruments'] })

deploymentList = deploymentList?.results
instrumentList = instrumentList?.results

const router = useRouter()
let pageId = router.query.id

const deployment = deploymentList?.filter((deployment)=>deployment['id'] == pageId)[0]
console.log(deploymentList)
console.log(deployment)

const instrument = instrumentList?.filter((instrument)=>instrument['id'] == deployment?.instrument.id)[0]
console.log(instrumentList)
console.log(instrument)

return (
  <ProtectedRoute>
    <div className={styles.instrumentContainer}>
        <SideNav/>
        <div className={styles.mainPanel}>
        <Container maxWidth={false} sx={{ maxWidth: '1800px'}}>
          {!instrumentsLoading && !deploymentsLoading?
            <div>
              <InstrumentHeading instrument={instrument} instrumentId={pageId}/>
              <div style={{border: '0px solid blue', height: '100vh'}}>
                <div className='activePage'><DeploymentDetails deployment={deployment} instrument={instrument} deploymentList={deploymentList} setDeploymentList={'setDeploymentList'}/></div>
              </div>
            </div>
            :
            <>Loading</>
            }
        </Container>
        </div>
    </div>
  </ProtectedRoute>
)
}