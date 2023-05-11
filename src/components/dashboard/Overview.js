import Grid from '@mui/material/Grid';
import Link from 'next/link'
import { useContext } from 'react';
import { DeploymentContext, InstrumentContext, DataAvailableContext } from '@/components/Context'
import InstrumentAvatar from '@/components/instrument/InstrumentAvatar';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import IntroStepper from '@/components/dashboard/IntroStepper'
import styles from '@/components/dashboard/Instruments.module.css';
import dbstyles from '@/components/dashboard/Dashboard.module.css';
import { Container } from '@mui/system';
import * as dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast';



export default function Overview(){

    let { instrumentsLoading, instrumentError, data: instruments } = useQuery({ queryKey: ['/instruments']})
    let { isLoading, error, data: deployments } = useQuery({ queryKey: ['/deployments'] })

    var advancedFormat = require('dayjs/plugin/advancedFormat')
    dayjs.extend(advancedFormat)
   
    let projects = [{'name': 'Nain Community Deployment 2021', 'description': 'SIMB3s, SAMs buoys, etc. '},{'name': 'SIDEx 2023', 'description': 'US Army  SIDEx project in collaboration with Ted, Andy, and Mark'}]

    function DeploymentPanel(props){

        const endDate = props.deployment.deployment_end_date? dayjs(props.deployment.deployment_end_date).format('MMMM D, YYYY'):'Present'

        return(
            <Grid item sm={12} md={6} className={'overviewDeploymentCardWrapper'}>
                <div className={'overviewDeploymentCard darkThemeDarkText'}>
                    <div className='overViewStatusStar'>
                        <Link href={'/deployment' + '/' + props.deployment.id}><h4 className='darkThemeBlueText removeHeaderMargin overviewCardDeploymentTitle'>{props.deployment.name}</h4></Link>
                        <span className='overviewDeploymentCardPrivacy'>{props.deployment.private?'Private':'Public'}</span>
                    </div>
                    {/* <span className='smallText'>{props.deployment.location}</span> */}
                    <span className='boldText smallText me-2'> Active from </span> {dayjs(props.deployment.deployment_start_date).format('MMMM D, YYYY')} - {endDate}

                    <p className='overviewDeploymentDescription'>{props.deployment.description}</p>
                    <div className='deploymentInstrumentType'>
                        {/* {props.deployment.type}
                        {props.deployment.instrument.name} */}
                        <span className='boldText me-2'> Active from </span> {dayjs(props.deployment.deployment_start_date).format('MMMM D, YYYY')} - {endDate}
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
                            {/* {props.instrument.active_deployment.name? <span className='overviewDeploymentCardStatus'>{props.instrument.active_deployment.name?'Deployed':''}</span>:''} */}
                        </div>
                    </div>
                    <p className='overviewDeploymentDescription'>
                        {props.instrument.description}
                    </p>
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

        function Toast(){
        return(
            <div>
                This is a <strong>Toast</strong>
            </div>
        )
        }

    const deploymentArray = deployments?.results.map((deployment, i)=><DeploymentPanel key={i} deployment={deployment}/>)
    const instrumentArray = instruments?.results.map((instrument, i)=><InstrumentPanel key={i} instrument={instrument}/>)
    const projectArray = projects.map((project, i)=><ProjectPanel key={i} project={project}/>)

    return(
        instrumentArray?.length != 0?
        <div className='flexCenterAndCenter' style={{border: '0px solid red'}}>
            <div maxWidth={false} style={{maxWidth: '1200px', width: '100%', border: '0px solid blue'}}>
                <h4 className='' style={{margin: '0px 0px 10px 0px'}}>Top Instruments</h4>
                <Grid container spacing={3}>
                    {instrumentArray}
                </Grid>
                <h4 className='' style={{margin: '20px 0px 10px 0px'}}>Recent Deployments</h4>
                <Grid container spacing={3}>
                    {deploymentArray}
                </Grid>
            </div>
        </div>
        :
        <Grid container spacing={3}>
            <Grid item lg={8}>
                <div className={[dbstyles.overviewInstructionCard, dbstyles.lightGreyCard].join(' ')}>
                    <h2 className='removeHeaderMargin'>Manage data from your scientific instruments deployed worldwide.</h2>
                    {/* <span className='my-3'>Add an instrument to manage deployments, create a real-time database, and organize your media and permissions.</span> */}
                    {/* <span className='my-3'>Add an instrument to create a real-time database, manage your data, permissions, and files from one centralized location.</span> */}
                    {/* <span>Add data any data in real-time from any instrument from one centralized location.</span> */}
                    <span className='my-3'>BitBear centralizes or new instruments to create a real-time database, manage permissions, collaborators, and media from one centralized location.</span>
                        <Link href={'/instrument/add'}>
                            <button  className={'greyButton my-3'}>
                                Get started
                            </button>
                        </Link>
                </div>
            </Grid>
            <Grid item lg={4}>
                <IntroStepper/>
            </Grid>
        </Grid>
    )
}