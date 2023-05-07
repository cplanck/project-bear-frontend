import React, { useEffect, useState } from "react";
import styles from '@/components/instrument/Instrument.module.css'
import { useContext } from 'react';
import { InstrumentContext, DeploymentContext } from '@/components/Context'
import AddDeploymentForm from "@/components/forms/AddDeploymentForm";
import ProtectedRoute from "@/components/general/ProtectedRoute";

export default function AddDeploymentPanel() {
                                              
  const [instruments, setInstruments] = useContext(InstrumentContext);
  const [deployments, setDeployments] = useContext(DeploymentContext);

  return (
    <ProtectedRoute>
      <div className={styles.instrumentAddWrapper}>
            <AddDeploymentForm instruments={instruments} setInstruments={setInstruments} deployments={deployments} setDeployments={setDeployments}/>
      </div>
    </ProtectedRoute>
  )
}