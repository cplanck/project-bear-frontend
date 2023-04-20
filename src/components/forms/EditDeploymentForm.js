import styles from '@/components/deployment/Deployment.module.css'
import dbstyles from '@/components/dashboard/Dashboard.module.css'
import { Grid } from '@mui/material';
import { useState, useContext, useEffect, useRef } from 'react'
import { DatePicker, MobileDatPicker } from '@mui/x-date-pickers/DatePicker';
import { useRouter } from 'next/router'
import { AppContext } from '@/components/Context'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DeploymentTagsModal from "@/components/deployment/DeploymentTagModal";
import DeploymentTagsEditPanel from '../deployment/DeploymentTagsEditPanel';
import structuredClone from "@ungap/structured-clone";
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
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Formik, Form, Field, setFieldValue, useFormikContext } from 'formik';


export default function EditDeploymentForm(props){

  const [context, setContext] = useContext(AppContext)
  const [tags, setTags] = useState({tags: ''})
  const router = useRouter()

  function handleAlerts(alertType, alertSeverity, alertMessage){
    setContext(structuredClone(context.alert.status=false))
    let newContext = context
    newContext[alertType].status = true
    newContext[alertType].type = alertSeverity
    newContext[alertType].message = alertMessage
    setContext(structuredClone(newContext))
  }

  const FormValidation = Yup.object().shape({
    name: 
      Yup.string()
      .min(fr.deploymentName.minLength.val, fr.deploymentName.minLength.error)
      .max(fr.deploymentName.maxLength.val, fr.deploymentName.maxLength.error)
      .required(fr.deploymentName.required),
    location: 
      Yup.string()
      .min(fr.deploymentLocation.minLength.val, fr.deploymentLocation.minLength.error)
      .max(fr.deploymentLocation.maxLength.val, fr.deploymentLocation.maxLength.error)
      .required(fr.deploymentLocation.required),
    status: 
      Yup.string()
      .required(fr.deploymentStatus.required),
    deployment_start_date: 
      Yup.date().when('status', (status) => {
        if (status == 'inactive' || status == 'active' || status == null) {
          return Yup.date().typeError('Please enter a valid date')
        }{
          return Yup.date().typeError('Please enter a valid date').nullable();
        }
      }
      ),
      deployment_end_date: 
      Yup.date().when('status', (status) => {
        if (status == 'inactive') {
          return Yup.date().typeError('Please enter a end valid date');
        }{
          return Yup.date().typeError('Please enter a end valid date').nullable();
        }
      }
      ).when('deployment_start_date', (deployment_start_date, schema)=>{
        return schema.min(deployment_start_date, 'Oops! Your deployment end date is before your start date')
      })
  });

  const successfulSubmit = (values, { setSubmitting }) => {
    console.log('IS THIS WORKING?')
    const addedParams = {last_modified: dayjs().format(), id: props.deployment.id}
    const updatedDeployment = {...addedParams, ...values, ...tags}
    updatedDeployment.deployment_start_date = dayjs(values.deployment_start_date).format()
    updatedDeployment.deployment_end_date = dayjs(values.deployment_end_date).isValid()?dayjs(values.deployment_end_date).format():null

    const newDeploymentList = structuredClone(props.deployments).filter(deployment=>deployment.id!=props.deployment.id)
    newDeploymentList.push(updatedDeployment)
    props.setDeployments(newDeploymentList)



    // newDeploymentList.push(newDeploymentObject)
    // props.setDeployments(newDeploymentList)

    // const activeDeployment = {name: values.name, id: newId}
    // const instrumentContext = props.instruments.filter(instrument=>instrument.id!=values.instrument_id)
    // const instrument = props.instruments.filter(instrument=>instrument.id==values.instrument_id)[0]
    // instrument.active_deployment = activeDeployment
    // instrumentContext.push(instrument)
    // props.setInstruments(instrumentContext)
    handleAlerts('snackbar', 'success', 'Deployment ' + values.name + ' added!')
    router.push('/dashboard/deployments')
    setSubmitting(false);
  };

    return(
        <Formik
          initialValues={{
            instrument_id: '',
            name: '',
            location: '',
            status: '',
            notes: '',
            private: true,
            description: '',
            deployment_start_date: dayjs().toDate(),
            deployment_end_date: null,
          }}
          validationSchema={FormValidation}
          onSubmit={successfulSubmit}
          >
            <EditForm instruments={props.instruments} setInstruments={props.setInstruments} deployments={props.deployments} setDeployments={props.setDeployments} tags={tags} setTags={setTags} deployment={props.deployment} setIsEditing={props.setIsEditing}/>
        </Formik>
    )
}


