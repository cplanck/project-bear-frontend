import styles from './Instrument.module.css'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import TableViewIcon from '@mui/icons-material/TableView';
import DownloadIcon from '@mui/icons-material/Download';
import SettingsIcon from '@mui/icons-material/Settings';
import ImagePanel from '../general/ImagePanel';
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
import { Grid } from '@mui/material';

function InstrumentMedia(props){

    let instrumentMedia = []
    for(let i = 0; i < props.instrumentMedia.length; i++){
        instrumentMedia.push( <Grid item md={6}><a><div className={styles.instrumentMediaThumbnail} style={{backgroundImage: `url(${props.instrumentMedia[i]['url']})`}}></div></a></Grid>)
    }

    return(<Grid container spacing={2}>{instrumentMedia}</Grid>)
}

export default function InstrumentAboutSmall(props){

    let instrument = {'name': 'SIMB3 2019 #1','id': '1112131415', 'data-model': 'Standard UpTempO', 'description': 'Standard UpTempo Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.', 'notes': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' ,'shortname': 'UpTempO', 'color': '#b80606','avatar': '', 'status': 'undeployed','starred': true, 'starred_date': '2023-03-03 17:11:43.776674', 'purchase_date': '2023-05-03 17:11:43.776674', 'deployment_num': '2'}
    let instrumentMedia = [{'type': 'image', 'url': 'https://loremflickr.com/320/240'},{'type': 'image', 'url': 'https://loremflickr.com/320/240'},{'type': 'image', 'url': 'https://loremflickr.com/320/240'},{'type': 'image', 'url': 'https://loremflickr.com/320/240'}]
    return(
        <div className={[styles.instrumentAboutWrapper, 'showOnMedium'].join(' ')}>
            <div className={styles.aboutHeader}>
                <h2 className='removeHeaderMargin'>About</h2>
                <button className='darkTextButton'><SettingsIcon/></button>
            </div>
            <div className='greyText2 smallText'>
                <p>{instrument.description}</p>
                <p className={styles.instrumentDetails}><QrCodeOutlinedIcon className={styles.instrumentDetailIcon} fontSize='small'/>{instrument['id']}</p>
                <p className={styles.instrumentDetails}><AccountTreeIcon className={styles.instrumentDetailIcon} fontSize='small'/>{instrument['data-model']}</p>
                <p className={styles.instrumentDetails}><FlightTakeoffIcon className={styles.instrumentDetailIcon} fontSize='small'/><span style={{fontWeight: '800', paddingRight: '5px'}}>{instrument['deployment_num']}</span> Deployments</p>
            </div>
            <hr className='hr'></hr>
            <h4 className='removeHeaderMargin'>Instrument Notes</h4>
            <p className='greyText2 smallText'>{instrument['notes']}</p>
            <hr className='hr'></hr>
            <h4 className='my-3'>Data</h4>
            <button className={['darkThemeBlueText', 'textButton'].join(" ")}><TableViewIcon className={['darkThemeBlueText'].join(' ')} style={{paddingRight: '5px'}} fontSize='small'/>View and Edit</button>
            <button className={['darkThemeBlueText', 'textButton'].join(" ")}><DownloadIcon className={['darkThemeBlueText'].join(' ')} style={{paddingRight: '5px'}} fontSize='small'/>Download</button>
            <hr className='hr'></hr>
            <h4 className='my-3'>Images</h4>
            <ImagePanel xsBreakPoint={6}/>
        </div>
    )
}