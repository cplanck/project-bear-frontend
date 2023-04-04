import styles from './Deployment.module.css'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

export default function DeploymentHeading(props){

    return(
      <div className={styles.instrumentHeadingWrapper}>
        <div className={styles.instrumentAvatarGroup}>
            <div className={styles.instrumentHeadingAvatarWrapper}>
            <div className={[styles.instrumentTitleWrapper, 'me-3'].join(' ')}>
                {/* <div  className={[styles.instrumentTitle, 'me-3', 'ellipsesOverflow'].join(' ')}>
                    <FlightTakeoffIcon fontSize='small ' className={'me-3'} />
                    <h4 className={'removeHeaderMargin ellipsesOverflow'}>{props.deployment.name}</h4>
                </div> */}
              {/* <button className={['greyButton', styles.modifyButtonGroup, styles.modifyButton].join(' ')}>Modify</button> */}
            </div>
          </div>
        </div>
        </div>
    )
  }