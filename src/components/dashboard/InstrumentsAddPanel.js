import dbstyles from './Dashboard.module.css'
import { Grid } from "@mui/material"
import { useState } from "react";
import ColorPicker2 from '../general/ColorPicker2';

export default function InstrumentsAddPanel(props){

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
            <button className="textButton" onClick={()=>{props.setIsEditing(false)}}>Cancel</button>
        </div>
    )
}