function EditForm(props){

      const [alertOpen, setAlertOpen] = useState(false)
      const [hasActiveDeployment, setHasActiveDeployment] = useState(false)
      const [instruments, setInstruments] = useState([])
      const { errors, values, touched, handleChange, handleBlur, isSubmitting, setFieldValue, setValues } = useFormikContext();
      const [tagModalOpen, setTagModalOpen] = useState(false)
  
      const router = useRouter()
      const inputRef = useRef(null);
  
      const handleDateChange = (name, value, setFieldValue) => {
        setFieldValue(name, value)
      };
  
      const handlePrivacy = (e, setFieldValue)=>{
        const val = e.target.value == 'private'?true:false
        setFieldValue('private', val)
      }

      useEffect(()=>{
          setValues({name: props.deployment.name, 
                    deployment_start_date: props.deployment.deployment_start_date??null,
                    deployment_end_date: props.deployment.deployment_end_date??null,
                    location: props.deployment.location,
                    description: props.deployment.description,
                    notes: props.deployment.notes,
                    private: props.deployment.private,
                    status: props.deployment.status,
                    instrument_id: props.deployment.instrument_id
                  })
          props.setTags({tags: props.deployment.tags})
      }, [router])

      // useEffect(()=>{
      //   // On status selection, check if instrument has any active deployments 
      //   const currentInstrumentId = values.instrument_id
      //   const activeDeployments = props.deployments.filter(deployment=>deployment.instrument_id == currentInstrumentId).filter(instrument=>instrument.status=='active')
      //   if(activeDeployments.length !=0 && values.status == 'active'){
      //     console.log('Has an active deployment...')
      //     setHasActiveDeployment(activeDeployments)
      //     console.log(activeDeployments)
      //     setAlertOpen(true)
      //   }else{
      //     setHasActiveDeployment(false)
      //   }
      // },[values.status])
  
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
    <Form>
      <Container maxWidth={false} style={{ maxWidth: '900px', paddingTop: '0px' }}>
        <h3 className='removeHeaderMargin'>Edit Deployment</h3>
        <Grid container spacing={2}>
            <Grid xs={12} xl={6} item>
                  <span className='inputSelectLabel'>Deployment name<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                  <div className='flexColumn'>
                    <Field 
                    id='name' 
                    name='name'
                    className='styledInput small name' 
                    placeholder='Ex. Storrs Pond 2022 #1'
                    onInput={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    ref={inputRef}
                    /> 
                  {errors.name && touched.name ? (
                      <span className='smallText redText boldText'>{errors.name}</span>
                    ) : null}
                  </div>
            </Grid>
            <Grid xs={12} md={4} item>
                <span className='inputSelectLabel'>Deployment Status<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                <div className='flexColumn'>
                  <select className={'styledSelect status'} onChange={handleChange} name='status'>
                    <option disabled default={true} value={'active'} >Select Status</option>
                    <option selected={props.deployment.status=='active'?true:false} value={'active'} >Active</option>
                    <option selected={props.deployment.status=='inactive'?true:false} value={'inactive'} >Inactive</option>
                    <option selected={props.deployment.status=='staging'?true:false} value={'staging'} >Staging</option>
                  </select>
                  {errors.status && touched.status ? (
                      <span className='smallText redText boldText'>{errors.status}</span>
                    ) : null}
                  
                </div>
            </Grid>
            {hasActiveDeployment ? (
                      <div className='inputErrorMessage outsideGrid'><WarningAmberOutlinedIcon className='me-3' fontSize={'small'}/>This instrument already has an active deployment ({hasActiveDeployment[0].name}). You must deactivate that deployment to continue.</div>
                    ) : null}
            <Grid xs={12} xl={12} item>
            <hr className='hr'></hr>
              <FormGroup className={styles.radioButton}>
                    <FormControlLabel control={<Radio checked={values.private} value={'private'} name='privacy' onChange={e=>handlePrivacy(e, setFieldValue)}/>} label={privateDiv}  />
              </FormGroup>
              <FormGroup className={styles.radioButton}>
                  <FormControlLabel control={<Radio checked={!values.private} value={'public'} name='privacy' onChange={e=>handlePrivacy(e, setFieldValue)}/>} label={publicDiv}  />
              </FormGroup>
            </Grid>
            <Grid xs={12} xl={12} item>
                <hr className='hr'></hr>
                <span className='inputSelectLabel'>Location<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                <div className='flexColumn'>
                  <Field 
                  id='location' 
                  name='location'
                  className='styledInput small location' 
                  placeholder='Ex. Hanover, New Hampshire'
                  onInput={handleChange}
                  onBlur={handleBlur}
                  value={values.location}
                  />
                  {errors.location && touched.location ? (
                    <span className='smallText redText boldText'>{errors.location}</span>
                  ) : null}
                  
                  </div>
            </Grid>
            <Grid xs={12} sm={12} xl={12} item >
              <div className={'inputSelectWrapper'}>
                <span className='inputSelectLabel'>Start Date<span className='inputSelectRequiredStar'>*</span></span>
                <Field
                component={DatePicker} 
                components={{OpenPickerIcon: CalendarMonthOutlinedIcon}}
                className={styles.datePicker} 
                onChange={(value) => handleDateChange('deployment_start_date', value, setFieldValue)}
                onBlur={handleBlur}
                invalidDateMessage=""
                name='deployment_start_date'
                value={values.deployment_start_date?dayjs(values.deployment_start_date):null}
                />
                {errors.deployment_start_date ? (
                      <span className='smallText redText boldText'>{errors.deployment_start_date}</span>
                    ) : null}
                </div>
            </Grid>
            <Grid xs={12} sm={12} xl={12} item >
                <div className={'inputSelectWrapper'}>
                  <div className='inputSelectLabel'>
                    End Date
                    {values.status == 'inactive'?<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span>:''}
                  </div>
                  <Field
                component={DatePicker} 
                components={{OpenPickerIcon: CalendarMonthOutlinedIcon}}
                className={styles.datePicker} 
                onChange={(value) => handleDateChange('deployment_end_date', value, setFieldValue)}
                onBlur={handleBlur}
                name='deployment_end_date'
                value={values.deployment_end_date?dayjs(values.deployment_end_date):null}
                disabled={values.status == 'active'?true:false}
                />
                {errors.deployment_end_date && touched.deployment_end_date? (
                      <span className='smallText redText boldText'>{errors.deployment_end_date}</span>
                    ) : null}
                </div>
            </Grid>
          
            <Grid xs={12} item>
              <div className='inputSelectLabel'>Description<span className='greyText3 smallText ms-2'>(optional)</span></div>
              <textarea 
              id='description' 
              className='styledTextArea single small' 
              placeholder='Observations, notes, or anything you think is important for understanding this deployment'
              onChange={handleChange}
              />
            </Grid>
            <Grid xs={12} item >
            <div className='inputSelectLabel'>Notes<span className='greyText3 smallText ms-2'>(optional)</span></div>
                <textarea id='notes' name='notes' className='styledTextArea small' onChange={handleChange} value={values.notes}/>
            </Grid>
            <Grid xs={12} item >
              <div className='inputSelectLabel'>Tags<span className='greyText3 smallText ms-2'>(optional)</span></div>
                <div id='tags' className='styledTextArea small' onChange={(e)=>{handleUserInput(e, 'tags')}}>
                <DeploymentTagsEditPanel setTagModalOpen={setTagModalOpen} updatedDeployment={props.tags}/>
                {tagModalOpen?<DeploymentTagsModal deployment={props.tags} setDeployment={props.setTags} setTagModalOpen={setTagModalOpen} tagModalOpen={tagModalOpen}/>:''}
                </div>
            </Grid>
        </Grid>
        <div className={'rightButtonGroup'}>
            <button className='textButton' onClick={(e)=>{props.setIsEditing(false)}}>Cancel</button>
            <button type='submit' className='greenButton' disabled={isSubmitting}>Save Changes</button>
        </div>
        </Container>
      </Form>
  )
}
