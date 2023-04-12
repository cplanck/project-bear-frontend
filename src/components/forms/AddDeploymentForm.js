import styles from '@/components/deployment/Deployment.module.css'
import { Grid } from '@mui/material';
import { useState, useContext, useEffect } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { DeploymentContext, InstrumentContext, DataAvailableContext } from '../../components/Context'
import ColorPicker from '@/components/general/ColorPicker';
import DeploymentTagsEditPanel from '@/components/deployment/DeploymentTagsEditPanel';
import DeploymentTagsEditModal from "@/components/deployment/DeploymentTagEditModal";
import structuredClone from "@ungap/structured-clone";
import { blankDeploymentObject } from '@/components/Context';

import * as dayjs from 'dayjs'
import { Container } from '@mui/system';

export default function DeploymentDetailsEditPanel(props){

    let [updatedDeployment, setUpdatedDeployment] = useState(blankDeploymentObject)
    const [colorPickerOpen, setColorPickerOpen] = useState(false)
    const [currentColor, setCurrentColor] = useState('#fff')
    const [tagModalOpen, setTagModalOpen] = useState(false)

    const [deploymentList, setDeploymentList] = useContext(DeploymentContext)

    function handleUserInput(event, id){
        let temp = structuredClone(updatedDeployment);
        temp[id] = event.target.value
        setUpdatedDeployment(temp)
        console.log(temp)
    }

    function handleDateChange(newDate, id){
        let temp = structuredClone(updatedDeployment);
        temp[id] = String(newDate.$d)
        setUpdatedDeployment(temp)
    }

    const handleInstrumentSelection = (e)=>{
      const temp = updatedDeployment
      temp.instrument_id = e.target.options[e.target.selectedIndex].id
      setUpdatedDeployment(temp)
    }

    useEffect(()=>{
      const deploymentIdArray = props.deployments.map(deployment=>deployment.id)
      const newId = Math.max(...deploymentIdArray) + 1
      const temp = structuredClone(updatedDeployment)
      temp.id = newId
      setUpdatedDeployment(temp)
    },[])

    const handleSubmission = ()=>{
      const newDeploymentList = props.deployments
      newDeploymentList.push(updatedDeployment)
      props.setDeployments(newDeploymentList)
  }

    const instruments = props.instruments.map(instrument=><option key={instrument.id} id={instrument.id}>{instrument.name}</option>)
    instruments.unshift(<option disabled>Select instrument</option>)


    return(
      <Container maxWidth={false} style={{ maxWidth: '900px', paddingTop: '50px' }}>
            <h2 className='removeHeaderMargin'>Add a Deployment</h2>
            <span className='greyText3 smallText'>Add a deployment to add data.</span>
              <hr className='hr my-4'/>
            <Grid container spacing={2}>
                <Grid xs={12} xl={12} item>
                    <span className='inputSelectLabel'>Instrument to deploy<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                    <div className='flexColumn'>
                      <select className={'styledSelect instrumentDeployed'} onChange={e=>handleInstrumentSelection(e)}>
                          {instruments}
                      </select>
                      <span className='inputHelpText'>Select the instrument you want to deploy</span>
                    </div>
                </Grid>
                <Grid xs={12} xl={6} item>
                      <span className='inputSelectLabel'>Deployment name<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                      <div className='flexColumn'>
                        <input 
                        id='description' 
                        className='styledInput small name' 
                        placeholder='Ex. Storrs Pond 2022 #1'
                        onChange={(e)=>{handleUserInput(e, 'name')}}
                        /> 
                        <span className='inputHelpText'>What do you want to call this deployment?</span>
                      </div>
                </Grid>
                <Grid xs={12} xl={4} item>
                    <span className='inputSelectLabel'>Status<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                    <div className='flexColumn'>
                      <select className={'styledSelect status'}>
                          <option value={'add'} >Active</option>
                          <option value={'subtract'} >Inactive</option>
                          <option value={'multiply'} >Retired</option>
                          <option value={'divide'} >Staging</option>
                      </select>
                      {/* <span className='inputHelpText'>Is this deployment ongoing or historical?</span> */}
                    </div>
                    
                </Grid>
               
                <Grid xs={12} xl={12} item>
                    <hr className='hr'></hr>
                    <span className='inputSelectLabel'>Location<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                    <input 
                    id='description' 
                    className='styledInput small location' 
                    placeholder='Ex. Hanover, New Hampshire'
                    onChange={(e)=>{handleUserInput(e, 'location')}}
                    />
                </Grid>
               
                <Grid xs={12} sm={6} xl={4} item >
                    <span className='inputSelectLabel'>Start Date<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                    <DatePicker components={{OpenPickerIcon: CalendarMonthOutlinedIcon}}
                        className={styles.datePicker} onChange={(newDate) => handleDateChange(newDate, 'deployment_start_date')}
                    />
                </Grid>
                <Grid xs={12} sm={6} xl={4} item >
                    <span className='inputSelectLabel'>End Date<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                    <DatePicker components={{OpenPickerIcon: CalendarMonthOutlinedIcon}}
                        className={styles.datePicker} onChange={(newDate) => handleDateChange(newDate, 'deployment_end_date')}
                    />
                </Grid>
                {/* <Grid xs={12} xl={3} item >
                    <span className='inputSelectLabel'>Color</span>
                    {colorPickerOpen?<ColorPicker setCurrentColor={setCurrentColor} setColorPickerOpen={setColorPickerOpen} updatedDeployment={updatedDeployment} setUpdatedDeployment={setUpdatedDeployment} />:<button onClick={() => {setColorPickerOpen(!colorPickerOpen)}} style={{height: '20px', width: '100%', maxWidth: '100px', backgroundColor: currentColor, border: '0px', borderRadius: '6px'}}></button>}
                </Grid> */}
                <Grid xs={12} item>
                  <div className='inputSelectLabel'>Description<span className='greyText3 smallText ms-2'>(optional)</span></div>
                  <textarea 
                  id='description' 
                  className='styledTextArea single small' 
                  placeholder='Observations, notes, or anything you think is important for understanding this deployment'
                  onChange={(e)=>{handleUserInput(e, 'description')}}
                  />
                </Grid>
                <Grid xs={12} item >
                <div className='inputSelectLabel'>Notes<span className='greyText3 smallText ms-2'>(optional)</span></div>
                    <textarea id='description' className='styledTextArea small' onChange={(e)=>{handleUserInput(e, 'notes')}}/>
                </Grid>
                <Grid xs={12} item >
                  <div className='inputSelectLabel'>Tags<span className='greyText3 smallText ms-2'>(optional)</span></div>
                    <div id='tags' className='styledTextArea small' onChange={(e)=>{handleUserInput(e, 'tags')}}>
                    {/* <DeploymentTagsEditPanel setTagModalOpen={setTagModalOpen} updatedDeployment={updatedDeployment}/> */}
                    {tagModalOpen?<DeploymentTagsEditModal updatedDeployment={updatedDeployment} setUpdatedDeployment={setUpdatedDeployment} setTagModalOpen={setTagModalOpen}/>:''}
                    </div>
                </Grid>
            </Grid>
            <div className={'rightButtonGroup'}>
                <button className='textButton' onClick={()=>{props.setIsEditing(false)}}>Cancel</button>
                <button className='greenButton' onClick={() => {handleSubmission()}}>Save Changes</button>
            </div>
        </Container>
    )
}


