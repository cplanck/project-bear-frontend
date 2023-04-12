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
        <Link href={'/instrument/' + props.item['id']} className={[styles.sideNavListItem, 'tabCell'].join(' ')}>
            <div className={styles.sideNavListItemTextAndAvatar}>
                <InstrumentAvatar size={'small'} url={props.item.avatar}/>
                <span className={styles.sideNavItemText}>{truncate(props.item['name'], 20)}{props.isSelected}</span>
             </div>
             <span style={{width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'green'}}></span>
        </Link>
    )
}




export default function SideNav(){

    const [instruments, setInstruments] = useContext(InstrumentContext);

    function ListItems(props){
        let listItems = []
        for(let i = 0; i < props.items.length; i++){
            listItems.push(<LinkItem item={props.items[i]}/>)
        }
        return(listItems)
    }


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
                <ListItems items={instruments}/>
            </div>
        </div>
    )
}