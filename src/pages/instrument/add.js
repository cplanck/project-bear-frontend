import React, { useEffect, useState } from "react";
import styles from '@/components/instrument/Instrument.module.css'
import { useContext } from 'react';
import { InstrumentContext } from '@/components/Context'
import AddInstrumentForm from '@/components/forms/AddInstrumentForm';
import ProtectedRoute from '@/components/general/ProtectedRoute';


export default function AddInstrumentPanel() {
                                              
  const [instruments, setInstruments] = useContext(InstrumentContext);

  return (
    <ProtectedRoute>
      <div className={styles.instrumentAddWrapper}>
            <AddInstrumentForm instruments={instruments} setInstruments={setInstruments}/>
      </div>
    </ProtectedRoute>
  )
}