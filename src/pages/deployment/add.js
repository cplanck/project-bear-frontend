import AlertContext from '../../components/Context'
import { useEffect } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { useState } from "react";
import SideNav from '../../components/instrument/SideNav';
import { useRouter } from 'next/router'
import styles from '../../components/instrument/Instrument.module.css'
import dbstyles from '../../components/dashboard/Dashboard.module.css'
import ColorPicker2 from '../../components/general/ColorPicker2';

function InstrumentsAddPanel(props){

    const [instrumentDetails, setInstrumentDetails] = useState({})
    const [colorPickerOpen, setColorPickerOpen] = useState(false)

    function handleUserInput(event, id){
        let temp = structuredClone(instrumentDetails)
        temp[id] = event.target.value
        setInstrumentDetails(temp)
    }

    function handleColorSelection(){
        setColorPickerOpen(!colorPickerOpen)
    }

    return(
        <div>
            <Grid container spacing={2}>
                <Grid xs={12} xl={5} item>
                    <span className='inputSelectLabel'>Instrument Name</span>
                    <input id='description' className='styledInput small' placeholder="Ex. Met Station #2 2023"  onChange={(e)=>{handleUserInput(e, 'name')}}/>
                </Grid>
                <Grid xs={12} xl={3} item >
                    <span className='inputSelectLabel'>Color</span>
                    {colorPickerOpen?<ColorPicker2 colorPickerOpen={colorPickerOpen} setColorPickerOpen={setColorPickerOpen} objectToUpdate={instrumentDetails} setObjectToUpdate={setInstrumentDetails} keyName={'instrument_color'}/>:<button onClick={() => {handleColorSelection()}} className={dbstyles.colorPickerIcon} style={{backgroundColor: instrumentDetails['instrument_color']?instrumentDetails['instrument_color']:'#442A74'}}></button>}
                </Grid>
                <Grid xs={12} xl={12} item>
                    <span className='inputSelectLabel'>Description</span>
                    <textarea id='description' className='styledTextArea small' onChange={(e)=>{handleUserInput(e, 'location')}}/>
                </Grid>
                <Grid xs={12} xl={12} item>
                    <span className='inputSelectLabel'>Notes</span>
                    <textarea id='description' className='styledTextArea small' onChange={(e)=>{handleUserInput(e, 'location')}}/>
                </Grid>
            </Grid>
            <p>Notes</p>
            <p>Data model</p>
            <p>Color</p>
            <p>Avatar</p>
            <p>Iridium SBD</p>
            <p>Save and add a deploymeny</p>
            {/* <button className="textButton" onClick={()=>{props.setIsEditing(false)}}>Cancel</button> */}
        </div>
    )
}


export default function AddInstrumentPanel() {
                                              
  let [instrument, setInstrument] = useState({'name': 'SIMB3 2019 #1','id': '1112131415', 'data-model': 'Standard UpTempO', 'description': 'Standard UpTempo Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.', 'notes': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' ,'shortname': 'UpTempO', 'color': '#b80606','avatar': 'https://nyc3.digitaloceanspaces.com/ci-webapp-space/static/simb3/img/simb3.png', 'status': 'deployed','starred': true, 'starred_date': '2023-03-03 17:11:43.776674', 'purchase_date': '2023-05-03 17:11:43.776674', 'deployment_num': '2'})
  let [page, setPage] = useState('')

  const router = useRouter()
  const instrumentId = router.asPath.split('/')[2]

  return (
    <div className={styles.instrumentContainer}>
      <SideNav/>
      <div className={styles.mainPanel}>
        <Container maxWidth={false} sx={{ maxWidth: '1800px' }}>
        <InstrumentsAddPanel/>
        </Container>
      </div>
    </div>
  )
}