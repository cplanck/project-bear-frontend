import EditInstrumentForm from "@/components/forms/EditInstrumentForm"
import React, { useEffect, useState } from "react";
import styles from '@/components/instrument/Instrument.module.css'
import { useContext } from 'react';
import { InstrumentContext, UserLoggedInContext } from '@/components/Context'
import ProtectedRoute from '@/components/general/ProtectedRoute';
import { useRouter } from 'next/router'

export default function EditInstrument(){

    const [instruments, setInstruments] = useContext(InstrumentContext);
    const [instrumentToEdit, setInstrumentToEdit] = useState()

    const router = useRouter()

    useEffect(()=>{
        setInstrumentToEdit(instruments.filter(item=>item.id==router.query.id)[0])

      },[router.query.id])
    
    return(
      <ProtectedRoute>
        <div className={styles.instrumentAddWrapper}>
          <EditInstrumentForm instrumentToEdit={instrumentToEdit} setInstrumentToEdit={setInstrumentToEdit} instruments={instruments} setInstruments={setInstruments}/>
        </div>
      </ProtectedRoute>
    )
}