import styles from '@/components/deployment/Deployment.module.css'
import { Grid } from '@mui/material';
import { useState, useContext, useEffect } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRouter } from 'next/router'
import { AppContext } from '@/components/Context'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { DeploymentContext, InstrumentContext, DataAvailableContext } from '../../components/Context'
import ColorPicker from '@/components/general/ColorPicker';
import DeploymentTagsEditPanel from '@/components/deployment/DeploymentTagsEditPanel';
import DeploymentTagsEditModal from "@/components/deployment/DeploymentTagEditModal";
import structuredClone from "@ungap/structured-clone";
import { blankDeploymentObject } from '@/components/Context';
import Checkbox from '@mui/material/Checkbox';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as dayjs from 'dayjs'
import fr from './FormRestrictions'; 
import { Container } from '@mui/system';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import PublicIcon from '@mui/icons-material/Public';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Radio from '@mui/material/Radio';



export default function DeploymentDetailsEditPanel(props){

    let [updatedDeployment, setUpdatedDeployment] = useState(blankDeploymentObject)
    const [colorPickerOpen, setColorPickerOpen] = useState(false)
    const [currentColor, setCurrentColor] = useState('#fff')
    const [tagModalOpen, setTagModalOpen] = useState(false)
    const [deploymentList, setDeploymentList] = useContext(DeploymentContext)
    const [context, setContext] = useContext(AppContext)

    const router = useRouter()

    function handleAlerts(alertType, alertSeverity, alertMessage){
      setContext(structuredClone(context.alert.status=false))
      let newContext = context
      newContext[alertType].status = true
      newContext[alertType].type = alertSeverity
      newContext[alertType].message = alertMessage
      setContext(structuredClone(newContext))
    }

    function handleUserInput(event, id){
      formik.handleChange(event)
      let temp = structuredClone(updatedDeployment);
      if(id == 'private'){
        temp.privacy = 'private'

      }else if(id == 'public'){
        temp.privacy = 'public'
      }
      else{
        temp[id] = event.target.value
      }
      setUpdatedDeployment(temp)
    }

    function handleDateChange(newDate, id){
      let temp = structuredClone(updatedDeployment);
      temp[id] = dayjs(newDate).format()
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
      router.push('/dashboard/deployments')
      handleAlerts('snackbar', 'success', updatedDeployment.name + ' added!')
    }

    const formik = useFormik({
      initialValues: {
        name: '', 
        location: '',
        description: '',
        notes: ''
      },
      validationSchema: Yup.object({
          name: Yup.string().min(fr.deploymentName.minLength.val, fr.deploymentName.minLength.error).max(fr.deploymentName.maxLength.val, fr.deploymentName.maxLength.error).required('You must specify a deployment name'),
          // location: Yup.string().max(fr.instrumentNotes.maxLength.val, fr.instrumentNotes.maxLength.error),
          // description: Yup.string().max(fr.instrumentSerialNumber.maxLength.val, fr.instrumentSerialNumber.maxLength.error).min(fr.instrumentSerialNumber.minLength.val, fr.instrumentSerialNumber.minLength.error).required('You must specify an serial number for this instrument'),
          // notes: Yup.string().max(fr.instrumentSerialNumber.maxLength.val, fr.instrumentSerialNumber.maxLength.error).min(fr.instrumentSerialNumber.minLength.val, fr.instrumentSerialNumber.minLength.error).required('You must specify an serial number for this instrument'),
        }),

      onSubmit: values => {
        // console.log(instrumentDetails)
        // updateInstrumentContext()
        // handleAlerts('snackbar', 'success', instrumentDetails.name + ' added!')
      },
    });

    const instruments = props.instruments.map(instrument=><option key={instrument.id} id={instrument.id}>{instrument.name}</option>)
    instruments.unshift(<option disabled>Select instrument</option>)

    const privateDiv = <div className={styles.privacyWrapper}>
                        <LockOutlinedIcon fontSize='medium' className='greyText3 me-3'/>
                        <div className={styles.privacyWrapperText}>
                          <span className='inputSelectLabel'>Private</span>
                          <span className='smallText greyText3'>Only you and your collaborators can see this instrument or download its data</span>
                          </div>
                      </div> 

    const publicDiv = <div className={styles.privacyWrapper}>
                        <PublicIcon fontSize='medium' className='greyText3 me-3'/>
                        <div className={styles.privacyWrapperText}>
                          <span className='inputSelectLabel'>Public</span>
                          <span className='smallText greyText3'>Anybody can see this instrument or download its data</span>
                          </div>
                      </div> 

    return(
      <Container maxWidth={false} style={{ maxWidth: '900px', paddingTop: '50px' }}>
          <form>
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
                        id='name' 
                        name='name'
                        className='styledInput small name' 
                        placeholder='Ex. Storrs Pond 2022 #1'
                        onInput={(e)=>{handleUserInput(e, 'name')}}
                        onBlur={formik.handleBlur}
                        /> 
                        
                        {formik.touched.name && formik.errors.name ? (
                      <span className='smallText redText boldText' id='serialNumberError'>{formik.errors.name}</span>
                      ) :<span className='inputHelpText'>What do you want to call this deployment?</span>}
                      </div>
                </Grid>
                <Grid xs={12} xl={4} item>
                    <span className='inputSelectLabel'>Status<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                    <div className='flexColumn'>
                      <select className={'styledSelect status'} onChange={(e)=>{handleUserInput(e, 'status')}}>
                          <option value={'active'} >Active</option>
                          <option value={'inactive'} >Inactive</option>
                          <option value={'retired'} >Retired</option>
                          <option value={'stagin'} >Staging</option>
                      </select>
                    </div>
                    
                </Grid>
                <Grid xs={12} xl={12} item>
                <hr className='hr'></hr>
                  <FormGroup className={styles.radioButton}>
                        <FormControlLabel control={<Radio checked={updatedDeployment.privacy=='private'?true:false} onChange={(e)=>handleUserInput(e, 'private')}/>} label={privateDiv}  />
                  </FormGroup>
                  <FormGroup className={styles.radioButton}>
                      <FormControlLabel control={<Radio checked={updatedDeployment.privacy=='public'?true:false} onChange={(e)=>handleUserInput(e, 'public')}/>} label={publicDiv}  />
                  </FormGroup>
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
                        className={styles.datePicker} onChange={newDate => handleDateChange(newDate, 'deployment_start_date')}
                    />
                </Grid>
                <Grid xs={12} sm={6} xl={4} item >
                    <span className='inputSelectLabel'>End Date<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                    <DatePicker components={{OpenPickerIcon: CalendarMonthOutlinedIcon}}
                        className={styles.datePicker} onChange={newDate => handleDateChange(newDate, 'deployment_end_date')}
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
          </form>
        </Container>
    )
}


