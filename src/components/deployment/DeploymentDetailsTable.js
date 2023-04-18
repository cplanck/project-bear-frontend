import styles from './Deployment.module.css'
import * as dayjs from 'dayjs'

export default function DeploymentDetailsTable(props){
    console.log(props)
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
                    {props.deployment.status == 'active'?
                    <span className='greenText'>Active</span>
                    :
                    <span className='greyText2'>{props.deployment.status.charAt(0).toUpperCase() + props.deployment.status.slice(1)}</span>
                }
                </div>
                <div className={styles.deploymentDetailsTableRow}>
                    <span className='boldText'>Deployment Start</span>
                    <span className='greyText2'>{dayjs(props.deployment.deployment_start_date).isValid()?dayjs(props.deployment.deployment_start_date).format('MMMM DD, YYYY'):''}</span>
                </div>
                {props.deployment.deployment_end_date?
                <div className={styles.deploymentDetailsTableRow}>
                    <span className='boldText'>Deployment End</span>
                    <span className='greyText2'>{dayjs(props.deployment.deployment_end_date).isValid()?dayjs(props.deployment.deployment_end_date).format('MMMM DD, YYYY'):''}</span>
                </div>
                :
                ''}
            </div>
        </>
    )
}