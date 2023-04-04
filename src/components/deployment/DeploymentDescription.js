import styles from './Deployment.module.css'

export default function DeploymentDescription(props){
    return(
        <div className={styles.deploymentDescriptionWrapper}>
            {props.deployment.description}
        </div>
    )
}