import styles from './Deployment.module.css'
import * as dayjs from 'dayjs'

export default function DeploymentDetailsTable(props){
    return(
        <>
            <div className={styles.deploymentDetailsTableWrapper}>
                <div className={styles.deploymentDetailsTableRow} style={{backgroundColor: 'var(--dark-theme-header)', borderTopLeftRadius: '6px', borderTopRightRadius: '6px'}}>
                    <span className='boldText'>{props.deployment.name}</span>
                    <button className='greyButton' onClick={()=>{props.setIsEditing(true)}}>Modify</button>
                </div>
                <div className={styles.deploymentDetailsTableRow}>
                    <span className='boldText'>Location</span>
                    <span className='greyText2'>{props.deployment.location}</span>
                </div>
                <div className={styles.deploymentDetailsTableRow}>
                    <span className='boldText'>Last Transmission</span>
                    <span className='greyText2'>23 minutes ago</span>
                </div>
                <div className={styles.deploymentDetailsTableRow}>
                    <span className='boldText'>Status</span>
                    <span className='greyText2'>Active</span>
                </div>
                <div className={styles.deploymentDetailsTableRow}>
                    <span className='boldText'>Deployment Start</span>
                    <span className='greyText2'>{dayjs(props.deployment.deployment_start_date).format('MMMM DD, YYYY')}</span>
                </div>
                <div className={styles.deploymentDetailsTableRow}>
                    <span className='boldText'>Deployment End</span>
                    <span className='greyText2'>{dayjs(props.deployment.deployment_end_date).format('MMMM DD, YYYY')}</span>
                </div>
            </div>
        </>
    )
}