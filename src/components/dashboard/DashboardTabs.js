import Container from '@mui/material/Container';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import { useQuery } from '@tanstack/react-query'
import { LineWave } from  'react-loader-spinner'
import styles from './Dashboard.module.css'

function Tab(props){
    return(
        <div className={styles.tab}>
            <button id={props.name + 'Button'} className={styles.tabCell} onClick={()=>{props.updatePage(props.id)}}>
                    <props.Icon fontSize={'small'} style={{marginRight: '5px'}}/> 
                    {props.name}
                    {props.addCount?<span className={styles.tabNumber}>{props.number?props.number:''}</span>:''}
            </button>
            {props.id == props.page?<div className={styles.tabUnderline}></div>:<LineWave height="10" width="10" color="#4fa94d" ariaLabel="line-wave" visible={true}/>}
        </div>
    )
}

export default function DashboardTabs(props){

    const {data: instruments } = useQuery({ queryKey: ['/instruments']})
    const {data: deployments } = useQuery({ queryKey: ['/deployments']})

    return(
        <div style={{width: '100%'}} className={props.className}>
            <Container maxWidth={'none'} className={styles.tabContainer}>
                <div className={styles.tabWrapper} id='tabWrapper'>
                    <Tab id={'overview'} updatePage={props.updatePage} name='Overview' page={props.page} Icon={DvrOutlinedIcon}/>
                    <Tab id={'instruments'} updatePage={props.updatePage} name='Instruments'  page={props.page}  Icon={PodcastsIcon} number={instruments?.count} addCount={true}/>
                    <Tab id={'deployments'} updatePage={props.updatePage} name='Deployments' page={props.page} Icon={FlightTakeoffOutlinedIcon} number={deployments?.count} addCount={true}/>
                    <Tab id={'projects'} updatePage={props.updatePage} name='Projects'  page={props.page}  Icon={FolderSharedIcon} number={props.userOverview.projects} addCount={true}/>
                </div>
            </Container>
            <hr className='hr'></hr>
        </div>
    )
}

