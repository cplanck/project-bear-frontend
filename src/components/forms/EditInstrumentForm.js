// import AlertContext from '../../components/Context'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router'
import styles from '@/components/instrument/Instrument.module.css'
import deploymentStyles from '@/components/deployment/Deployment.module.css'
import * as dayjs from 'dayjs'
import { useContext } from 'react';
import { AppContext } from '@/components/Context'
import * as Yup from 'yup';
import structuredClone from "@ungap/structured-clone";
import fr from './FormRestrictions'; 
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import DoNotDisturbOutlinedIcon from '@mui/icons-material/DoNotDisturbOutlined';
import Link from 'next/link';
import { DatePicker } from '@mui/x-date-pickers';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { RotatingLines } from 'react-loader-spinner'
import { useMutation } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query'
import { Formik, Form, Field, setFieldValue, useFormikContext } from 'formik';
import toast, { Toaster } from 'react-hot-toast';

export default function EditInstrumentForm(props){

  const [avatarUploadOpen, setAvatarUploadOpen] = useState(false)
  const [imageBlob, setImageBlob] = useState('')
  const [context, setContext] = useContext(AppContext)
  const [dataModelModalOpen, setDataModelModalOpen] = useState(false)
  const inputRef = useRef(null);

  var advancedFormat = require('dayjs/plugin/advancedFormat')
  dayjs.extend(advancedFormat)

  const router = useRouter()

  const handleCancel = (e)=>{
    e.preventDefault()
    router.query.from == 'instrument'?router.push('/instrument/'+router.query.id):router.push('/dashboard/instruments')
  }

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    (updatedInstrument) =>
      fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + '/api/instruments/' + updatedInstrument.id + '/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        body: JSON.stringify(updatedInstrument),
      }).then((res) => res.json()),
    {
      onSuccess: (updatedInstrument) => {
        toast.success(<span><Link className='removeLinkFormatting' href={'/instrument/' + updatedInstrument.id}><strong>{updatedInstrument.name}</strong></Link> successfully updated!</span>)
        router.query.from == 'instrument'?router.push('/instrument/'+router.query.id):router.push('/dashboard/instruments')
        setSubmitting(false)
      },
    }
  );


    function triggerAvatarModal(e){
      e.preventDefault()
      setAvatarUploadOpen(true)
    }

    const FormValidation = Yup.object().shape({
      name: Yup.string().min(fr.instrumentName.minLength.val, fr.instrumentName.minLength.error).max(fr.instrumentName.maxLength.val, fr.instrumentName.maxLength.error).required('You must specify an instrument name'),
      notes: Yup.string().max(fr.instrumentNotes.maxLength.val, fr.instrumentNotes.maxLength.error),
      serial_number: Yup.string().max(fr.instrumentSerialNumber.maxLength.val, fr.instrumentSerialNumber.maxLength.error).min(fr.instrumentSerialNumber.minLength.val, fr.instrumentSerialNumber.minLength.error).required('You must specify an serial number for this instrument'),
      description: Yup.string().max(fr.instrumentDescription.maxLength.val, fr.instrumentDescription.maxLength.error)
    })

    const successfulSubmit = (values, { setSubmitting }) => {
      mutate({...values})
    };

    console.log(props.instrument)
    return(
      <Formik
          initialValues={{
            name: '', 
            serial_number: '',
            notes: '',
            description: '',
          }}
          validationSchema={FormValidation}
          onSubmit={successfulSubmit}
          >
            <EditForm instrument={props.instrument}/>
        </Formik>
    )
}


