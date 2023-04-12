import dbstyles from './Dashboard.module.css'
import Grid from '@mui/material/Grid';
import Link from 'next/link'
import { useContext } from 'react';
import { DeploymentContext } from '../../components/Context'

function TagsList(props){
    let tagList = []
    for(let i = 0; i<props.instrument.tags.length; i++){
        tagList.push(<div className={dbstyles.tag} style={{backgroundColor: `${props.instrument.tags[i]['color']}` + '80', border: `2px solid ${props.instrument.tags[i]['color']}` + '70'}}><span className={dbstyles.tagText}>{props.instrument.tags[i]['name']}</span></div>)
    }

    return(<div className={dbstyles.tagList}>{tagList}</div>)
}

function CollaboratorAvatar(props){
    return(<div className={dbstyles.collaborators} style={{backgroundImage: `url(${props.user.avatar})`}}></div>)
}

function CollaboratorsList(props){
    let collaboratorsList = props.instrument.collaborators.map((collaborator)=><CollaboratorAvatar key={collaborator} user={collaborator}/>)
    return(<div className={dbstyles.collaboratorsList}>{collaboratorsList}</div>)
}

export default function Deployments(props){

    const [deploymentContext, setDeployments] = useContext(DeploymentContext);
    
    let deployments = !props.listAll?deploymentContext.filter((deployment)=>deployment['instrument_id']==props.instrument.id):deploymentContext

    function formatDate(date){
        let formattedDate = new Date(date).toLocaleDateString(
            'en-gb',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }
        ); 
        return(formattedDate)
    }

    

    function Deployment(props){
        return(       
            <Grid item sm={12}  className={dbstyles.cardWrapper}>
                <div className={[dbstyles.card, 'darkThemeDarkText'].join(" ")}>
                     <div className='overViewStatusStar'>
                        <Link href={'/deployment/' + props.deployment.id}><h4 className={[dbstyles.cardTitle, 'darkThemeBlueText', 'removeHeaderMargin'].join(" ")}>{props.deployment.name}</h4></Link>
                        <span className='overviewDeploymentCardPrivacy'>{props.deployment.privacy.charAt(0).toUpperCase()+ props.deployment.privacy.slice(1)}</span>
                     </div>
                     <span className='smallText mt-3'><span className='boldText'>Last updated:</span> {formatDate(props.deployment.purchase_date)}</span>
                     {props.deployment.description?<p className={dbstyles.description}>{props.deployment.description}</p>:''}
                     <div className={dbstyles.bottomDetailsWrapper}>
                        <div className={dbstyles.instrumentType}>
                            <div className='instrumentColor' style={{backgroundColor: props.deployment.instrument_color}}></div>
                            {props.deployment.instrument}
                        </div>
                    </div>
                    {props.deployment.tags?<TagsList instrument={props.deployment}/>:''}
                    {props.deployment.collaborators?<CollaboratorsList instrument={props.deployment}/>:''}
                </div>
                <hr className='hr'></hr>
            </Grid> 
        )
    }

    function SearchDeployments(props){
    
        return(
        <Grid container spacing={1} className={dbstyles.searchWrapper}>
            <Grid item xs={12} >
                <input className={[dbstyles.search, 'styledInput', 'small'].join(" ")} placeholder={'Search Deployments'}></input>
            </Grid>
        </Grid>
        )
    }

    let deploymentArray = deployments.map((deployment, index)=><Deployment key={index} deployment={deployment}/>)

    return(
        <div style={{border: '0px solid blue', maxWidth: '1800px'}}>
            {props.searchBar?<SearchDeployments/>:''}
            <h3 className='removeHeaderMargin'>Deployments</h3>
                <Grid container spacing={0}>
                    {deploymentArray}
                </Grid>
        </div>
    )
}