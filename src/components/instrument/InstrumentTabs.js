import Container from '@mui/material/Container';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined';
import PodcastsIcon from '@mui/icons-material/Podcasts';

function Tab(props){
    return(
        <div className='tab'>
            <button className={'tabCell'} onClick={()=>{props.updatePage(props.id)}}>
                    <props.Icon fontSize={'small'} style={{marginRight: '5px'}}/> 
                    {props.name}
                    {props.number? <span className='tabNumber'>{props.number}</span>:''}
            </button>
            {props.id == props.page?<div className='tabUnderline'></div>:''}
        </div>
    )
}

export default function InstrumentTabs(props){
    return(
        <div style={{width: '100%'}}>
            <div className='tabWrapper'>
                <Tab id={''} updatePage={props.updatePage} name='Details' page={props.page} Icon={DvrOutlinedIcon}/>
                <Tab id={'deployments'} updatePage={props.updatePage} name='Deployments' page={props.page} Icon={FlightTakeoffOutlinedIcon}/>
                <Tab id={'data'} updatePage={props.updatePage} name='Data'  page={props.page}  Icon={PodcastsIcon}/> 
                <Tab id={'media'} updatePage={props.updatePage} name='Media'  page={props.page}  Icon={AccountTreeIcon}/>
            </div>
            <hr className='hr'></hr>
        </div>
    )
}