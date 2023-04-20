import styles from './Deployment.module.css'
import InstrumentAbout from '../instrument/InstrumentAbout'
import DeploymentHeading from './DeploymentHeading'
import DeploymentNotes from './DeploymentNotes'
import DeploymentDescription from './DeploymentDescription'
import DeploymentDetailsTable from './DeploymentDetailsTable'
import DeploymentDetailsEditPanel from './DeploymentDetailsEditPanel'
import EditDeploymentForm from '@/components/forms/EditDeploymentForm';
import DeploymentTags from './DeploymentTags'
import DeploymentData from './DeploymentData'
import PhotoGallery from '../images/PhotoGallery'
import { Grid } from '@mui/material'
import { InstrumentContext, DeploymentContext } from '@/components/Context'
import { useState, useContext } from 'react'

export default function DeploymentDetails(props){

    const [isEditing, setIsEditing] = useState(false)
    const [instruments, setInstruments] = useContext(InstrumentContext);
    const [deployments, setDeployments] = useContext(DeploymentContext);

    return(
    <div className={[styles.panelWrapper]}>
        <Grid container spacing={4} >
            <Grid item xs={12} sm={12} lg={8} xl={9}>
              <DeploymentHeading deployment={props.deployment}/>
              {!isEditing?
                <div>
                    <DeploymentDetailsTable deployment={props.deployment} setIsEditing={setIsEditing}/>
                    <h3 className='removeHeaderMargin'>Description</h3>
                    <DeploymentDescription deployment={props.deployment}/>
                    <h3 className='removeHeaderMargin'>Data</h3>
                    <DeploymentData deployment={props.deployment}/>
                    <h3 className='removeHeaderMargin'>Tags</h3>
                    <div className={styles.deploymentTagsWrapper}>{props.deployment.tags?<DeploymentTags deployment={props.deployment}/>:''}</div>
                    <h3 className='removeHeaderMargin'>Notes</h3>
                    <DeploymentNotes deployment={props.deployment}/>
                    <h3 className='removeHeaderMargin'>Images</h3>
                    <div className='my-3'>
                        <PhotoGallery/>
                    </div>
              </div>:
                <EditDeploymentForm instruments={instruments} setInstruments={setInstruments} deployments={deployments} setDeployments={setDeployments} deployment={props.deployment} setIsEditing={setIsEditing}/>
              }
            </Grid>
            <Grid item xs={12} lg={4} xl={3}>
                <InstrumentAbout type={'deployment'} instrument={props.instrument} setInstrument={props.setInstrument}/>
            </Grid>
        </Grid>
    </div>
    )
}
