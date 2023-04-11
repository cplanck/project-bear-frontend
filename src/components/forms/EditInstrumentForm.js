// import AlertContext from '../../components/Context'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import styles from '@/components/instrument/Instrument.module.css'
import deploymentStyles from '@/components/deployment/Deployment.module.css'
import AvatarImageSelector from '@/components/widgets/AvatarImageSelector/AvatarImageSelector';
import WifiTetheringOutlinedIcon from '@mui/icons-material/WifiTetheringOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Checkbox from '@mui/material/Checkbox';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as dayjs from 'dayjs'
import { useContext } from 'react';
import { AppContext } from '@/components/Context'
import InstrumentAvatar from '@/components/instrument/InstrumentAvatar';
import { useFormik, Form } from 'formik';
import * as Yup from 'yup';
import structuredClone from "@ungap/structured-clone";
import fr from './FormRestrictions'; 
import InstrumentDataModelModal from './InstrumentDataModelModal';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import DoNotDisturbOutlinedIcon from '@mui/icons-material/DoNotDisturbOutlined';
import Link from 'next/link';

export default function EditInstrumentForm(props){

    const [instrumentDetails, setInstrumentDetails] = useState()
    const [avatarUploadOpen, setAvatarUploadOpen] = useState(false)
    const [imageBlob, setImageBlob] = useState('')
    const [context, setContext] = useContext(AppContext)
    const [dataModelModalOpen, setDataModelModalOpen] = useState(false)

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
        let temp = structuredClone(instrumentDetails)
        id == 'template'?temp[id] = event.target.checked:temp[id] = event.target.value
        setInstrumentDetails(temp)
    }

    function handleDateChange(newDate, id){
      let temp = structuredClone(instrumentDetails);
      temp[id] = String(newDate.format())
      setInstrumentDetails(temp)
  }

    function updateInstrumentContext(){
      const temp = props.instruments.filter(instrument=>instrument.id!=instrumentDetails.id)
      temp.push(instrumentDetails)
      props.setInstruments(temp)
      router.push('/dashboard/instruments')

    }

    function triggerAvatarModal(e){
      e.preventDefault()
      setAvatarUploadOpen(true)
    }

    const formik = useFormik({
      initialValues: {
        name: '', 
        notes: '',
        serialNumber: '',
        description: '',
      },
      validationSchema: Yup.object({
          name: Yup.string().min(fr.instrumentName.minLength.val, fr.instrumentName.minLength.error).max(fr.instrumentName.maxLength.val, fr.instrumentName.maxLength.error).required('You must specify an instrument name'),
          notes: Yup.string().max(fr.instrumentNotes.maxLength.val, fr.instrumentNotes.maxLength.error),
          // serialNumber: Yup.string().max(fr.instrumentSerialNumber.maxLength.val, fr.instrumentSerialNumber.maxLength.error).min(fr.instrumentSerialNumber.minLength.val, fr.instrumentSerialNumber.minLength.error).required('You must specify an serial number for this instrument'),
          description: Yup.string().max(fr.instrumentDescription.maxLength.val, fr.instrumentDescription.maxLength.error).required('Must specify a brief description')
        }),

      onSubmit: values => {
        updateInstrumentContext()
        handleAlerts('snackbar', 'success', 'Instrument updated!')
      },
    });

    function onSubmit(e){
      e.preventDefault()
      formik.handleSubmit()
    }

    useEffect(()=>{
      setInstrumentDetails(structuredClone(props.instrumentToEdit))
      formik.initialValues.name = props.instrumentToEdit?.name
      formik.initialValues.description = props.instrumentToEdit?.description
    },[props.instrumentToEdit])
   
    return(
        <Container maxWidth={false} style={{ maxWidth: '900px', paddingTop: '50px' }}>
            <form onSubmit={(e)=>{onSubmit(e)}}>
              <h3 className='removeHeaderMargin'>Edit Instrument</h3>
              <Grid container spacing={3}>
                  <Grid xs={12} md={6} item>
                      <span className='inputSelectLabel'>Instrument Name<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                      <input 
                        id='name' 
                        name='name'
                        className='styledInput small' 
                        placeholder="Ex. Met Station #2 2023" 
                        onChange={(e)=>{handleUserInput(e, 'name')}}
                        onBlur={formik.handleBlur}
                        value={instrumentDetails?.name??''}
                      />
                      {formik.touched.name && formik.errors.name? (
                      <span className='smallText redText boldText' id='nameError'>{formik.errors.name}</span>
                      ) :<span className='smallText'>Good instrument names are short and descriptive</span>}
                  </Grid>
                  <Grid xs={12} md={6} item>
                      <span className='inputSelectLabel'>Serial Number<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                      <input 
                        id='serialNumber'
                        name='serialNumber' 
                        className='styledInput small' 
                        placeholder={instrumentDetails?.serial_number}
                        onChange={(e)=>{handleUserInput(e, 'serial_number')}}
                        onBlur={formik.handleBlur}
                        disabled={true}
                      />
                      {formik.touched.serialNumber && formik.errors.serialNumber ? (
                      <span className='smallText redText boldText' id='serialNumberError'>{formik.errors.serialNumber}</span>
                      ) :<span className='smallText'>The instrument serial number can't be modified.</span>}
                  </Grid>
                  <Grid xs={12} xl={12} item >
                    <span className='inputSelectLabel'>Avatar</span>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        {!imageBlob?<WifiTetheringOutlinedIcon fontSize='large'/>:<InstrumentAvatar url={imageBlob.href}/>}
                        <button onClick={(e)=>{triggerAvatarModal(e)}} className={'textButton mx-3'} >{!imageBlob?<span>Upload Avatar</span>:<span>Change Avatar</span>}</button>
                      </div>
                  </Grid>
                  <Grid xs={12} xl={12} item>
                   <span className='inputSelectLabel'>Cloud Database</span>
                    {props.instrumentToEdit?.data_model?.configured?
                     <div className={deploymentStyles.deploymentDetailsTableWrapper}>
                     <div className={deploymentStyles.deploymentDetailsTableRow} style={{backgroundColor: 'var(--dark-theme-header)', borderTopLeftRadius: '6px', borderTopRightRadius: '6px'}}>
                          <span className='boldText greenText flexCenterSpaceBetween'>Configured<CheckCircleOutlinedIcon className='ms-2' fontSize='small'/></span>
                          <button className='textButton darkThemeBlueText' onClick={(e)=>{setDataModelModalOpen(true); e.preventDefault()}}>Edit</button>
                     </div>
                    </div>
                    :
                    <div className={deploymentStyles.deploymentDetailsTableWrapper}>
                      <div className={deploymentStyles.deploymentDetailsTableRow} style={{backgroundColor: 'var(--dark-theme-header)', borderTopLeftRadius: '6px', borderTopRightRadius: '6px'}}>
                        <span className='boldText redText flexCenterSpaceBetween'>Not Configured<DoNotDisturbOutlinedIcon className='ms-2' fontSize='small'/></span>
                          <button className='textButton darkThemeBlueText' onClick={(e)=>{setDataModelModalOpen(true); e.preventDefault()}}>Configure</button>
                      </div>
                     </div>
                    }
                    {props.instrumentToEdit?.data_model?.configured?
                    <span className='smallText'>Your instruments database is successfully configured. To add data, save this instrument and add a deployment</span>
                    :
                    <span className='smallText'>Once you configure your Cloud Database, you can create a deployment and and start adding data.</span>
                    }
                  </Grid>
                  <Grid xs={12} xl={12} item>
                      <div className='inputSelectLabel'>Description<span className='greyText3 smallText ms-2'>(optional)</span></div>
                      <textarea 
                      id='description' 
                      name='description'
                      className='styledTextArea small single' 
                      placeholder='What kind of instrument is this?' 
                      defaultValue={instrumentDetails?.description??''} 
                      onChange={(e)=>{handleUserInput(e, 'description')}}
                      onBlur={formik.handleBlur}
                      />
                      {formik.touched.description && formik.errors.description ? (
                      <span className='smallText redText boldText' id='descriptionError'>{formik.errors.description}</span>
                      ) :<span className='greyText3 smallText'>What type of instrument is this?</span>}
                  </Grid>
                  <Grid xs={12} xl={12} item>
                      <div className='inputSelectLabel'>Notes<span className='greyText3 smallText ms-2'>(optional)</span></div>
                      <textarea 
                      id='notes'
                      name='notes' 
                      className='styledTextArea small' 
                      placeholder='Notes, things to remember, etc...' 
                      defaultValue={instrumentDetails?.notes??''} 
                      onChange={(e)=>{handleUserInput(e, 'notes')}}
                      // onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      />
                      {formik.touched.notes && formik.errors.notes ? (
                      <span className='smallText redText boldText' id='notesError'>
                        {formik.errors.notes}
                      </span>
                      ) :
                      null
                      }
                  </Grid>
                  <Grid xs={12} sm={6} xl={12} item >
                      <span className='inputSelectLabel'>Purchase Date</span>
                      {/* <DatePicker components={{OpenPickerIcon: CalendarMonthOutlinedIcon}}
                          className={styles.datePicker} defaultValue={dayjs()} onChange={(newDate) => handleDateChange(newDate, 'purchase_date')}
                      /> */}
                  </Grid>
                  <Grid xs={12} item >
                    <div className={styles.templateBooleanWrapper}>
                      <Checkbox style={{paddingLeft: '0px'}} defaultChecked onChange={(e)=>{handleUserInput(e, 'template')}}/>
                      <span className='inputSelectLabel'>Make this instrument a template</span>
                    </div>
                  </Grid>
              </Grid>
              {avatarUploadOpen?<AvatarImageSelector setAvatarUploadOpen={setAvatarUploadOpen} setImageBlob={setImageBlob}/>:''}
              <div className={'rightButtonGroup'}>
                <Link className='textButton me-3' href={'/'}>Cancel</Link>
                <button type="submit" className='greenButton'>Save Instrument</button>
              </div>
            </form>
            {dataModelModalOpen?
            <InstrumentDataModelModal 
              setDataModelModalOpen={setDataModelModalOpen} 
              templateInstrument={templateInstrument} 
              instrumentDetails={instrumentDetails}
              setInstrumentDetails={setInstrumentDetails}
              />:
              ''}
        </Container>
    )
}