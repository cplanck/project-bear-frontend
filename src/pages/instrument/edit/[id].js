import EditInstrumentForm from "@/components/forms/EditInstrumentForm"
import React, { useEffect, useState } from "react";
import styles from '@/components/instrument/Instrument.module.css'
import { useContext } from 'react';
import { InstrumentContext, UserLoggedInContext } from '@/components/Context'
import ProtectedRoute from '@/components/general/ProtectedRoute';
import { useRouter } from 'next/router'


export async function getServerSideProps(context){
  const id = context.query.id;
  const access = context.req.cookies['access_token']
  const response = await fetch(`http://localhost:8000/api/instruments/${id}`, {method: "GET", headers: {'Authorization': 'Bearer ' + access}});
  const data = await response.json();
  return { props: data };
}

function EditInstrument(props){

    const [instruments, setInstruments] = useContext(InstrumentContext);
    const [instrumentToEdit, setInstrumentToEdit] = useState()

    const router = useRouter()
    console.log(props)

    useEffect(()=>{
        setInstrumentToEdit(instruments.filter(item=>item.id==router.query.id)[0])

      },[router.query.id])
    
    return(
      <ProtectedRoute>
        <div className={styles.instrumentAddWrapper}>
          <EditInstrumentForm instrument={props} instrumentToEdit={instrumentToEdit} setInstrumentToEdit={setInstrumentToEdit} instruments={instruments} setInstruments={setInstruments}/>
        </div>
      </ProtectedRoute>
    )
}

export default EditInstrument