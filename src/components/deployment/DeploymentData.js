import TableViewIcon from '@mui/icons-material/TableView';
import DownloadIcon from '@mui/icons-material/Download';

import styles from './Deployment.module.css'


export default function DeploymentData(props){
    return(
         <div className={styles.deploymentDetailsTableWrapper}>
            <div className={styles.deploymentDetailsTableRow}>
                <span className='boldText'>Database</span>
                <button className={['darkThemeBlueText', 'textButton'].join(" ")}><TableViewIcon className={['darkThemeBlueText'].join(' ')} style={{paddingRight: '5px'}} fontSize='small'/>View and Edit</button>
            </div>
            <div className={styles.deploymentDetailsTableRow}>
                <span className='boldText'>CSV</span>
                <button className={['darkThemeBlueText', 'textButton'].join(" ")}><DownloadIcon className={['darkThemeBlueText'].join(' ')} style={{paddingRight: '5px'}} fontSize='small'/>Download</button>
            </div>
        </div>
    )
}