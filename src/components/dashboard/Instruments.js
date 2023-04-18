import React, { useState, useEffect } from "react";
import styles from './Instruments.module.css'
import dbstyles from './Dashboard.module.css'
import Grid from '@mui/material/Grid';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ModifyButton from './ModifyButton'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InstrumentsAddPanel from "./InstrumentsAddPanel";
import SortButton from './SortButton';
import Link from 'next/link';
import InstrumentAvatar from "../instrument/InstrumentAvatar";
import * as dayjs from 'dayjs'

export default function Instruments(props){

    const [sortBy, setSortBy] = useState('last_modified')
    const [isEdting, setIsEditing] = useState(false)

    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)

    function Instrument(props){
        return(       
            <Grid item sm={12}  className={dbstyles.cardWrapper}>
                <div className={[dbstyles.card, 'darkThemeDarkText'].join(" ")}>
                     <div className={styles.instrumentTopDiv}>
                         <div className={styles.instrumentNameAndAvatar}>
                            <InstrumentAvatar base64={true} size={'small'} url={props.instrument.avatar}/>
                            <Link href={'/instrument/' + props.instrument.id }>
                                <h4 className={[dbstyles.cardTitle, 'darkThemeBlueText', 'removeHeaderMargin'].join(" ")}>{props.instrument.name}</h4>
                            </Link>
                            {props.instrument.starred?<StarBorderOutlinedIcon className={dbstyles.starred}/>:''}
                        </div>
                        <ModifyButton instrument={props.instrument}/>
                     </div>
                     <p className={dbstyles.description}>{props.instrument.description}</p>
                     <div className={[dbstyles.bottomDetailsWrapper, 'extraSmallText'].join(' ')}>
                        <span className='boldText'> Last updated </span>{dayjs(props.instrument.last_modified).format('MMMM D, YYYY')}
                    </div>
                    <div className={dbstyles.bottomDetailsWrapper}>
                    </div>
                </div>
                <hr className='hr'></hr>
            </Grid> 
        )
    }

    function SearchInstruments(){
    
        return(
        <Grid container spacing={0} className={dbstyles.searchWrapper}>
            <Grid item xs={12} md={7} lg={8}  xl={9}>
                <input className={[dbstyles.search, 'styledInput small'].join(" ")} placeholder={'Search Instruments'}></input>
            </Grid>
            <Grid item xs={12} md={5} lg={4} xl={3}>
                <Link href='/instrument/add' >
                    <button  className={[dbstyles.addButton, 'greenButton'].join(" ")}>
                        <AddBoxOutlinedIcon style={{marginRight: '5px', color: 'var(--dark-theme-text-main)'}}/>Add Instrument
                    </button>
                </Link>
            </Grid>
        </Grid>
        )
    }

    if(sortBy == 'last_modified'){
        props.instruments.sort((a, b) => (a.last_modified > b.last_modified) ? -1 : 1)
    }
    else{
        props.instruments.sort((a, b) => (a.starred_date > b.starred_date) ? -1 : 1)
    }

    let instrumentArray = props.instruments.map((instrument, i)=><Instrument key={i} instrument={instrument}/>)

    return(
        isEdting?<InstrumentsAddPanel setIsEditing={setIsEditing}/>:
        <>
                <SearchInstruments/>
                <div className={dbstyles.sortHeader}>
                    <h4 className='removeHeaderMargin'>Your Instruments</h4>
                    <SortButton setSortBy={setSortBy}/>
                </div>
                <hr className='hr'></hr>
                {instrumentArray}
        </>
        // </Container>
    )
}