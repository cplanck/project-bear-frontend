import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router'
import AvatarImageSelector from '@/components/widgets/AvatarImageSelector/AvatarImageSelector';
import * as dayjs from 'dayjs'
import { useContext } from 'react';
import { AppContext, UserContext } from '@/components/Context'
import * as Yup from 'yup';
import fr from './FormRestrictions'; 
import InstrumentDataModelModal from './InstrumentDataModelModal';
import { Formik, Form, Field, setFieldValue, useFormikContext } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { maxWidth } from '@mui/system';


export default function AddInstrumentForm(props){

  const [user, setUser] = useContext(UserContext);
  const inputRef = useRef(null);

  const router = useRouter()

  function triggerAvatarModal(e){
    e.preventDefault()
    setAvatarUploadOpen(true)
  }

    const FormValidation = Yup.object().shape({
      name: Yup.string().min(fr.instrumentName.minLength.val, fr.instrumentName.minLength.error).max(fr.instrumentName.maxLength.val, fr.instrumentName.maxLength.error).required('You must specify an instrument name'),
      notes: Yup.string().max(fr.instrumentNotes.maxLength.val, fr.instrumentNotes.maxLength.error),
      serial_number: Yup.string().max(fr.instrumentSerialNumber.maxLength.val, fr.instrumentSerialNumber.maxLength.error).min(fr.instrumentSerialNumber.minLength.val, fr.instrumentSerialNumber.minLength.error).required('You must specify an serial number.'),
      description: Yup.string().max(fr.instrumentDescription.maxLength.val, fr.instrumentDescription.maxLength.error)
    })

    const mutationFunction = (values) =>
      fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + '/api/instruments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        body: JSON.stringify(values),
      }).then((res)=>{
        if(!res.ok){
          throw new Error('Failed to add instrument')
        }
        return res.json()
      })
      .then(()=>{
        router.push('/dashboard/instruments')
        toast.success('Instrument Added!')
      })
      .catch(()=>{toast.error('There seems to have been an error. Please try again.')})
      
    
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
      mutationFn: mutationFunction,
    }
    );

    const successfulSubmit = (values, { setSubmitting }) => {
      
      mutate({...values, user: user.user.user})
      setSubmitting(false)
    };

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
        <AddForm />
    </Formik>
    )
}

function AddForm(){
  const { errors, values, touched, handleChange, handleBlur, isSubmitting, setFieldValue, setValues, isValid } = useFormikContext();
  const router = useRouter()
  const inputRef = useRef(null);
  const [avatarUploadOpen, setAvatarUploadOpen] = useState(false)
  const [imageBlob, setImageBlob] = useState('')
  const [dataModelModalOpen, setDataModelModalOpen] = useState(false)

  return(
    <Form>
       <Container maxWidth={false} style={{ maxWidth: '768px', paddingTop: '50px' }}>
              <h2 className='removeHeaderMargin'>Add an Instrument</h2>
              <span className='greyText3 smallText'>Create an instrument to add data, link deployments, add create a public webpage.</span>
              <hr className='hr my-4'/>
             
              <Grid container spacing={3}>
                  <Grid xs={12} md={6} item>
                      <span className='inputSelectLabel'>Instrument Name<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                      <input 
                      id='name' 
                      name='name'
                      className='styledInput small' 
                      placeholder="Ex. Met Station #2 2023" 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      ref={inputRef}
                      />
                      {touched.name && errors.name ? (
                      <span className='smallText redText boldText' id='nameError'>{errors.name}</span>
                      ) :<span className='smallText'>Good instrument names are short and descriptive</span>}
                  </Grid>
                 
                  <Grid xs={12} md={6} item>
                      <span className='inputSelectLabel'>Serial Number<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                      <input 
                      id='serial_number'
                      name='serial_number' 
                      className='styledInput small' 
                      placeholder="Ex. 30043406615780" 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{maxWidth: '100px'}}

                      />
                      {touched.serial_number && errors.serial_number ? (
                      <span className='smallText redText boldText' id='serialNumberError'>{errors.serial_number}</span>
                      ) :<span className='smallText'>This is typically an IMEI</span>}
                  </Grid>
                  {/* <Grid xs={12} md={12} item>
                    <hr className='hr my-4'/>
                      <h4 className='my-3'>Initialize from Template</h4>
                        <select className={'styledSelect'} onChange={(event)=>initializeFromTemplate(event)}>
                          {filteredTemplateInstrumentsOptions}
                        </select>
                        <p className='smallText greyText1 boldText'>Select an existing instrument to autofill the details below</p>
                        <hr className='hr my-4'/>
                  </Grid> */}
                  <Grid xs={12} xl={12} item >
                    <span className='inputSelectLabel'>Avatar</span>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        {/* {!imageBlob?<WifiTetheringOutlinedIcon fontSize='large'/>:<InstrumentAvatar url={imageBlob.href}/>} */}
                        {/* <button onClick={(e)=>{triggerAvatarModal(e)}} className={'textButton mx-3'} >{!imageBlob?<span>Upload Avatar</span>:<span>Change Avatar</span>}</button> */}
                      </div>
                  </Grid>
                 
                  <Grid xs={12} xl={12} item>
                   <span className='inputSelectLabel'>Cloud Database</span>
                    {/* {instrumentDetails?.data_model?.configured?
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
                    } */}
                    {/* {instrumentDetails?.data_model?.configured?
                    <span className='smallText'>Your instruments database is successfully configured. Once you save this instrument, you can create a deployment and start adding data.</span>
                    :
                    <span className='smallText'>Once you configure your Cloud Database, you can create a deployment and and start adding data.</span>
                    } */}
                  </Grid>
                  <Grid xs={12} xl={12} item>
                      <div className='inputSelectLabel'>Description<span className='greyText3 smallText ms-2'>(optional)</span></div>
                      <textarea 
                      id='description' 
                      name='description'
                      className='styledTextArea small single' 
                      placeholder='What kind of instrument is this?' 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      />
                      {touched.description && errors.description ? (
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
                      onChange={handleChange}
                      onBlur={handleBlur}
                      />
                      {touched.notes && errors.notes ? (
                      <span className='smallText redText boldText' id='notesError'>{errors.notes}</span>
                      ) :null}
                  </Grid>      
              </Grid>
              {avatarUploadOpen?<AvatarImageSelector setAvatarUploadOpen={setAvatarUploadOpen} setImageBlob={setImageBlob}/>:''}
              <div className={'rightButtonGroup'}>
                <Link className='textButton me-3' href={'/'}>Cancel</Link>
                <button type="submit" className='greenButton saveButton' disabled={isSubmitting || !isValid}>{isSubmitting?'Saving....':'Save Instrument'}</button>
              </div>
            {dataModelModalOpen?
            <InstrumentDataModelModal 
              setDataModelModalOpen={setDataModelModalOpen} 
              templateInstrument={templateInstrument} 
              instrumentDetails={instrumentDetails}
              setInstrumentDetails={setInstrumentDetails}
              />:
              ''}
        </Container>
    </Form>
  )
}