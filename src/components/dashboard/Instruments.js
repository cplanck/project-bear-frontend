import React, { useState, useEffect } from "react";
import styles from './Instruments.module.css'
import dbstyles from './Dashboard.module.css'
import Grid from '@mui/material/Grid';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ModifyButtonStar from './ModifyButtonStar'
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
                        </div>
                        <ModifyButtonStar type={'instrument'} item={props.instrument}/>
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
        // <Grid container spacing={2} className={dbstyles.searchWrapper}>
        //     <Grid item xs={12} md={7} lg={8} xl={10}>
        //         <input className={[dbstyles.search, 'styledInput small'].join(" ")} placeholder={'Search Instruments'}></input>
        //     </Grid>
        //     <Grid item xs={12} md={5} lg={4} xl={2}>
        //         <Link href='/instrument/add' >
        //             <button  className={[dbstyles.addButton, 'greenButton'].join(" ")}>
        //                 <AddBoxOutlinedIcon style={{marginRight: '5px', color: 'var(--dark-theme-text-main)'}}/>Add Instrument
        //             </button>
        //         </Link>
        //     </Grid>
        // </Grid>
        <div className={dbstyles.searchWrapper}>
            <input className={[dbstyles.search, 'styledInput small'].join(" ")} placeholder={'Search Instruments'}></input>
            <Link href='/instrument/add' >
                <button  className={[dbstyles.addButton, 'greenButton'].join(" ")}>
                    <AddBoxOutlinedIcon style={{marginRight: '5px', color: 'var(--dark-theme-text-main)'}}/>Add Instrument
                </button>
            </Link>
        </div>
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
            <div className={dbstyles.sortHeader}>
                <h4 className='removeHeaderMargin'>Your Instruments</h4>
                <SortButton setSortBy={setSortBy}/>
            </div>
            <hr className='hr'></hr>
            <Grid container spacing={0}>
                {instrumentArray}
            </Grid>
        </>
    )
}