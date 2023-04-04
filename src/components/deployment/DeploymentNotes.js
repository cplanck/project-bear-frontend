import styles from './Deployment.module.css'

export default function DeploymentNotes(props){
    return(
        <div className={styles.deploymentNotesWrapper}>
            {props.deployment.notes}
        </div>
    )
}