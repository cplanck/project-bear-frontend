import Container from '@mui/material/Container';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import styles from './Dashboard.module.css'

function Tab(props){
    return(
        <div className={styles.tab}>
            <button id={props.name + 'Button'} className={styles.tabCell} onClick={()=>{props.updatePage(props.id)}}>
                    <props.Icon fontSize={'small'} style={{marginRight: '5px'}}/> 
                    {props.name}
                    {props.number? <span className={styles.tabNumber}>{props.number}</span>:""}
            </button>
            {props.id == props.page?<div className={styles.tabUnderline}></div>:''}
        </div>
    )
}

export default function DashboardTabs(props){

    return(
        <div style={{width: '100%'}} className={props.className}>
            <Container maxWidth={'none'} className={styles.tabContainer}>
                <div className={styles.tabWrapper} id='tabWrapper'>
                    <Tab id={'overview'} updatePage={props.updatePage} name='Overview' page={props.page} Icon={DvrOutlinedIcon}/>
                    <Tab id={'instruments'} updatePage={props.updatePage} name='Instruments'  page={props.page}  Icon={PodcastsIcon} number={props.userOverview.instruments}/>
                    <Tab id={'deployments'} updatePage={props.updatePage} name='Deployments' page={props.page} Icon={FlightTakeoffOutlinedIcon} number={props.userOverview.deployments}/>
                    {/* <Tab id={'data-models'} updatePage={props.updatePage} name='Data Models'  page={props.page}  Icon={AccountTreeIcon} number={props.userOverview.data_models}/> */}
                    <Tab id={'projects'} updatePage={props.updatePage} name='Projects'  page={props.page}  Icon={FolderSharedIcon} number={props.userOverview.projects}/>
                </div>
            </Container>
            <hr className='hr'></hr>
        </div>
    )
}