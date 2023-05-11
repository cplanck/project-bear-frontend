import styles from '@/components/deployment/Deployment.module.css'
import dbstyles from '@/components/dashboard/Dashboard.module.css'
import { Grid } from '@mui/material';
import { useState, useContext, useEffect, useRef } from 'react'
import { DatePicker, MobileDatPicker } from '@mui/x-date-pickers/DatePicker';
import { useRouter } from 'next/router'
import { AppContext, UserContext } from '@/components/Context'
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
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Formik, Form, Field, setFieldValue, useFormikContext } from 'formik';
import { useQuery, useQueryClient } from '@tanstack/react-query'


export default function AddDeploymentForm(props){

  const [user, setUser] = useContext(UserContext)
  const [tags, setTags] = useState({tags: []})
  const router = useRouter()

  let { isLoading, error, data: instruments } = useQuery({ queryKey: ['/instruments'] })

  const FormValidation = Yup.object().shape({
    instrument_to_deploy: 
      Yup.string()
      .required('You must specify an instrument to deploy'),
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
        if(deployment_start_date){
          return schema.min(deployment_start_date, 'Oops! Your deployment end date is before your start date')
        }
      })
  });

  const postDeploymentToDB = (values, tags) =>{

    const addedParams = {last_modified: dayjs().format(), date_added: dayjs().format()}
    const newDeploymentObject = {...addedParams, ...values, ...tags}
    newDeploymentObject.user = user.user.user
    newDeploymentObject.deployment_start_date = dayjs(values.deployment_start_date).format()
    newDeploymentObject.deployment_end_date = dayjs(values.deployment_end_date).isValid()?dayjs(values.deployment_end_date).format():null
    newDeploymentObject.instrument = values.instrument.id

    console.log(newDeploymentObject)

    const url = process.env.NEXT_PUBLIC_BACKEND_ROOT + '/api/deployments/';
    console.log(newDeploymentObject)
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(newDeploymentObject),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      }
    })
    .then(response => {
      if(!response.ok){
        // handleAlerts('alert', 'error', 'There was a problem with your submission. Please try again. Server returned with ' + response.status + ' code.')
        setSubmitting(false);
        throw new Error('HTTP error, status = ' + response.status);
      }
      return response.json();
    })
    .then(newDeployment => {

      console.log(newDeployment)
      newDeployment.instrument = {id: values.instrument.id, name: 'Some instrument', avatar: 'hahaha'}
      console.log(newDeployment)
      const newDeploymentList = props.deployments
      newDeploymentList.push(newDeployment)
      props.setDeployments(newDeploymentList)
      router.push('/dashboard/deployments')
      // handleAlerts('snackbar', 'success', instrumentDetails.name + ' added!')
      setSubmitting(false);
    })
    .catch(error => {
      // could put some code to log these errors to the db
    });
  }

  const successfulSubmit = (values, { setSubmitting }) => {
    postDeploymentToDB(values, tags)
  };

    return(
        <Formik
          initialValues={{
            instrument_to_deploy: '',
            instrument: '',
            name: '',
            location: '',
            status: '',
            private: true,
            description: '',
            deployment_start_date: dayjs().toDate(),
            deployment_end_date: null,
          }}
          validationSchema={FormValidation}
          onSubmit={successfulSubmit}
          >
            <AddForm instruments={instruments?.results} setInstruments={props.setInstruments} deployments={props.deployments} setDeployments={props.setDeployments} tags={tags} setTags={setTags}/>
        </Formik>
    )
}


