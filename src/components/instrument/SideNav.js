import styles from './Instrument.module.css'
import dbstyles from '@/components/dashboard/Dashboard.module.css'
import SortButton from '../dashboard/SortButton'
import SearchInput from '../../components/general/SearchInput'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react';
import { InstrumentContext } from '../../components/Context'
import InstrumentAvatar from './InstrumentAvatar'
import { RotatingLines } from 'react-loader-spinner'
import { useQuery } from '@tanstack/react-query'
import { useIsFetching } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import ComponentPreloader from "@/components/general/ComponentPreloader";

function truncate( str, max, sep ) {
    max = max || 10;
    var len = str.length;
    if(len > max){
        sep = sep || "...";
        var seplen = sep.length;
        if(seplen > max) { 
            return str.substring(len - max)
        }
        var n = -0.5 * (max - len - seplen);
        var center = len/2;
        return str.substring(0, center - n) + sep + str.substring(len - center + n);
    }
    return str;
}

function LinkItem(props){

    return(
        <Link href={'/instrument/' + props.instrument['id']} className={[styles.sideNavListItem, 'tabCell'].join(' ')}>
            <div className={styles.sideNavListItemTextAndAvatar}>
                <InstrumentAvatar size={'small'} url={props.instrument.avatar}/>
                <span className={styles.sideNavItemText}>{truncate(props.instrument.name, props.browserWidth<992?20:26)}{props.isSelected}</span>
             </div>
             {/* {props.instrument.active_deployment.name?
             <span style={{width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'green'}}></span>
             :
            ''
             } */}
        </Link>
    )
}


export default function SideNav(){

    const isFetching = useIsFetching()

    let { isLoading, error, data: instruments } = useQuery({ queryKey: ['/instruments'] })

    instruments = instruments?.results

    const sortedInstruments = instruments?.sort((a, b) => b.last_modified.localeCompare(a.last_modified));
    const [browserWidth, setBrowserWidth] = useState(1800)

        useEffect(() => {
            function handleResize() {
              console.log(window.innerWidth);
              setBrowserWidth(window.innerWidth)
            }
            window.addEventListener('resize', handleResize);
            return () => {
              window.removeEventListener('resize', handleResize);
            };
          }, []);

    // sortedInstruments?.sort((a, b) => {
    //     if (a.active_deployment?.name.length !== 0 && b.active_deployment.name.length === 0) {
    //       return -1; // a should be before b
    //     } else if (a.active_deployment?.name.length === 0 && b.active_deployment.name.length !== 0) {
    //       return 1; // b should be before a
    //     } else {
    //       return 0; // keep the same order as before
    //     }
    //   });

    const listItems = sortedInstruments?.map(instrument=><LinkItem key={instrument.id} instrument={instrument} browserWidth={browserWidth}/>)
    
    return(
        <div className={styles.sideNavWrapper}>
            {isLoading?<ComponentPreloader/>:
            listItems?.length != 0?
            <>
                <div className={styles.sideNavTitleWrapper}>
                    <div className='flexCenterFlexStart'>
                        <h3 className='me-3'>Your Instruments</h3> 
                        {isFetching?<RotatingLines height="15" width="15" animationDuration="1.25" strokeColor="var(--dark-theme-grey-3)" ariaLabel="loading"/>:''}
                    </div>
                    <Link  href='/instrument/add'>
                        <button className='greyButton'>New</button>
                    </Link>
                    
                </div>
                <SearchInput placeholder={'Search Instruments'}/>
                <div className={styles.sideNavlistItemsContainer}>
                    {listItems}
                </div>
            </>
            :
            <div className={dbstyles.sideNavInstructionCard}>
                <span className='boldText'>Add and deploy your first instrument</span>
                <p className=''>Ready to get started? Add an instrument and create a deployment to build your real-time database, control access, and add media.</p>
                <div>
                    <Link href={'/instrument/add'}>
                        <button  className={'greenButton'}>
                            Add Instrument
                        </button>
                    </Link>
                    <span className='darkThemeBlueText ms-4 smallText'>Learn more</span>
                </div>
            </div>
            }
        </div>
    )
}