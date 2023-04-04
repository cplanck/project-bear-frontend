import { Grid } from "@mui/material"
import styles from '../instrument/Instrument.module.css'

export default function ImagePanel(props){

    let images = [{'type': 'image', 'url': 'https://loremflickr.com/320/240'},{'type': 'image', 'url': 'https://loremflickr.com/320/240'},{'type': 'image', 'url': 'https://loremflickr.com/320/240'},{'type': 'image', 'url': 'https://loremflickr.com/320/240'}]
    let imageList = []


    for(let i = 0; i < images.length; i++){
        imageList.push(
                    <Grid item xs={props.xsBreakPoint} xl={props.xlBreakPoint}>
                        <a>
                            <div className={styles.instrumentMediaThumbnail} style={{backgroundImage: `url(${images[i]['url']})`}}></div>
                        </a>
                    </Grid>
                    )
                }

    return(
        <div>
            <Grid container spacing={2}>
                {imageList}
            </Grid>
        </div>
    )
}