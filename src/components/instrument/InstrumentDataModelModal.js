import Modal from '@mui/material/Modal';
import dbstyles from '../dashboard/Dashboard.module.css'
import styles from '../instrument/Instrument.module.css'
import { Container } from '@mui/system';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import AddDataModelForm from '../forms/AddDataModelForm';
// import AddDataModelForm from '../forms/AddDataModel/AddDataModelForm';
import AddDataModelForm from '../forms/AddDataModelRedux/AddDataModelForm';
import { useState } from 'react';



export default function InstrumentDataModelModal(props){

    const [okayToSave, setOkayToSave] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const handleSubmission = ()=>{

    }

    return(
        <Modal open={open}  aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Container className={styles.editModalWrapper} maxWidth={'lg'}>
            <div className={styles.editModalHeader}>
                <span className='boldText'>Configure Instrument Database</span>
                <button className='iconButton' onClick={() => {props.setDataModelModalOpen(false)}}><CloseOutlinedIcon fontSize={'small'} className='iconButton'/></button>
            </div>
            <div className={styles.editModalBody}>
               <AddDataModelForm 
                templateInstrument={props.templateInstrument} 
                okayToSave={okayToSave} 
                setOkayToSave={setOkayToSave}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                />
            </div>
            <div className={styles.editModalFooter}>
                <div className={styles.modalButtonGroup}>
                    <button className='textButton' onClick={()=>{props.setDataModelModalOpen(false)}}>Cancel</button>
                    {okayToSave && !isEditing?
                    <button className='greenButton' onClick={() => {handleSubmission()}}>Configure Database</button>
                    :
                    <button disabled className='greyButton'>Configure Database</button>
                    }
                </div>
            </div>
        </Container>
      </Modal>
    )
}