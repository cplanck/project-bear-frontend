import styles from '@/components/deployment/Deployment.module.css'
import EditDeploymentForm from '@/components/forms/EditDeploymentForm';
import { InstrumentContext, DeploymentContext } from '@/components/Context'
import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router';

export default function DeploymentDetails(props){

    const [isEditing, setIsEditing] = useState(false)
    const [instruments, setInstruments] = useContext(InstrumentContext);
    const [deployments, setDeployments] = useContext(DeploymentContext);
    const [deployment, setDeployment] = useState(null)
    const router = useRouter()

    useEffect(()=>{
        if(router.isReady){
            const deployment = deployments.filter(deployment=>deployment.id == router.query.id)
            setDeployment(deployment[0])
        }
    })

    return(
    <div className={[styles.panelWrapper]}>
        {deployment?<EditDeploymentForm instruments={instruments} setInstruments={setInstruments} deployments={deployments} setDeployments={setDeployments} deployment={deployment} setIsEditing={setIsEditing}/>:''}
    </div>
    )
}