function EditForm(props){
  const { errors, values, touched, handleChange, handleBlur, isSubmitting, setFieldValue, setValues, isValid } = useFormikContext();
  const router = useRouter()
  const inputRef = useRef(null);
  // const { status, error, isFetching, isLoading:loading, data: instrument } = useQuery({ queryKey: ['/instruments/' + router?.query.id], enabled: router.isReady})

  const instrument = props.instrument

  console.log(instrument)
  useEffect(()=>{
    setValues({
              name: instrument?.name,
              serial_number: instrument?.serial_number,
              description: instrument?.description,
              notes: instrument?.notes,
              purchase_date: instrument?.purchase_date,
              date_added: instrument?.date_added,
              last_modified: instrument?.last_modified,
              id: instrument?.id
            })
}, [instrument])

const lastModified = dayjs(values?.last_modified); 
const isToday = lastModified.isSame(dayjs(), 'day');
const lastModifiedDate = isToday ? 'Today' : lastModified.format('MMMM Do, YYYY');

return(
  <Form>
    <Container maxWidth={false} style={{ maxWidth: '900px', paddingTop: '50px' }}>
          <div className='flexCenterFlexStart'>
            <h3 className='removeHeaderMargin'>Edit Instrument</h3>
            {/* {loading?<RotatingLines height="20" width="20" animationDuration="1.25" strokeColor="var(--dark-theme-grey-3)" ariaLabel="loading"/>:''} */}
          </div>
          <Grid container spacing={3}>
              <Grid xs={12} md={6} item>
                  <span className='inputSelectLabel'>Instrument Name<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                  <input 
                    id='name' 
                    name='name'
                    className='styledInput small' 
                    onInput={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    ref={inputRef}
                    // disabled={loading?true:false}
                  />
                  {errors.name && touched.name? (
                  <span className='smallText redText boldText' id='nameError'>{errors.name}</span>
                  ) :<span className='smallText'>Good instrument names are short and descriptive</span>}
              </Grid>
              <Grid xs={12} md={6} item>
                  <span className='inputSelectLabel'>Serial Number<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                  <input 
                    id='serial_number'
                    name='serial_number' 
                    className='styledInput small' 
                    value={values.serial_number}
                    onInput={handleChange}
                    onBlur={handleBlur}
                    // disabled={loading?true:false}
                  />
                  {errors.serial_number && touched.serial_number ? (
                  <span className='smallText redText boldText' id='serialNumberError'>{errors.serial_number}</span>
                  ) :<span className='smallText'>The instrument serial number cannot be modified.</span>}
              </Grid>
              <Grid xs={12} xl={12} item >
                <span className='inputSelectLabel'>Avatar</span>
                  {/* <div style={{display: 'flex', alignItems: 'center'}}>
                    {!imageBlob?<WifiTetheringOutlinedIcon fontSize='large'/>:<InstrumentAvatar url={imageBlob.href}/>}
                    <button onClick={(e)=>{triggerAvatarModal(e)}} className={'textButton mx-3'} >{!imageBlob?<span>Upload Avatar</span>:<span>Change Avatar</span>}</button>
                  </div> */}
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
                  defaultValue={values.description} 
                  onInput={handleChange}
                  onBlur={handleBlur}
                  />
                  {errors.description && touched.description ? (
                  <span className='smallText redText boldText' id='descriptionError'>{errors.description}</span>
                  ) :<span className='greyText3 smallText'>What type of instrument is this?</span>}
              </Grid>
              <Grid xs={12} xl={12} item>
                  <div className='inputSelectLabel'>Notes<span className='greyText3 smallText ms-2'>(optional)</span></div>
                  <textarea 
                  id='notes'
                  name='notes' 
                  className='styledTextArea small' 
                  placeholder='Notes, things to remember, etc...' 
                  defaultValue={values.notes} 
                  onInput={handleChange}
                  onBlur={handleBlur}
                  />
                  {errors.notes && touched.notes ? (
                  <span className='smallText redText boldText' id='notesError'>
                    {errors.notes}
                  </span>
                  ) :
                  null
                  }
              </Grid>
              <Grid xs={12} sm={6} xl={12} item >
                  <span className='inputSelectLabel'>Purchase Date</span>
                  <DatePicker 
                    components={{OpenPickerIcon: CalendarMonthOutlinedIcon}}
                    className={styles.datePicker} 
                    defaultValue={dayjs(values.purchase_date)} 
                    value={dayjs(values.purchase_date)}
                    onInput={handleChange}
                    onBlur={handleBlur}
                  />
              </Grid>
          </Grid>
          {/* {avatarUploadOpen?<AvatarImageSelector setAvatarUploadOpen={setAvatarUploadOpen} setImageBlob={setImageBlob}/>:''} */}
          <div className={'rightButtonGroup'}>
            <button className='textButton me-3' onClick={(e)=>handleCancel(e)}>Cancel</button>
            <button type="submit" className='greenButton saveButton' disabled={isSubmitting || !isValid}>{isSubmitting?'Saving....':'Save Instrument'}</button>
          </div>
        {/* {dataModelModalOpen?
        <InstrumentDataModelModal 
          setDataModelModalOpen={setDataModelModalOpen} 
          templateInstrument={templateInstrument} 
          instrumentDetails={instrumentDetails}
          setInstrumentDetails={setInstrumentDetails}
          />:
          ''} */}
      <Grid container spacing={'md'}>
        <Grid item xs={12}>
          <span className='greyText3 extraSmallText'>Last modified {lastModifiedDate} at {dayjs(values.last_modified).format('h:mma')}</span>
        </Grid>
        <Grid item xs={12}>
          <span className='greyText3 extraSmallText'>Originally added {dayjs(values.date_added).format('MMMM Do, YYYY')}</span>
        </Grid>
      </Grid>
    </Container>
  </Form>
)
}