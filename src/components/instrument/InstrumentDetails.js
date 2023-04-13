import styles from './Instrument.module.css'
import Deployments from '../dashboard/Deployments'
import InstrumentAbout from '../../components/instrument/InstrumentAbout'
import InstrumentAboutSmall from './InstrumentAboutSmall'
import { useContext } from 'react'
import { AppContext } from '../../components/Context'
import { Grid } from '@mui/material'
import ImagePanel from '../general/ImagePanel'

export default function InstrumentDetails(props){

    const [context, setContext] = useContext(AppContext)

    return(
    <div className={[styles.panelWrapper]}>
        <Grid container spacing={4} >
            <Grid item sm={12} lg={8} xl={9}>
                <InstrumentAboutSmall type={'instrument'}/>
                <div style={{marginTop: '20px'}}><hr className='hr showOnMedium'></hr></div>
                
                <Deployments instrument={props.instrument}/>
            </Grid>
            <Grid item sm={12} lg={4} xl={3}>
                <InstrumentAbout setInstruments={props.setInstruments} instrument={props.instrument} type={'instrument'}/>
            </Grid>
        </Grid>
    </div>
    )
}