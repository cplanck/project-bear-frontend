import styles from './General.module.css'
import SearchIcon from '@mui/icons-material/Search';


export default function SearchInput(props){
    return(
        <div>
            <input className={styles.searchInputWrapper} placeholder={'Search Instruments'}></input>
        </div>
    )
}