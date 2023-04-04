import { Grid } from "@mui/material"

export default function InstrumentMedia(props){

    let instrumentMedia = []
    for(let i = 0; i < props.media.length; i++){
        instrumentMedia.push( <Grid item md={6}><a><div className={styles.instrumentMediaThumbnail} style={{backgroundImage: `url(${props.media[i]['url']})`}}></div></a></Grid>)
    }

    return(
            <div>
                <Grid container spacing={2}>
                    {instrumentMedia}
                </Grid>
            </div>
        )
}