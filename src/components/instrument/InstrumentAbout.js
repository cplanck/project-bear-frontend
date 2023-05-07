import styles from './Instrument.module.css'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import SettingsIcon from '@mui/icons-material/Settings';
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
import { Grid } from '@mui/material';
import * as dayjs from 'dayjs'
import Link from 'next/link';


export default function InstrumentAbout(props){

    var advancedFormat = require('dayjs/plugin/advancedFormat')
    dayjs.extend(advancedFormat)

    const lastModified = dayjs(props.instrument?.last_modified); 
    const modifiedToday = lastModified.isSame(dayjs(), 'day');
    const lastModifiedDate = modifiedToday ? 'Today at ' + lastModified.format('h:mma') : lastModified.format('MMMM Do, YYYY');

    const dateAdded = dayjs(props.instrument?.date_added); 
    const addedToday = dateAdded.isSame(dayjs(), 'day')
    const dateAddedDate = addedToday ? 'Today at ' + dateAdded.format('h:mma') : dateAdded.format('MMMM Do, YYYY');
    console.log(dateAddedDate)
    console.log(addedToday)
    console.log(dateAdded)

    return(
        <div className={[styles.instrumentAboutWrapper, 'hideOnMedium'].join(' ')}>
            <div className={styles.aboutHeader}>
                <h3 className='removeHeaderMargin'>About</h3>
                <Link href={{ pathname: '/instrument/edit/'  +props.instrument?.id, query: { from: 'instrument' } }}><SettingsIcon className='iconButton'/></Link>
            </div>
            <div className='greyText2 smallText'>
                <p>{props.instrument?.description}</p>
                <p className={styles.instrumentDetails}><QrCodeOutlinedIcon className={styles.instrumentDetailIcon} fontSize='small'/>{props.instrument?.serial_number}</p>
                <p className={styles.instrumentDetails}><FlightTakeoffIcon className={styles.instrumentDetailIcon} fontSize='small'/><span style={{fontWeight: '800', paddingRight: '5px'}}>{props.instrument?.deployment_num?props.instrument?.deployment_num:0}</span> Deployments</p>
            </div>
            {props.instrument?.notes?
             <div>
                 <hr className='hr'></hr>
                <h4 className='removeHeaderMargin'>Instrument Notes</h4>
                <p className='greyText2 smallText'>{props?.instrument.notes}</p>
            </div>
             :
             <div className={styles.instrumentNotesPlaceholder}>
                 Instrument notes will show up here.
             </div>
            }
            <span className={[styles.instrumentDetails, 'extraSmallText', 'mt-3'].join(' ')}> Last Modified {lastModifiedDate}</span>
            <span className={[styles.instrumentDetails, 'extraSmallText'].join(' ')}> Added {dateAddedDate}</span>
        </div>
    )
}