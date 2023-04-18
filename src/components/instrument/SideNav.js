import styles from './Instrument.module.css'
import SortButton from '../dashboard/SortButton'
import SearchInput from '../../components/general/SearchInput'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react';
import { InstrumentContext } from '../../components/Context'
import InstrumentAvatar from './InstrumentAvatar'
import { useRouter } from 'next/router'


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
                <span className={styles.sideNavItemText}>{truncate(props.instrument.name, 20)}{props.isSelected}</span>
             </div>
             {props.instrument.active_deployment.name?
             <span style={{width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'green'}}></span>
             :
            //  <span style={{width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'purple'}}></span>
            ''
             }
        </Link>
    )
}




export default function SideNav(){

    const [instruments, setInstruments] = useContext(InstrumentContext);

    const sortedInstruments = instruments.sort((a, b) => a.last_modified.localeCompare(b.last_modified));

    sortedInstruments.sort((a, b) => {
        if (a.active_deployment.name.length !== 0 && b.active_deployment.name.length === 0) {
          return -1; // a should be before b
        } else if (a.active_deployment.name.length === 0 && b.active_deployment.name.length !== 0) {
          return 1; // b should be before a
        } else {
          return 0; // keep the same order as before
        }
      });

    const listItems = sortedInstruments.map(instrument=><LinkItem key={instrument.id} instrument={instrument}/>)
    


    return(
        <div className={styles.sideNavWrapper}>
            <div className={styles.sideNavTitleWrapper}>
                <h3>Your Instruments</h3>
                <Link  href='/instrument/add'>
                    <button className='greyButton'>New</button>
                </Link>
            </div>
            <SearchInput placeholder={'Search Instruments'}/>
            <div className={styles.sideNavlistItemsContainer}>
                {listItems}
            </div>
        </div>
    )
}