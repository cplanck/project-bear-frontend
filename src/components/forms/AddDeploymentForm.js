import styles from '@/components/deployment/Deployment.module.css'
import { Grid } from '@mui/material';
import { useState, useContext, useEffect, useRef } from 'react'
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeploymentDetailsEditPanel(props){

    let [updatedDeployment, setUpdatedDeployment] = useState(blankDeploymentObject)
    const [tagModalOpen, setTagModalOpen] = useState(false)
    const [deploymentList, setDeploymentList] = useContext(DeploymentContext)
    const [deployedInstrument, setDeployedInstrument] = useState('')
    const [context, setContext] = useContext(AppContext)
    const [startDateError, setStartDateError] = useState('')
    const [startDateTouched, setStartDateTouched] = useState(false)
    const [alertDialog, setAlertDialog] = useState({open: false, statusChange: false})
    const [hasActiveDeployment, setHasActiveDeployment] = useState(false)
    const [hasInstrumentQueryParam, setHasInstrumentQueryParam] = useState(false)
    const [formikInitialValues, setFormikInitialValues] = useState({ instrument_to_deploy: '', name: '', location: '', status: ''})


    const router = useRouter()
    const inputRef = useRef(null);

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

    const handleStatusChange = (event)=>{
      formik.handleChange(event)
      const currentInstrumentId = updatedDeployment.instrument_id
      const activeDeployments = props.deployments.filter(deployment=>deployment.instrument_id == currentInstrumentId).filter(instrument=>instrument.status=='active')
      if(activeDeployments.length !=0 && event.target.value == 'active'){
        const newAlertDialog = structuredClone(alertDialog)
        newAlertDialog.open = true
        setAlertDialog(newAlertDialog)
        setHasActiveDeployment(true)
      }
      else{
        setHasActiveDeployment(false)
        let temp = structuredClone(updatedDeployment);
        temp['status'] = event.target.value
        setUpdatedDeployment(temp)
      }
      console.log(activeDeployments)
    }

    function handleDateChange(newDate, id){
      setStartDateTouched(true)
      let temp = structuredClone(updatedDeployment);
      dayjs(newDate).isValid()?setStartDateError(''):setStartDateError(fr.deploymentStartDate.error)
      temp[id] = dayjs(temp[id])
      temp[id] = dayjs(newDate).format()
      setUpdatedDeployment(temp)
    }

    const handleInstrumentSelection = (e)=>{

      // update the deployment
      // check if instrument already has an active deployment
      // if so, raise error
      // if no, continue
      formik.handleChange(e)
      const temp = updatedDeployment
      temp.instrument_id = e.target.options[e.target.selectedIndex].id
      const currentInstrumentId = e.target.options[e.target.selectedIndex].id
      setUpdatedDeployment(temp)
      setDeployedInstrument(e.target.value)

      console.log(currentInstrumentId)
      const activeDeployments = props.deployments.filter(deployment=>deployment.instrument_id == currentInstrumentId).filter(instrument=>instrument.status=='active')
      if(activeDeployments.length && updatedDeployment.status != ''){
        const newAlertDialog = structuredClone(alertDialog)
        newAlertDialog.open = true
        setAlertDialog(newAlertDialog)
        setHasActiveDeployment(true)
      }
      else{
        setHasActiveDeployment(false)
      }
    }

    const toggleAlertDialog = (value) => {
      const temp = structuredClone(alertDialog)
      temp.open = value
      setAlertDialog(temp);
    };

    useEffect(()=>{
      const deploymentIdArray = props.deployments.map(deployment=>deployment.id)
      const newId = Math.max(...deploymentIdArray) + 1
      const temp = structuredClone(updatedDeployment)
      temp.id = newId
      setUpdatedDeployment(temp)

      if(router.isReady){
        if(router.query.instrument){
          const temp = structuredClone(updatedDeployment)
          temp.instrument_id = router.query.instrument
          setUpdatedDeployment(temp)
          const instrumentName = props.instruments.filter(instrument=>instrument.id==router.query.instrument)[0]
          setDeployedInstrument(instrumentName)
          inputRef.current.focus();
          setHasInstrumentQueryParam(true)
          formik.setFieldTouched('instrument_to_deploy', true)
          const updateIv = formikInitialValues
          updateIv.instrument_to_deploy = router.query.instrument
          setFormikInitialValues(updateIv)
          console.log(instrumentName)
        }
      }

    },[router])



    const handleSubmission = (e)=>{
      e.preventDefault()
      console.log('YOU HERE?')
      if(startDateError == '' && !startDateTouched && !formik.touched.name && !formik.touched.location){
        setStartDateError(fr.deploymentStartDate.error)
        handleAlerts('alert', 'error', 'Whoops! You must fill out the form before submission!')
        formik.handleSubmit(e)
      }
      else if(startDateError == '' && !startDateTouched){
        setStartDateError(fr.deploymentStartDate.error)
      }
      else if(Object.keys(formik.errors).length === 0 && startDateTouched && !startDateError){
        setStartDateError('')
        if(!hasActiveDeployment){
          formik.handleSubmit(e)
        }else{
          handleAlerts('alert', 'error', 'Whoops! You must deactivate the current deployment in order to continue')
        }
      }
      else if(startDateError != ''){
        formik.validateForm
        handleAlerts('alert', 'error', 'Whoops! Youre missing a deployment start date')
      }
      else{
        console.log(updatedDeployment)
        formik.validateForm().then(errors => {
          formik.setErrors(errors);})
      }
      handleAlerts('alert', 'error', 'Hmmm. Looks like you still have some fields to fill out.')
    }


    const formik = useFormik({
      initialValues: formikInitialValues,
      // {
      //   instrument_to_deploy: '',
      //   name: '', 
      //   location: '',
      //   status: ''
      // },
      validationSchema: Yup.object({
          instrument_to_deploy: Yup.string().required('You must specify an instrument to deploy'),
          name: Yup.string().min(fr.deploymentName.minLength.val, fr.deploymentName.minLength.error).max(fr.deploymentName.maxLength.val, fr.deploymentName.maxLength.error).required('You must specify a deployment name'),
          location: Yup.string().max(fr.deploymentLocation.maxLength.val, fr.deploymentLocation.maxLength.error).required('You must specify a deployment location'),
          status: Yup.string().required('You must specify an instrument status')
        }),

      onSubmit: values => {
        const temp = structuredClone(updatedDeployment)
        temp.date_added = dayjs().format()
        temp.last_modified = dayjs().format()
        setUpdatedDeployment(temp)
        const newDeploymentList = props.deployments
        newDeploymentList.push(updatedDeployment)
        props.setDeployments(newDeploymentList)
        router.push('/dashboard/deployments')
        handleAlerts('snackbar', 'success', updatedDeployment.name + ' added!')
      },
    });

    const instruments = props.instruments.map(instrument=><option selected={instrument.id==router.query.instrument?true:false} key={instrument.id} id={instrument.id}>{instrument.name}</option>)
    instruments.unshift(<option disabled selected={router.query.instrument?false:true}>Select instrument</option>)

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
          <form onSubmit={(e)=>handleSubmission(e)}>
            <h2 className='removeHeaderMargin'>Add a Deployment</h2>
            <span className='greyText3 smallText'>Add a deployment to add data.</span>
              <hr className='hr my-4'/>
            <Grid container spacing={2}>
                <Grid xs={12} xl={12} item>
                    <span className='inputSelectLabel'>Instrument to deploy<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                    <div className='flexColumn'>
                      <select 
                      className={'styledSelect instrumentDeployed'} 
                      onChange={e=>handleInstrumentSelection(e)} 
                      name='instrument_to_deploy' 
                      // value={updatedDeployment.instrument_id}
                      >
                          {instruments}
                      </select>
                      {/* <span className='inputHelpText'>Select the instrument you want to deploy</span> */}
                      {formik.touched.instrument_to_deploy && formik.errors.instrument_to_deploy ? (
                      <span className='smallText redText boldText' id='serialNumberError'>{formik.errors.instrument_to_deploy}</span>
                      ) :<span className='inputHelpText'>Select the instrument you want to deploy</span>}
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
                        value={updatedDeployment.name}
                        ref={inputRef}
                        /> 
                        {formik.touched.name && formik.errors.name ? (
                      <span className='smallText redText boldText' id='serialNumberError'>{formik.errors.name}</span>
                      ) :<span className='inputHelpText'>What do you want to call this deployment?</span>}
                      </div>
                </Grid>
                <Grid xs={12} xl={4} item>
                    <span className='inputSelectLabel'>Status<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                    <div className='flexColumn'>
                      <select className={'styledSelect status'} onChange={(e)=>{handleStatusChange(e)}} name='status'>
                        <option selected disabled default={true} value={'active'} >Select Status</option>
                        <option value={'active'} >Active</option>
                        <option value={'inactive'} >Inactive</option>
                      </select>
                      {formik.touched.status && formik.errors.status ? (
                      <span className='smallText redText boldText' id='serialNumberError'>{formik.errors.status}</span>
                      ) :<span></span>}
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
                    <div className='flexColumn'>
                      <input 
                      id='location' 
                      name='location'
                      className='styledInput small location' 
                      placeholder='Ex. Hanover, New Hampshire'
                      onChange={(e)=>{handleUserInput(e, 'location')}}
                      onBlur={formik.handleBlur}
                      value={updatedDeployment.location}
                      />
                        {formik.touched.location && formik.errors.location ? (
                        <span className='smallText redText boldText' id='serialNumberError'>{formik.errors.location}</span>
                      ) :''}
                      </div>
                </Grid>
                <Grid xs={12} sm={12} xl={12} item >
                  <div className={'inputSelectWrapper'}>
                    <span className='inputSelectLabel'>Start Date<span className='inputSelectRequiredStar'>*</span></span>
                    <DatePicker 
                    components={{OpenPickerIcon: CalendarMonthOutlinedIcon}}
                    className={styles.datePicker} 
                    onChange={newDate => handleDateChange(newDate, 'deployment_start_date')}
                    name='deployment_start_date'
                    />
                    <span className='smallText redText boldText'>{startDateError}</span>
                    </div>
                  {formik.errors.deployment_start_date}
                </Grid>
                <Grid xs={12} sm={12} xl={12} item >
                    <div className={'inputSelectWrapper'}>
                      <div className='inputSelectLabel'>
                        End Date
                      {updatedDeployment.status=='inactive'?<span className='inputSelectRequiredStar'>*</span>:''}
                      </div>
                      <DatePicker components={{OpenPickerIcon: CalendarMonthOutlinedIcon}}
                          className={styles.datePicker} onChange={newDate => handleDateChange(newDate, 'deployment_end_date')}
                      />
                    </div>
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
                <button type='submit' className='greenButton'>Save Changes</button>
            </div>
          </form>
          <AlertDialog toggleAlertDialog={toggleAlertDialog} alertDialog={alertDialog} updatedDeployment={updatedDeployment} deployedInstrument={deployedInstrument}/>
        </Container>
    )
}

function AlertDialog(props){

  return(
    <div>
    <Dialog
      open={props.alertDialog.open}
      onClose={()=>props.toggleAlertDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.deployedInstrument.name + ' already has an active deployment'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
         You must deactivate the currently active deployment before you can continue. 
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <button className='textButton' onClick={()=>props.toggleAlertDialog(false)}>Disagree</button> */}
        <button className='textButton' onClick={()=>props.toggleAlertDialog(false)} autoFocus>
          I Understand
        </button>
      </DialogActions>
    </Dialog>
  </div>
  )
}