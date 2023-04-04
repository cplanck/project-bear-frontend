import styles from './Testing.module.css'
// import logo from './images/logo.png'
import Image from 'next/image'
import Head from 'next/head'



export default function Pattern(){
  
    return(
        <div>
            <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet" />
            </Head>
        
            <div className={styles.background}>
                <div>
                    <div className={styles.logoGroup}>
                        <Image src="/logo.png" alt="me" width="150" height="150"/>
                        <span className={styles.title}>Quivrr</span>
                    </div>
                    Quivrr democratizes entrepreneurship

                </div>
            </div>
        </div>
    )
}