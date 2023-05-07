import dbstyles from './Dashboard.module.css'
import Grid from '@mui/material/Grid';
import Link from 'next/link'
import Image from 'next/image';
import { useContext, useState } from 'react';
import { DeploymentContext } from '@/components/Context'
import InstrumentAvatar from "../instrument/InstrumentAvatar";
import DeploymentTags from '@/components/deployment/DeploymentTags'
import ModifyButtonStar from '@/components/dashboard/ModifyButtonStar'
import structuredClone from "@ungap/structured-clone";
import SortButton from './SortButton';
import * as dayjs from 'dayjs'

function CollaboratorAvatar(props){
    return(<div className={dbstyles.collaborators} style={{backgroundImage: `url(${props.user.avatar})`}}></div>)
}

function CollaboratorsList(props){
    let collaboratorsList = props.instrument.collaborators.map((collaborator, index)=><CollaboratorAvatar key={index} user={collaborator}/>)
    return(<div className={dbstyles.collaboratorsList}>{collaboratorsList}</div>)
}

export default function Deployments(props){

    const [deploymentContext, setDeployments] = useContext(DeploymentContext);
    let deployments = !props.listAll?deploymentContext.filter((deployment)=>deployment.instrument.id==props.instrument.id):deploymentContext
    const [sortBy, setSortBy] = useState('starred')

    const advancedFormat = require('dayjs/plugin/advancedFormat')
    dayjs.extend(advancedFormat)

    function Deployment(props){

        const endDate = props.deployment.deployment_end_date? dayjs(props.deployment.deployment_end_date).format('MMMM D, YYYY'):'Present'

        return(       
            <Grid item sm={12}  className={dbstyles.cardWrapper}>
                <div className={[dbstyles.card, 'darkThemeDarkText'].join(" ")}>
                    <div className='flexCenterSpaceBetween'>
                        <div className='overViewStatusStar'>
                            <Link href={'/deployment/' + props.deployment.id}><h4 className={[dbstyles.cardTitle, 'darkThemeBlueText', 'removeHeaderMargin'].join(" ")}>{props.deployment.name}</h4></Link>
                            <span className='overviewDeploymentCardPrivacy'>{props.deployment.private?'Private':'Public'}</span>
                        </div>
                       <ModifyButtonStar type={'deployment'} item={props.deployment}/>
                    </div>
                    <span className='smallText mt-3'><span className='boldText'> Active from </span> {dayjs(props.deployment.deployment_start_date).format('MMMM D, YYYY')} - {endDate}</span>

                     <div className={dbstyles.bottomDetailsWrapper}>
                    </div>
                    <div className='flexCentered'>
                        <InstrumentAvatar base64={true} size={'small'} url={props.deployment.instrument?.avatar}/>
                        <span className='smallText boldText'>{props.deployment.instrument?.name}</span>
                    </div>
                    
                    <div className='flexCenterSpaceBetween'>
                        {props.deployment.tags?<DeploymentTags deployment={props.deployment}/>:''}
                        {props.deployment.collaborators?<CollaboratorsList instrument={props.deployment}/>:''}
                    </div>
                    {/* <span className='extraSmallText mt-3'><span className='boldText'> Active from </span> {dayjs(props.deployment.deployment_start_date).format('MMMM D, YYYY')} - {endDate}</span> */}
                </div>
                <hr className='hr'></hr>
            </Grid> 
        )
    }

    function SearchDeployments(props){
    
        return(
        <Grid container spacing={1} className={dbstyles.searchWrapper}>
            <Grid item xs={5} >
                <input className={[dbstyles.search, 'styledInput', 'small'].join(" ")} placeholder={'Search Deployments'}></input>
            </Grid>
        </Grid>
        )
    }

    let sortedDeployments = structuredClone(deployments)
    if(sortBy == 'last_modified'){
        sortedDeployments.sort((a, b) => (a.last_modified > b.last_modified) ? -1 : 1)
    }
    else{
        sortedDeployments.sort((a, b) => (a.starred_date > b.starred_date) ? -1 : 1)
    }

    let deploymentArray = sortedDeployments.map((deployment, index)=><Deployment key={index} deployment={deployment}/>)

    return(
        <div style={{border: '0px solid blue', maxWidth: '1800px'}}>
            <div className={dbstyles.sortHeaderWrapper}>
                <div className={dbstyles.sortHeader}>
                    <h4 className='removeHeaderMargin'>Your Deployments</h4>
                    <SortButton setSortBy={setSortBy}/>
                </div>
            </div>
            <Grid container spacing={0}>
                {deploymentArray}
            </Grid>
        </div>
    )
}