import React, { useEffect, useState } from "react";
import styles from '../../components/instrument/Instrument.module.css'
import { useContext } from 'react';
import { InstrumentContext } from '../../components/Context'
import AddInstrumentForm from '../../components/forms/AddInstrumentForm';


export default function AddInstrumentPanel() {
                                              
  let [userDataModels, setUserDataModels] = useState([{'name': 'Standard with Bruncin String', 'id': '1'},{'name': 'UpTempO Regular', 'id': '2'},{'name': 'UpTempO with Seabird Salinity', 'id': '3'},{'name': 'Custom Data logger', 'id': '4'}])
  const [instruments, setInstruments] = useContext(InstrumentContext);

  return (
    <div className={styles.instrumentAddWrapper}>
          <AddInstrumentForm userDataModels={userDataModels} instruments={instruments} setInstruments={setInstruments}/>
    </div>
  )
}