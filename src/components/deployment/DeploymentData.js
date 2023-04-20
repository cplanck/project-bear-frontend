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
import { CSVLink, CSVDownload } from "react-csv";
import { useRouter } from 'next/router'


export default function DeploymentData(props){

    const data = [
        {
          name: 'John',
          lastName: 'Doe',
          address: '261 Erdman Ford',
          city: 'East Daphne',
          state: 'Kentucky',
          id: 10
        },
        {
            name: 'Jane',
            lastName: 'Doe',
            address: '769 Dominic Grove',
            city: 'Columbus',
            state: 'Ohio',
            id: 11
        },
        {
          name: 'Joe',
          lastName: 'Doe',
          address: '566 Brakus Inlet',
          city: 'South Linda',
          state: 'West Virginia',
          id: 12
        },
        {
          name: 'Kevin',
          lastName: 'Vandy',
          address: '722 Emie Stream',
          city: 'Lincoln',
          state: 'Nebraska',
          id: 13
        },
        {
          name:'Joshua',
          lastName: 'Rolluffs',
          address: '32188 Larkin Turnpike',
          city: 'Charleston',
          state: 'South Carolina',
          id: 14
        },
      ];

    const router = useRouter()
    let pageId = router.pathname
    console.log(router)

    const [dataModalOpen, setDataModalOpen] = useState(false)
    return(
         <div className={depstyles.deploymentDetailsTableWrapper}>
            <div className={depstyles.deploymentDetailsTableRow}>
                <span className='boldText'>Database</span>
                <button onClick={(e)=>{setDataModalOpen(true); e.preventDefault()}} className={['darkThemeBlueText', 'textButton'].join(" ")}><TableViewIcon className={['darkThemeBlueText'].join(' ')} style={{paddingRight: '5px'}} fontSize='small'/>View and Edit</button>
            </div>
            <div className={depstyles.deploymentDetailsTableRow}>
                <span className='boldText'>CSV</span>
                <CSVLink filename={props.deployment.name + '.csv'} className={['darkThemeBlueText', 'textButton'].join(" ")} data={data}><DownloadIcon className={['darkThemeBlueText'].join(' ')} style={{paddingRight: '5px'}} fontSize='small'/>Download</CSVLink>
            </div>
            <DataTable open={dataModalOpen} setDataModalOpen={setDataModalOpen}/>
        </div>
    )
}

function DataTable(props){
    return(
    <Modal open={props.open}  aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" maxWidth={'100px'}>
            <div className={styles.dataModalWrapper}>
                <div className={styles.dataModalContainer}>
                    <div className={styles.editModalHeader}>
                        <span className='boldText'>Deployment Database</span>
                        <button className='iconButton' onClick={() => {props.setDataModalOpen(false)}}><CloseOutlinedIcon fontSize={'small'} className='iconButton'/></button>
                    </div>
                    <BasicDataTable/>
                </div>
            </div>
    </Modal>
    )
}


