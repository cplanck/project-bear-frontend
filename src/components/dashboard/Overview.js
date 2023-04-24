import Grid from '@mui/material/Grid';
import Link from 'next/link'
import { useContext } from 'react';
import { DeploymentContext, InstrumentContext, DataAvailableContext } from '@/components/Context'
import InstrumentAvatar from '@/components/instrument/InstrumentAvatar';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import styles from '@/components/dashboard/Instruments.module.css'
import * as dayjs from 'dayjs'

export default function Overview(){

    var advancedFormat = require('dayjs/plugin/advancedFormat')
    dayjs.extend(advancedFormat)

    const [deployments, setdDeployments] = useContext(DeploymentContext)
    const [instruments, setInstruments] = useContext(InstrumentContext)
   
    let projects = [{'name': 'Nain Community Deployment 2021', 'description': 'SIMB3s, SAMs buoys, etc. '},{'name': 'SIDEx 2023', 'description': 'US Army  SIDEx project in collaboration with Ted, Andy, and Mark'}]

    function DeploymentPanel(props){
        return(
            <Grid item sm={12} md={6} className={'overviewDeploymentCardWrapper'}>
                <div className={'overviewDeploymentCard darkThemeDarkText'}>
                    <div className='overViewStatusStar'>
                        <Link href={'/deployment' + '/' + props.deployment.id}><h4 className='darkThemeBlueText removeHeaderMargin overviewCardDeploymentTitle'>{props.deployment.name}</h4></Link>
                        <span className='overviewDeploymentCardPrivacy'>{props.deployment.private?'Private':'Public'}</span>
                    </div>
                    <span className='smallText'>{props.deployment.location}</span>
                    <p className='overviewDeploymentDescription'>{props.deployment.description}</p>
                    <div className='deploymentInstrumentType'>
                        {props.deployment.type}
                        {props.deployment.instrument.name}
                    </div>
                </div>
            </Grid>            
        )
    }

    function InstrumentPanel(props){

        const lastModified = dayjs(props.instrument?.last_modified); 
        const isToday = lastModified.isSame(dayjs(), 'day');
        const lastModifiedDate = isToday ? 'Today at ' + lastModified.format('h:mma') : lastModified.format('MMMM Do, YYYY');

        const dateAdded = dayjs(props.instrument?.date_added); 
        const dateAddedDate = isToday ? 'Today at ' + dateAdded.format('h:mma') : dateAdded.format('MMMM Do, YYYY');

        return(
            <Grid item sm={12} md={6} className={'overviewDeploymentCardWrapper'}>
                <div className={'overviewDeploymentCard darkThemeDarkText'}>
                    <div className='flexCenterSpaceBetween'>
                        <div className='flexCentered'>
                            <InstrumentAvatar base64={true} size={'small'} url={props.instrument.avatar}/>
                            <div>
                                <Link href={'/instrument' + '/' + props.instrument.id}><h4 className='darkThemeBlueText removeHeaderMargin overviewCardDeploymentTitle'>{props.instrument.name}</h4></Link>
                                <div className={['extraSmallText', styles.serialNumberOverview].join(' ')}>{props.instrument.serial_number}</div>
                            </div>
                        </div>
                        <div style={{border: '0px solid red', height: '100%', marginTop: '5px', padding: '0 5px 0 0px'}}>
                            {props.instrument.active_deployment.name? <span className='overviewDeploymentCardStatus'>{props.instrument.active_deployment.name?'Deployed':''}</span>:''}
                        </div>
                    </div>
                    <p className='overviewDeploymentDescription'>
                        {props.instrument.description}
                    </p>
                   
                    <div className='extraSmallText flexCenterFlexStart'>
                        <div><span className='boldText'>Created</span> {dateAddedDate}</div>
                        <span style={{padding: '0px 10px 0px 10px'}}>|</span>
                        <div><span className='boldText'>Last Updated</span> {lastModifiedDate}</div>
                    </div>
                </div>
            </Grid>
        )
    }

    function ProjectPanel(props){
        return(
            <Grid item sm={12} md={6} className={'overviewDeploymentCardWrapper'}>
                <div className={'overviewDeploymentCard darkThemeDarkText'}>
                    <div className='overViewStatusStar'>
                        <a href=''><h4 className='darkThemeBlueText removeHeaderMargin overviewCardDeploymentTitle'>{props.project.name}</h4></a>
                    </div>
                    <p className='overviewDeploymentDescription'>{props.project.description}</p>
                    <div className='deploymentInstrumentType'>
                    </div>
                </div>
            </Grid>            
        )
    }

    const deploymentArray = deployments.map((deployment, i)=><DeploymentPanel key={i} deployment={deployment}/>)
    const instrumentArray = instruments.map((instrument, i)=><InstrumentPanel key={i} instrument={instrument}/>)
    const projectArray = projects.map((project, i)=><ProjectPanel key={i} project={project}/>)

    return(
        <div>
             <h4 className='removeHeaderMargin'>Top Instruments</h4>
            <Grid container spacing={0}>
                {instrumentArray}
            </Grid>
            <h4 className='' style={{margin: '20px 0px 0px 0px'}}>Recent Deployments</h4>
            <Grid container spacing={0}>
                {deploymentArray}
            </Grid>
            {/* <h4 className='removeHeaderMargin'>Projects</h4>
            <Grid container spacing={0}>
                {projectArray}
            </Grid> */}
        </div>
    )
}