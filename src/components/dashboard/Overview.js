import Grid from '@mui/material/Grid';
import Link from 'next/link'

export default function Overview(){

    let deployments = [{'name': 'CIS 2021 #3000000000', 'id': '1', 'description': 'Located in Nain, NF, this SIMB3 was deployed on Sept 29 2022 in shallow water.Located in Nain, NF, this SIMB3 was deployed on Sept 29 2022 in shallow water. Expected operational lifespan of 200 days.', 'type': 'SIMB3','instrument_color':'#1e20b0', 'status': 'active', 'purchase_date': '2023-03-03 17:11:43.776674', 'privacy': 'public'},
    {'name': 'CIS UpTempO 2021 #5', 'id': '2', 'description': 'Located in Nain, NF, this SIMB3 was deployed on Sept 29 2022 in shallow water. Expected operational lifespan of 200 days.', 'type': 'UpTempO','instrument_color':'#ffea00', 'status': 'inactive', 'purchase_date': '2023-03-03 17:11:43.776674', 'privacy': 'private'},
    {'name': 'Dartmouth 2021 #2', 'id': '3', 'description': 'Located in Nain, NF, this SIMB3 was deployed on Sept 29 2022 in shallow water. Expected operational lifespan of 200 days.', 'type': 'SIMB3','instrument_color':'#1e20b0', 'status': 'inactive', 'purchase_date': '2023-03-03 17:11:43.776674', 'privacy': 'private'},
    {'name': 'Dartmouth 2019 #6', 'id': '4', 'description': 'Located in Nain, NF, this SIMB3 was deployed on Sept 29 2022 in shallow water. Expected operational lifespan of 200 days.', 'type': 'SIMB3','instrument_color':'#1e20b0', 'status': 'active', 'purchase_date': '2023-03-03 17:11:43.776674', 'privacy': 'public'}]

    let instruments = [{'name': 'CIS 2021 #3', 'description': 'Located in Nain, NF, this SIMB3 was deployed on Sept 29 2022 in shallow water. Expected operational lifespan of 200 days.', 'type': 'SIMB3', 'status': 'active', 'purchase_date': '2023-03-03 17:11:43.776674'},
    {'name': 'CIS UpTempO 2021 #5', 'description': 'Located in Nain, NF, this SIMB3 was deployed on Sept 29 2022 in shallow water. Expected operational lifespan of 200 days.', 'type': 'UpTempO', 'status': 'inactive', 'purchase_date': '2023-03-03 17:11:43.776674'},
    {'name': 'Dartmouth 2021 #2', 'description': 'Located in Nain, NF, this SIMB3 was deployed on Sept 29 2022 in shallow water. Expected operational lifespan of 200 days.', 'type': 'SIMB3', 'status': 'inactive', 'purchase_date': '2023-03-03 17:11:43.776674'},
    {'name': 'Dartmouth 2019 #6', 'description': 'Located in Nain, NF, this SIMB3 was deployed on Sept 29 2022 in shallow water. Expected operational lifespan of 200 days.', 'type': 'SIMB3', 'status': 'active', 'purchase_date': '2023-03-03 17:11:43.776674'}]

    let projects = [{'name': 'Nain Community Deployment 2021', 'description': 'SIMB3s, SAMs buoys, etc. '},{'name': 'SIDEx 2023', 'description': 'US Army  SIDEx project in collaboration with Ted, Andy, and Mark'}]

    function Deployment(props){
        return(
            <Grid item sm={12} md={6} className={'overviewDeploymentCardWrapper'}>
                <div className={'overviewDeploymentCard darkThemeDarkText'}>
                    <div className='overViewStatusStar'>
                        <Link href={'/deployment' + '/' + props.deployment.id}><h4 className='darkThemeBlueText removeHeaderMargin overviewCardDeploymentTitle'>{props.deployment.name}</h4></Link>
                        <span className='overviewDeploymentCardPrivacy'>{props.deployment.privacy.charAt(0).toUpperCase()+ props.deployment.privacy.slice(1)}</span>
                    </div>
                    <p className='overviewDeploymentDescription'>{props.deployment.description}</p>
                    <div className='deploymentInstrumentType'>
                        <div className='instrumentColor' style={{backgroundColor: props.deployment.instrument_color}}></div>
                        {props.deployment.type}
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

    let deploymentArray = deployments.map((deployment)=><Deployment deployment={deployment}/>)

    let projectArray = projects.map((project)=><ProjectPanel project={project}/>)

    return(
        <div>
            <h4 className='removeHeaderMargin'>Recent Deployments</h4>
            <Grid container spacing={0}>
                {deploymentArray}
            </Grid>
            <h4 className='removeHeaderMargin'>Projects</h4>
            <Grid container spacing={0}>
                {projectArray}
            </Grid>
        </div>
    )
}