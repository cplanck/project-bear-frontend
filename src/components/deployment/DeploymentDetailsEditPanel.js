import styles from './Deployment.module.css'
import { Grid } from '@mui/material';
import { useState, useContext } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { DeploymentContext, InstrumentContext, DataAvailableContext } from '@/components/Context'
import ColorPicker from '../general/ColorPicker';
import DeploymentTagsEditPanel from './DeploymentTagsEditPanel';
import DeploymentTagsModal from "./DeploymentTagModal";
import { AppContext } from '@/components/Context'
import * as dayjs from 'dayjs'

export default function DeploymentDetailsEditPanel(props){

    let [updatedDeployment, setUpdatedDeployment] = useState(structuredClone(props.deployment))
    let [currentDate, setCurrentDate] = useState(new Date())
    const [colorPickerOpen, setColorPickerOpen] = useState(false)
    const [currentColor, setCurrentColor] = useState(props.deployment['instrument_color'])
    const [tagModalOpen, setTagModalOpen] = useState(false)
    const [context, setContext] = useContext(AppContext)


    const [deploymentList, setDeploymentList] = useContext(DeploymentContext)

    function handleUserInput(event, id){
        let temp = JSON.parse(JSON.stringify(updatedDeployment));
        temp[id] = event.target.value
        setUpdatedDeployment(temp)
    }

    function handleDateChange(newDate, id){
        let temp = structuredClone(updatedDeployment);
        temp[id] = String(newDate.$d)
        setUpdatedDeployment(temp)
    }

    function handleSubmission(){
        let updatedDeploymentContext = deploymentList.filter((deployment)=>deployment.id!=updatedDeployment.id)
        updatedDeploymentContext.push(updatedDeployment)
        setDeploymentList(updatedDeploymentContext)
        props.setIsEditing(false)
        handleAlerts('snackbar', 'success', 'Deployment ' + updatedDeployment.name + ' edit successful!')
    }

    function handleAlerts(alertType, alertSeverity, alertMessage){
        setContext(structuredClone(context.alert.status=false))
        let newContext = context
        newContext[alertType].status = true
        newContext[alertType].type = alertSeverity
        newContext[alertType].message = alertMessage
        setContext(structuredClone(newContext))
      }

    return(
        <div>
            <h3>Edit Deployment</h3>
            <Grid container spacing={2}>
                <Grid xs={12} xl={5} item>
                    <span className='inputSelectLabel'>Name</span>
                    <input id='description' className='styledInput small' defaultValue={props.deployment.name} onChange={(e)=>{handleUserInput(e, 'name')}}/>
                </Grid>
                <Grid xs={12} xl={5} item>
                    <span className='inputSelectLabel'>Location</span>
                    <input id='description' className='styledInput small' defaultValue={props.deployment.location} onChange={(e)=>{handleUserInput(e, 'location')}}/>
                </Grid>
                <Grid xs={12} xl={2} item>
                    <span className='inputSelectLabel'>Status</span>
                    <select className={'styledSelect fullWidth'}>
                        <option value={'add'} >Active</option>
                        <option value={'subtract'} >Inactive</option>
                        <option value={'multiply'} >Retired</option>
                        <option value={'divide'} >Staging</option>
                    </select>
                </Grid>
                <Grid xs={12} sm={6} xl={4} item >
                    <span className='inputSelectLabel'>Start Date</span>
                    <DatePicker components={{OpenPickerIcon: CalendarMonthOutlinedIcon}}
                        className={styles.datePicker} defaultValue={dayjs(props.deployment.deployment_start_date)} onChange={(newDate) => handleDateChange(newDate, 'deployment_start_date')}
                    />
                </Grid>
                <Grid xs={12} sm={6} xl={4} item >
                    <span className='inputSelectLabel'>End Date</span>
                    <DatePicker components={{OpenPickerIcon: CalendarMonthOutlinedIcon}}
                        className={styles.datePicker} defaultValue={dayjs(props.deployment.deployment_end_date)} onChange={(newDate) => handleDateChange(newDate, 'deployment_end_date')}
                    />
                </Grid>
                <Grid xs={12} xl={3} item >
                    <span className='inputSelectLabel'>Color</span>
                    {colorPickerOpen?<ColorPicker setCurrentColor={setCurrentColor} setColorPickerOpen={setColorPickerOpen} updatedDeployment={updatedDeployment} setUpdatedDeployment={setUpdatedDeployment} />:<button onClick={() => {setColorPickerOpen(!colorPickerOpen)}} style={{height: '20px', width: '100%', maxWidth: '100px', backgroundColor: currentColor, border: '0px', borderRadius: '6px'}}></button>}
                </Grid>
                <Grid xs={12} item>
                    <span className='inputSelectLabel'>Description</span>
                    <textarea id='description' className='styledTextArea single small' defaultValue={props.deployment.description} onChange={(e)=>{handleUserInput(e, 'description')}}/>
                </Grid>
                <Grid xs={12} item >
                    <span className='inputSelectLabel'>Notes</span>
                    <textarea id='description' className='styledTextArea small' defaultValue={props.deployment.notes} onChange={(e)=>{handleUserInput(e, 'notes')}}/>
                </Grid>
                <Grid xs={12} item >
                    <span className='inputSelectLabel'>Tags</span>
                    <div id='tags' className='styledTextArea small' defaultValue={props.deployment.notes} onChange={(e)=>{handleUserInput(e, 'tags')}}>
                    <DeploymentTagsEditPanel setTagModalOpen={setTagModalOpen} updatedDeployment={updatedDeployment}/>
                    {tagModalOpen?<DeploymentTagsModal deployment={updatedDeployment} setDeployment={setUpdatedDeployment} setTagModalOpen={setTagModalOpen} tagModalOpen={tagModalOpen}/>:''}
                    </div>
                </Grid>
            </Grid>
            <div className={'rightButtonGroup'}>
                <button className='textButton' onClick={()=>{props.setIsEditing(false)}}>Cancel</button>
                <button className='greenButton' onClick={() => {handleSubmission()}}>Save Changes</button>
            </div>
        </div>
    )
}


