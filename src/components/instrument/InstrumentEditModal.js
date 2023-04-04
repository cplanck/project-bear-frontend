import styles from './Instrument.module.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ColorPicker from '../general/ColorPicker';
import { Container } from '@mui/system';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { InstrumentContext } from '../../components/Context'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function InstrumentEditModal(props) {

  const [open, setOpen] = useState(false);
  const [instrumentDetails, setInstrumentDetails] = useState(props.instrument)
  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [currentColor, setCurrentColor] = useState(props.instrument['instrument_color'])

  const [instruments, setInstruments] = useContext(InstrumentContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleUserInput(event, id){
      let updatedDetails = structuredClone(instrumentDetails)
      updatedDetails[id] = event.target.value
      setInstrumentDetails(updatedDetails)
  }

  useEffect(()=>{
    setInstrumentDetails(props.instrument)
  },[props.instrument])

  function handleSubmission(){
    console.log('saving!')
    console.log(instrumentDetails)
    // look through instrumentDetails and remove item with active ID, then add it back in with new information and pass this to setInstruments

    console.log(instrumentDetails)
    const temp = instruments.filter((instrument)=>{if(instrument.id!=instrumentDetails.id){return instrument}})
    console.log(temp)
    temp.push(instrumentDetails)
    setInstruments(temp)
    handleClose()
  }

  return (
    <div>
      <button className='iconButton'  onClick={handleOpen}>{props.button}</button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Container className={styles.editModalWrapper} maxWidth={'md'}>
            <div className={styles.editModalHeader}>
                <span className='boldText'>Edit Instrument</span>
                <button className='iconButton' onClick={handleClose}><CloseOutlinedIcon fontSize={'small'} className='iconButton'/></button>
            </div>
            <div className={styles.editModalBody}>
                <div className={styles.editInputGroup}>
                    <span className='inputSelectLabel'>Instrument Name</span>
                    <input id='name'  className='styledInput small' defaultValue={props.instrument.name} onChange={(e)=>{handleUserInput(e, 'name')}}></input>
                </div>
                <div className={styles.editInputGroup}>
                    <span className='inputSelectLabel'>Instrument ID</span>
                    <input className='styledInput small' disabled placeholder={'3004897687632'}/>
                </div>
                <div className={styles.editInputGroup}>
                    <span className='inputSelectLabel'>Data Model</span>
                    <input className='styledInput small' disabled placeholder={'SIMB3 with Bruncin Temp String'}/>
                </div>
                {/* <div className={styles.editInputGroup}>
                <span className='inputSelectLabel'>Color</span>
                    {colorPickerOpen?<ColorPicker setCurrentColor={setCurrentColor} setColorPickerOpen={setColorPickerOpen} updatedDeployment={instrumentDetails} setUpdatedDeployment={setInstrumentDetails} />:<button onClick={() => {setColorPickerOpen(!colorPickerOpen)}} style={{height: '20px', width: '100%', maxWidth: '100px', backgroundColor: currentColor, border: '0px', borderRadius: '6px'}}></button>}
                </div> */}
                <div className={styles.editInputGroup}>
                    <span className='inputSelectLabel'>Description</span>
                    <input id='description' className='styledInput small' defaultValue={props.instrument.description} onChange={(e)=>{handleUserInput(e, 'description')}}/>
                </div>
                <div className={styles.editInputGroup}>
                    <span className='inputSelectLabel'>Notes</span>
                    <textarea id='notes' className='styledTextArea' defaultValue={props.instrument.notes} onChange={(e)=>{handleUserInput(e, 'notes')}}/>
                </div>
            </div>
            <div className={styles.editModalFooter}>
                    <div className={styles.modalButtonGroup}>
                        <button className='textButton' onClick={()=>{handleClose()}}>Cancel</button>
                        <button className='greenButton' onClick={() => {handleSubmission()}}>Save Changes</button>
                    </div>
                   
            </div>
        </Container>
      </Modal>
    </div>
  );
}

// export default function InstrumentEditModal(props){
//     return(
//         <EditInstrumentModal button={props.button}/>
//     )
// }