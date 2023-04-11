import styles from './Instrument.module.css'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import TableViewIcon from '@mui/icons-material/TableView';
import DownloadIcon from '@mui/icons-material/Download';
import SettingsIcon from '@mui/icons-material/Settings';
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
import ImagePanel from '../general/ImagePanel';
import InstrumentEditModal from '../../components/instrument/InstrumentEditModal';
import { Grid } from '@mui/material';
import Link from 'next/link';


export default function InstrumentAbout(props){

    console.log(props.instrument)

    return(
        <div className={[styles.instrumentAboutWrapper, 'hideOnMedium'].join(' ')}>
            <div className={styles.aboutHeader}>
                <h2 className='removeHeaderMargin'>About</h2>
                <Link href={'/instrument/edit/'+props.instrument.id}><SettingsIcon className='iconButton'/></Link>
                {/* <InstrumentEditModal setInstruments={props.setInstruments} instrument={props.instrument} button={<SettingsIcon className='iconButton'/>} /> */}
            </div>
            <div className='greyText2 smallText'>
                <p>{props.instrument.description}</p>
                <p className={styles.instrumentDetails}><QrCodeOutlinedIcon className={styles.instrumentDetailIcon} fontSize='small'/>{props.instrument['id']}</p>
                <p className={styles.instrumentDetails}><AccountTreeIcon className={styles.instrumentDetailIcon} fontSize='small'/>{props.instrument['data-model']}</p>
                <p className={styles.instrumentDetails}><FlightTakeoffIcon className={styles.instrumentDetailIcon} fontSize='small'/><span style={{fontWeight: '800', paddingRight: '5px'}}>{props.instrument['deployment_num']}</span> Deployments</p>
                {/* <p className={styles.instrumentDetails}><span style={{height: '20px', width: '20px',borderRadius: '50%', backgroundColor: props.instrument['instrument_color']}}></span></p> */}
            </div>
            <hr className='hr'></hr>
            <h4 className='removeHeaderMargin'>Instrument Notes</h4>
            <p className='greyText2 smallText'>{props.instrument['notes']}</p>
        </div>
    )
}