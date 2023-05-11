import { TailSpin } from  'react-loader-spinner'
import styles from '@/components/general/General.module.css'

export default function ComponentPreloader(){
    return(
        <div className={styles.componentPreloader}>
            <TailSpin
            height="40"
            width="40"
            color="var(--dark-theme-grey-3)"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
        </div>
    )
}