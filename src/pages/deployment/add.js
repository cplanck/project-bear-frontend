import React, { useEffect, useState } from "react";
import styles from '@/components/instrument/Instrument.module.css'
import { useContext } from 'react';
import { InstrumentContext, DeploymentContext } from '@/components/Context'
import AddDeploymentFormRedux from "@/components/forms/AddDeploymentFormRedux";

export default function AddDeploymentPanel() {
                                              
  const [instruments, setInstruments] = useContext(InstrumentContext);
  const [deployments, setDeployments] = useContext(DeploymentContext);

  return (
    <div className={styles.instrumentAddWrapper}>
          <AddDeploymentFormRedux instruments={instruments} setInstruments={setInstruments} deployments={deployments} setDeployments={setDeployments}/>
    </div>
  )
}