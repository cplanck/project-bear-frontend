import TableViewIcon from '@mui/icons-material/TableView';
import DownloadIcon from '@mui/icons-material/Download';
import BasicDataTable from '@/components/datatable/BasicDataTable'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import dbstyles from '@/components/dashboard/Dashboard.module.css'
import styles from '@/components/instrument/Instrument.module.css'
import depstyles from './Deployment.module.css';
import Modal from '@mui/material/Modal';
import { Container } from '@mui/system';
import { useState } from 'react';


export default function DeploymentData(props){

    const [dataModalOpen, setDataModalOpen] = useState(false)
    return(
         <div className={depstyles.deploymentDetailsTableWrapper}>
            <div className={depstyles.deploymentDetailsTableRow}>
                <span className='boldText'>Database</span>
                <button onClick={(e)=>{setDataModalOpen(true); e.preventDefault()}} className={['darkThemeBlueText', 'textButton'].join(" ")}><TableViewIcon className={['darkThemeBlueText'].join(' ')} style={{paddingRight: '5px'}} fontSize='small'/>View and Edit</button>
            </div>
            <div className={depstyles.deploymentDetailsTableRow}>
                <span className='boldText'>CSV</span>
                <button className={['darkThemeBlueText', 'textButton'].join(" ")}><DownloadIcon className={['darkThemeBlueText'].join(' ')} style={{paddingRight: '5px'}} fontSize='small'/>Download</button>
                <DataTable open={dataModalOpen} setDataModalOpen={setDataModalOpen}/>
            </div>
        </div>
    )
}

function DataTable(props){
    return(
    <Modal open={props.open}  aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" maxWidth="100%" maxHeight="100vh">
            <Container className={styles.editModalWrapper} maxWidth={'100%'} maxHeight="100vh">
                <div className={styles.editModalHeader}>
                    <span className='boldText'>Deployment Database</span>
                    <button className='iconButton' onClick={() => {props.setDataModalOpen(false)}}><CloseOutlinedIcon fontSize={'small'} className='iconButton'/></button>
                </div>
                <BasicDataTable/>
            </Container>
    </Modal>
    )
}


