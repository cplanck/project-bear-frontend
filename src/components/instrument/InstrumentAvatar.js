import styles from '@/components/instrument/Instrument.module.css'
import WifiTetheringOutlinedIcon from '@mui/icons-material/WifiTetheringOutlined';

export default function InstrumentAvatar(props){

    

    return(
      <div className={[styles.instrumentAvatarWrapper, props.size=='small'?styles.small:''].join(' ')}>
          {props.url?
        <div style={{backgroundImage: `url(${props.url})`}} className={[styles.avatarOutline, props.size=='small'?styles.small:''].join(' ')}></div>
        :
        <div className={[styles.avatarOutline, props.size=='small'?styles.small:''].join(' ')}>
            <WifiTetheringOutlinedIcon fontSize={props.size=='small'?'small':'large'} className='greyText3' style={{marginBottom: props.size=='small'?'2px':'3px'}}/>
        </div>
          }
      </div>
    )
  }