function AddForm(props){

      const [alertOpen, setAlertOpen] = useState(false)
      const [hasActiveDeployment, setHasActiveDeployment] = useState(false)
      // const [instruments, setInstruments] = useState([])
      const { errors, values, touched, handleChange, handleBlur, isSubmitting, setFieldValue } = useFormikContext();
      const [tagModalOpen, setTagModalOpen] = useState(false)
      const inputRef = useRef(null);
      const router = useRouter()
  
      const handleDateChange = (name, value, setFieldValue) => {
        setFieldValue(name, value)
      };
  
      const handlePrivacy = (e, setFieldValue)=>{
        const val = e.target.value == 'private'?true:false
        setFieldValue('private', val)
      }

      // useEffect(()=>{
      //   // On router ready, check query params and set the instrument_to_deploy and instrument_id
      //   // console.log(props.instruments)
      //   console.log(props.instruments)
      //   const selectedInstrumentList = instruments.map(instrument=><option selected={instrument.id==router.query.instrument?true:false} key={instrument.id} id={instrument.id}>{instrument.name}</option>)
      //   selectedInstrumentList.unshift(<option disabled selected={router.query.instrument?false:true}>Select instrument</option>)    
      //   // const selectedInstrument = props.instruments.filter(instrument=>instrument.id==router.query.instrument?instrument:'')[0]
      //   // setInstruments(selectedInstrumentList)
      //   // selectedInstrument?setFieldValue('instrument_to_deploy', selectedInstrument.name):''
      //   // selectedInstrument?setFieldValue('instrument', {id: selectedInstrument.id, avatar: selectedInstrument.avatar, name: selectedInstrument.name}):''
      // }, [props.instruments, router]) 

      const instruments = props.instruments?.map(instrument=><option selected={instrument.id==router.query.instrument?true:false} key={instrument.id} id={instrument.id}>{instrument.name}</option>)
      instruments?.unshift(<option disabled selected={router.query.instrument?false:true}>Select instrument</option>)
      const selectedInstrument = props.instruments.filter(instrument=>instrument.id==router.query.instrument?instrument:'')[0]
      // selectedInstrument?setFieldValue('instrument_to_deploy', selectedInstrument.name):''
      // selectedInstrument?setFieldValue('instrument', {id: selectedInstrument.id, avatar: selectedInstrument.avatar, name: selectedInstrument.name}):''


      useEffect(()=>{
        // On status selection, check if instrument has any active deployments 
        const currentInstrumentId = values.instrument_id
        const activeDeployments = props.deployments.filter(deployment=>deployment.instrument_id == currentInstrumentId).filter(instrument=>instrument.status=='active')
        if(activeDeployments.length !=0 && values.status == 'active'){
          console.log('Has an active deployment...')
          setHasActiveDeployment(activeDeployments)
          console.log(activeDeployments)
          setAlertOpen(true)
        }else{
          setHasActiveDeployment(false)
        }
      },[values.status, values.instrument_to_deploy])

      useEffect(()=>{
        inputRef.current.focus();
       },[])

      const handleInstrumentSelection = (e) =>{
        // On instrument selection, update instrument_to_deploy and instrument_id
        setFieldValue('instrument_to_deploy', e.target.value)
        setFieldValue('instrument', parseInt(e.target.options[e.target.selectedIndex].id))
        console.log('INSTRUMENT SELECTED')
        console.log(values)
      }
  
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
      <Container maxWidth={false} style={{ maxWidth: '768px', paddingTop: '50px' }}>
        <h2 className='removeHeaderMargin'>Add a Deployment</h2>
        <span className='greyText3 smallText'>Add a deployment to add data.</span>
          <hr className='hr my-4'/>
        <Grid container spacing={2}>
            <Grid xs={12} md={12} item>
                <span className='inputSelectLabel'>Instrument to deploy<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                <div className='flexColumn'>
                  <select 
                  className={'styledSelect'} 
                  onChange={e=>handleInstrumentSelection(e)} 
                  name='instrument_to_deploy' 
                  >
                  {instruments}
                  </select>
                  {errors.instrument_to_deploy && touched.instrument_to_deploy ? (
                      <span className='smallText redText boldText'>{errors.instrument_to_deploy}</span>
                    ) : null}
                </div>
            </Grid>
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
                      innerRef={inputRef}
                      
                    /> 
                  {errors.name && touched.name ? (
                      <span className='smallText redText boldText'>{errors.name}</span>
                    ) : null}
                  </div>
            </Grid>
            <Grid xs={12} md={4} item>
                <span className='inputSelectLabel'>Deployment Status<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                <div className='flexColumn'>
                  <select disabled={values.instrument_to_deploy==''?true:false} className={'styledSelect status'} onChange={handleChange} name='status'>
                    <option selected disabled default={true} value={'active'} >Select Status</option>
                    <option value={'active'} >Active</option>
                    <option value={'inactive'} >Inactive</option>
                    <option value={'staging'} >Staging</option>
                  </select>
                  {errors.status && touched.status ? (
                      <span className='smallText redText boldText'>{errors.status}</span>
                    ) : null}
                  
                </div>
            </Grid>
            {hasActiveDeployment ? (
                      <div className='inputErrorMessage outsideGrid'><WarningAmberOutlinedIcon className='me-3 orangeText' fontSize={'small'}/>This instrument already has an active deployment ({hasActiveDeployment[0].name}). You must deactivate that deployment to continue.</div>
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
                <textarea id='description' className='styledTextArea small' onChange={handleChange}/>
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
